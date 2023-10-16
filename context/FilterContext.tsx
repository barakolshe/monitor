import { initialRocketsFilter } from "@/lib/utils/rockets/filterUtils";
import { RocketsFilter } from "@/types/rockets/RocketsFilter.interface";
import React from "react";

type FilterContextType = {
  filter: RocketsFilter;
  setFilter: (filter: RocketsFilter) => void;
};

export const FilterContext = React.createContext<FilterContextType>({
  filter: initialRocketsFilter,
  setFilter: (filter) => null,
});
