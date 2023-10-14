import { RocketsFilter } from "@/types/rockets/RocketsFilter.interface";
import React from "react";

type FilterContextType = {
  filter: RocketsFilter | null;
  setFilter: (filter: RocketsFilter | null) => void;
};

export const FilterContext = React.createContext<FilterContextType>({
  filter: null,
  setFilter: (filter) => null,
});
