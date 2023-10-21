import { RocketsLocationsData } from "@/types/rockets/RocketsData.interface";
import {
  DistanceFilter,
  LocationFilter,
  RocketsFilter,
} from "@/types/rockets/RocketsFilter.interface";
import { TimeRecord } from "@/types/rockets/TimeRecord.interface";
import { Rocket } from "@/types/rockets/Rocket.interface";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";
import isEqual from "lodash.isequal";
import { initialDistanceFilter } from "./filterUtils";
import { LocationDistance } from "@/types/locations/LocationDistance.interface";
import { LOCATION_DISTANCES } from "@/configs/locationDistances";
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

export const getLocationData = (rocketsResponse: Rocket[]) => {
  const rockets: RocketsLocationsData = {};
  for (const { area, location } of rocketsResponse) {
    if (!(area in rockets)) {
      rockets[area] = {};
      rockets[area][location] = 1;
      continue;
    }
    if (!(location in rockets[area])) {
      rockets[area][location] = 1;
      continue;
    }
    rockets[area][location] += 1;
  }

  return rockets;
};

const getFilteredLocations = (
  locationFilter: LocationFilter[],
  distanceFilter: DistanceFilter[]
) => {
  return isEqual(distanceFilter, initialDistanceFilter)
    ? getFilteredLocationByLocationFilter(locationFilter)
    : getFilteredLocationByDistanceFilter(distanceFilter);
};

const getFilteredLocationByLocationFilter = (
  locationFilter: LocationFilter[]
) => {
  const locations: string[] = [];

  for (const currArea of locationFilter) {
    locations.push(
      ...currArea.locations
        .filter((currLocation) => currLocation.active)
        .map((currLocation) => currLocation.location)
    );
  }

  return locations;
};

const getFilteredLocationByDistanceFilter = (
  distanceFilter: DistanceFilter[]
) => {
  console.log("getting distance");
  let locations: LocationDistance[] = LOCATION_DISTANCES;
  const approvedLocations: LocationDistance[] = [];

  for (const { from, distance } of distanceFilter) {
    for (const currLocation of locations) {
      const targetDistance = currLocation.distances.find(
        (currDistance) => currDistance.from === from
      )?.distance;
      if (targetDistance !== undefined && targetDistance <= distance) {
        approvedLocations.push(currLocation);
      }
    }
    locations = approvedLocations;
  }

  return locations.map((currLocation) => currLocation.location);
};

export const getFilteredDrops = (filter: RocketsFilter, data: Rocket[]) => {
  const filteredLocations = getFilteredLocations(
    filter.locationFilter,
    filter.distanceFilter
  );
  const filteredDrops: Rocket[] = [];

  for (const drop of data) {
    const dropDayStart = drop.timestamp.startOf("day");
    if (
      filteredLocations.includes(drop.location) &&
      filter.dateFilter.some((currDateFilter) =>
        currDateFilter.isSame(dropDayStart)
      )
    ) {
      filteredDrops.push(drop);
    }
  }

  return filteredDrops;
};

/*
Get time stamp with todays date
*/
const toTodayDate = (timestamp: dayjs.Dayjs) => {
  return dayjs()
    .hour(timestamp.hour())
    .minute(timestamp.minute())
    .second(timestamp.second())
    .millisecond(timestamp.millisecond());
};

// Gap in minutes
export const divideHours = (drops: Rocket[], gap: number = 60) => {
  const result: TimeRecord[] = [];

  let currDate = dayjs().startOf("day");
  let endOfDay = dayjs().endOf("day");

  while (currDate.isBefore(endOfDay)) {
    const currDrops = [];
    const nextDate = dayjs(currDate).add(60, "minute");
    for (let i = 0; i < drops.length; i++) {
      const drop = drops[i];
      if (
        toTodayDate(drop.timestamp).isBetween(currDate, nextDate, null, "[)")
      ) {
        currDrops.push(drop);
        drops.splice(i, 1);
        i -= 1;
      }
    }
    result.push({
      timestamp: currDate,
      drops: currDrops,
    });
    currDate = nextDate;
  }

  return result;
};
