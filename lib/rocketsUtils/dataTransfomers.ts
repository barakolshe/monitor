import { RocketsLocationsData } from "@/types/rockets/RocketsData.interface";
import { RocketsFilter } from "@/types/rockets/RocketsFilter.interface";
import { formatDate, getBegginingOfDay, getEndOfDay } from "../timeUtils";

export const transformRocketsData = (
  rocketsResponse: RocketsTimestampsData
) => {
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

export const getRocketsFilter = (rocketsResponse: RocketsTimestampsData) => {
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

export const getFilteredDrops = (
  filter: RocketsFilter,
  data: RocketsTimestampsData
) => {
  const activeLocations = getActiveLocations(filter);
  const hourlyRecords: TimeRecords = [];

  for (const drop of data) {
    if (activeLocations.includes(drop.location)) {
      const formattedDate = new Date(
        Date.parse(formatDate(drop.date, drop.time))
      );
      hourlyRecords.push({
        timestamp: formattedDate,
        location: drop.location,
      });
    }
  }

  return hourlyRecords;
};

// Gap in minutes
export const divideHours = (drops: TimeRecords, gap: number = 60) => {
  const result: TimeRecords = [];

  let currDate = getBegginingOfDay();
  let endOfDay = getEndOfDay();

  while (currDate !== endOfDay)
    for (const drop of drops) {
      const nextDate = new Date(currDate.getTime() + gap * 60000);
      if (drop.timestamp > currDate && drop.timestamp < nextDate) {
        result.push({
          timestamp: currDate,
          location: drop.location,
        });
      }
      currDate = nextDate;
    }

  return result;
};
