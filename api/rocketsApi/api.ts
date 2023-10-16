import axios from "axios";
import { rocketsDataEndpoint } from "./endpoints";
import { RocketResponse } from "@/types/rockets/RocketsResponse.interface";
import { Rocket } from "@/types/rockets/Rocket.interface";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const server = process.env.NEXT_PUBLIC_SERVER;
const client = axios.create({
  baseURL: server,
  withCredentials: false,
});

const deserializeData = (data: RocketResponse[]) => {
  return data.map<Rocket>((drop) => {
    return {
      area: drop.area,
      location: drop.location,
      title: drop.title,
      timestamp: dayjs(`${drop.date} ${drop.time}`, "DD/MM/YYYY HH:mm:ss"),
    };
  });
};

export const getRocketsData = () => {
  try {
    return client
      .get<RocketResponse[]>(`${rocketsDataEndpoint}`)
      .then((res) => deserializeData(res.data.reverse()));
  } catch (e) {
    console.error("Cant connect", e);
    return null;
  }
};
