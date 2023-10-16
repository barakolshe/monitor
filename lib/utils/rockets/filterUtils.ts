import { LOCATIONS } from "@/configs/consts";
import { RocketsFilter } from "@/types/rockets/RocketsFilter.interface";

export const initialRocketsFilter: RocketsFilter = LOCATIONS.map(
  (currArea) => ({
    area: currArea.area,
    locations: currArea.locations.map((currLocation) => ({
      location: currLocation,
      active: false,
    })),
  })
);
