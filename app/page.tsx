"use client";
import { getRocketsData } from "@/api/rocketsApi/api";
import Filters from "./_Filters/Filters";
import { useQuery } from "react-query";
import React from "react";
import { FilterContext } from "@/context/FilterContext";
import { RocketsFilter } from "@/types/rockets/RocketsFilter.interface";
import {
  getFilteredDrops,
  getRocketsFilter,
  divideHours,
} from "@/lib/rocketsUtils/dataTransfomers";
import { BarChart } from "@tremor/react";
import { Rocket } from "@/types/rockets/Rocket.interface";
import { DropGraphData } from "@/types/rockets/DropGraphData.interface";
import { getGraphFormat } from "@/lib/timeUtils";
import DropsTable from "./_DropsTable/DropsTable";

export default function Home() {
  const { isLoading, isError, data } = useQuery(["rocketsQuery"], () =>
    getRocketsData()
  );
  const [rocketsFilter, setRocketsFilter] =
    React.useState<RocketsFilter | null>(null);
  const [filteredDrops, setFilteredDrops] = React.useState<Rocket[] | null>(
    null
  );
  const [selectedBar, setSelectedBar] = React.useState();

  React.useEffect(() => {
    if (data && rocketsFilter === null) {
      setRocketsFilter(getRocketsFilter(data));
    }
  }, [data, rocketsFilter]);

  React.useEffect(() => {
    if (rocketsFilter !== null && data) {
      setFilteredDrops(getFilteredDrops(rocketsFilter, data));
    }
  }, [data, rocketsFilter]);

  const getGraphData = () => {
    console.log({ filteredDrops });
    const dividedDrops = divideHours(filteredDrops ? filteredDrops : []);
    console.log({ dividedDrops });
    const graphData = dividedDrops.map<DropGraphData>((timeFrame) => ({
      time: getGraphFormat(timeFrame.timestamp),
      drops: timeFrame.drops.length,
    }));
    console.log({ graphData });

    return graphData;
  };

  return (
    <FilterContext.Provider
      value={{
        filter: rocketsFilter,
        setFilter: setRocketsFilter,
      }}
    >
      <div className="flex flex-col gap-8">
        <Filters />
        <BarChart
          className="mx-[-50px]"
          data={filteredDrops !== null ? getGraphData() : []}
          index="time"
          categories={["drops"]}
        />
        <DropsTable data={[]} />
      </div>
    </FilterContext.Provider>
  );
}
