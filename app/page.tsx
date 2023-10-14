"use client";
import { getRocketsData } from "@/api/rocketsApi/api";
import Filters from "./_Filters/Filters";
import { useQuery } from "react-query";
import React from "react";
import { FilterContext } from "@/context/FilterContext";
import { RocketsFilter } from "@/types/rockets/RocketsFilter.interface";
import {
  divideHours,
  getFilteredDrops,
  getRocketsFilter,
} from "@/lib/rocketsUtils/dataTransfomers";
import { BarChart } from "@tremor/react";

export default function Home() {
  const { isLoading, isError, data } = useQuery(["rocketsQuery"], () =>
    getRocketsData()
  );

  const [rocketsFilter, setRocketsFilter] =
    React.useState<RocketsFilter | null>({});
  const [filteredDrops, setFilteredDrops] = React.useState<TimeRecords | null>(
    []
  );

  React.useEffect(() => {
    if (data) {
      setRocketsFilter(getRocketsFilter(data));
    }
  }, [data]);

  React.useEffect(() => {
    if (rocketsFilter && data) {
      setFilteredDrops(getFilteredDrops(rocketsFilter, data));
    }
  }, [data, rocketsFilter]);

  divideHours(filteredDrops ? filteredDrops : []);

  return (
    <FilterContext.Provider
      value={{
        filter: rocketsFilter,
        setFilter: setRocketsFilter,
      }}
    >
      <div className="flex-grow flex flex-col gap-8">
        <Filters />
        <BarChart data={[]} index="time" categories={["amount"]} />
      </div>
    </FilterContext.Provider>
  );
}
