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
import { TimeRecord } from "@/types/rockets/TimeRecord.interface";

export default function Home() {
  const { isLoading, isError, data } = useQuery(["rocketsQuery"], () =>
    getRocketsData()
  );
  const [rocketsFilter, setRocketsFilter] =
    React.useState<RocketsFilter | null>(null);
  const [filteredDrops, setFilteredDrops] = React.useState<Rocket[] | null>(
    null
  );
  const [timeGroupedDrops, setTimeGroupsDrops] = React.useState<
    TimeRecord[] | null
  >(null);
  const [selectedBar, setSelectedBar] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (data && rocketsFilter === null) {
      setRocketsFilter(getRocketsFilter(data));
    }
    if (data && rocketsFilter !== null) {
      setFilteredDrops(getFilteredDrops(rocketsFilter, data));
    }
  }, [data, rocketsFilter]);

  React.useEffect(() => {
    setTimeGroupsDrops(divideHours(filteredDrops ? filteredDrops : []));
  }, [filteredDrops]);

  const getGraphData = () => {
    if (timeGroupedDrops === null) {
      return [];
    }
    const graphData = timeGroupedDrops.map<DropGraphData>((timeFrame) => ({
      time: getGraphFormat(timeFrame.timestamp),
      drops: timeFrame.drops.length,
    }));

    return graphData;
  };

  const handleBarChange = (time: string | null) => {
    if (time === null) {
      setSelectedBar(null);
      return;
    }
    const currDate = new Date();
    currDate.setHours(Number(time.split(":")[0]));
    currDate.setMinutes(Number(time.split(":")[1]));
    currDate.setSeconds(0);
    currDate.setMilliseconds(0);

    setSelectedBar(currDate);
  };

  return (
    <FilterContext.Provider
      value={{
        filter: rocketsFilter,
        setFilter: setRocketsFilter,
      }}
    >
      <div className="flex flex-col gap-20">
        <Filters />
        <BarChart
          className="mx-[-50px]"
          data={timeGroupedDrops !== null ? getGraphData() : []}
          index="time"
          categories={["drops"]}
          onValueChange={(v) => handleBarChange(v ? v.time.toString() : null)}
        />
        {selectedBar && (
          <DropsTable
            data={
              selectedBar !== null
                ? timeGroupedDrops!.find(
                    (timeGroup) =>
                      timeGroup.timestamp.getTime() === selectedBar.getTime()
                  )!.drops
                : []
            }
          />
        )}
      </div>
    </FilterContext.Provider>
  );
}
