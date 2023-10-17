import { RocketsLocationsData } from "@/types/rockets/RocketsData.interface";
import { RocketsFilter } from "@/types/rockets/RocketsFilter.interface";
import { TimeRecord } from "@/types/rockets/TimeRecord.interface";
import { Rocket } from "@/types/rockets/Rocket.interface";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";
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

const getFilteredLocations = (filter: RocketsFilter) => {
  const locations: string[] = [];

  for (const currArea of filter) {
    locations.push(
      ...currArea.locations
        .filter((currLocation) => currLocation.active)
        .map((currLocation) => currLocation.location)
    );
  }

  return locations;
};

export const getFilteredDrops = (
  filter: RocketsFilter,
  timeFrame: {
    start: dayjs.Dayjs;
    end: dayjs.Dayjs;
  },
  data: Rocket[]
) => {
  const filteredLocations = getFilteredLocations(filter);
  const filteredDrops: Rocket[] = [];

  for (const drop of data) {
    if (
      filteredLocations.includes(drop.location) &&
      drop.timestamp.isBetween(timeFrame.start, timeFrame.end, null, "[)")
    ) {
      filteredDrops.push(drop);
    }
  }

  return filteredDrops;
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
      if (drop.timestamp.isBetween(currDate, nextDate, null, "[)")) {
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
