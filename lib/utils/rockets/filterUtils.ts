import { LOCATIONS } from "@/configs/consts";
import {
  DateFilter,
  LocationFilter,
  RocketsFilter,
} from "@/types/rockets/RocketsFilter.interface";
import dayjs from "dayjs";

const locationFilter: LocationFilter = LOCATIONS.map((currArea) => ({
  area: currArea.area,
  locations: currArea.locations.map((currLocation) => ({
    location: currLocation,
    active: false,
  })),
}));

const dateFilter: DateFilter = [dayjs().startOf("day")];

export const initialRocketsFilter: RocketsFilter = {
  locationFilter: locationFilter,
  dateFilter: dateFilter,
};
