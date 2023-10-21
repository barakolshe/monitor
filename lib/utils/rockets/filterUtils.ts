import { LOCATIONS } from "@/configs/consts";
import {
  DateFilter,
  DistanceFilter,
  LocationFilter,
  RocketsFilter,
} from "@/types/rockets/RocketsFilter.interface";
import dayjs from "dayjs";

export const initialLocationFilter: LocationFilter[] = LOCATIONS.map(
  (currArea) => ({
    area: currArea.area,
    locations: currArea.locations.map((currLocation) => ({
      location: currLocation,
      active: false,
    })),
  })
);

export const initialDateFilter: DateFilter[] = [dayjs().startOf("day")];

export const initialDistanceFilter: DistanceFilter[] = [];

export const initialRocketsFilter: RocketsFilter = {
  locationFilter: initialLocationFilter,
  distanceFilter: initialDistanceFilter,
  dateFilter: initialDateFilter,
};
