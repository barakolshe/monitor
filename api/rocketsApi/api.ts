import axios from "axios";
import { rocketsDataEndpoint } from "./endpoints";
import { deserializeData } from "@/lib/rocketsUtils/dataTransfomers";
import { RocketResponse } from "@/types/rockets/RocketsResponse.interface";

const server = process.env.NEXT_PUBLIC_SERVER;
const client = axios.create({
  baseURL: server,
  withCredentials: false,
});

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
