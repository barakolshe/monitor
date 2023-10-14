import { RocketsLocationsData } from "@/types/rockets/RocketsData.interface";
import { RocketsFilter } from "@/types/rockets/RocketsFilter.interface";
import { getBegginingOfDay, getDatetime, getEndOfDay } from "../timeUtils";
import { TimeRecord } from "@/types/rockets/TimeRecord.interface";
import { Rocket } from "@/types/rockets/Rocket.interface";
import { RocketResponse } from "@/types/rockets/RocketsResponse.interface";

export const deserializeData = (data: RocketResponse[]) => {
  return data.map<Rocket>((drop) => ({
    ...drop,
    time: undefined,
    date: undefined,
    timestamp: getDatetime(drop.date, drop.time),
  }));
};

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

export const getRocketsFilter = (rocketsResponse: Rocket[]) => {
  const filter: RocketsFilter = {};
  for (const { area, location } of rocketsResponse) {
    if (!(area in filter)) {
      filter[area] = {};
      filter[area][location] = false;
      continue;
    }
    if (!(location in filter[area])) {
      filter[area][location] = false;
      continue;
    }
  }

  return filter;
};

const getActiveLocations = (filter: RocketsFilter) => {
  const locations: string[] = [];

  for (const [_, area] of Object.entries(filter)) {
    for (const [location, isActive] of Object.entries(area)) {
      if (isActive) {
        locations.push(location);
      }
    }
  }

  return locations;
};

export const getFilteredDrops = (filter: RocketsFilter, data: Rocket[]) => {
  const activeLocations = getActiveLocations(filter);
  const hourlyRecords: Rocket[] = [];

  for (const drop of data) {
    if (activeLocations.includes(drop.location)) {
      hourlyRecords.push(drop);
    }
  }

  return hourlyRecords;
};

// Gap in minutes
export const divideHours = (drops: Rocket[], gap: number = 60) => {
  const result: TimeRecord[] = [];

  let currDate = getBegginingOfDay();
  let endOfDay = getEndOfDay();

  while (currDate < endOfDay) {
    const currDrops = [];
    result.push();
    const nextDate = new Date(currDate.getTime() + gap * 60000);
    for (const drop of drops) {
      if (drop.timestamp > currDate && drop.timestamp < nextDate) {
        currDrops.push(drop);
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
