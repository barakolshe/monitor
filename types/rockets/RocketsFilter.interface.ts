import dayjs from "dayjs";

export type LocationFilter = {
  area: string;
  locations: {
    location: string;
    active: boolean;
  }[];
}[];

export type DateFilter = dayjs.Dayjs[];

export type RocketsFilter = {
  locationFilter: LocationFilter;
  dateFilter: DateFilter;
};
