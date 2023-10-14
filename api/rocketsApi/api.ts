import axios from "axios";
import { RocketsDataEndpoint } from "./endpoints";
import { deserializeData } from "@/lib/rocketsUtils/dataTransfomers";
import { RocketResponse } from "@/types/rockets/RocketsResponse.interface";

const server = process.env.NEXT_PUBLIC_SERVER;
const client = axios.create({
  baseURL: server,
});

export const getRocketsData = () => {
  try {
    return client
      .get<RocketResponse[]>(`${RocketsDataEndpoint}`)
      .then((res) => deserializeData(res.data.reverse()));
  } catch (e) {
    console.error("Cant connect", e);
    return null;
  }
};
