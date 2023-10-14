import { RocketsLocationsData } from "@/types/rockets/RocketsData.interface";
import axios from "axios";
import { RocketsDataEndpoint } from "./endpoints";

const server = process.env.NEXT_PUBLIC_SERVER;
const client = axios.create({
  baseURL: server,
});

export const getRocketsData = () => {
  try {
    return client
      .get<RocketsTimestampsData>(`${RocketsDataEndpoint}`)
      .then((res) => res.data.reverse());
  } catch (e) {
    console.error("Cant connect", e);
    return null;
  }
};