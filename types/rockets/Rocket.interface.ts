import dayjs from "dayjs";

export type Rocket = {
  timestamp: dayjs.Dayjs;
  area: string;
  location: string;
  title: string;
};
