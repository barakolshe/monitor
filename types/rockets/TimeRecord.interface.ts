import dayjs from "dayjs";
import { Rocket } from "./Rocket.interface";

export type TimeRecord = {
  timestamp: dayjs.Dayjs;
  drops: Rocket[];
};
