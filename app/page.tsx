"use client";
import { getRocketsData } from "@/api/rocketsApi/api";
import Filters from "./_Filters/Filters";
import { useQuery } from "react-query";
import React from "react";
import { FilterContext } from "@/context/FilterContext";
import { RocketsFilter } from "@/types/rockets/RocketsFilter.interface";
import {
  getFilteredDrops,
  divideHours,
} from "@/lib/utils/rockets/dataTransfomers";
import { BarChart } from "@tremor/react";
import { Rocket } from "@/types/rockets/Rocket.interface";
import { DropGraphData } from "@/types/rockets/DropGraphData.interface";
import DropsTable from "./_DropsTable/DropsTable";
import { TimeRecord } from "@/types/rockets/TimeRecord.interface";
import { initialRocketsFilter } from "@/lib/utils/rockets/filterUtils";
import dayjs from "dayjs";

export default function Home() {
  const { data } = useQuery(["rocketsQuery"], () => getRocketsData());

  const [rocketsFilter, setRocketsFilter] =
    React.useState<RocketsFilter>(initialRocketsFilter);
  const [filteredDrops, setFilteredDrops] = React.useState<Rocket[] | null>(
    null
  );
  const [timeGroupedDrops, setTimeGroupsDrops] = React.useState<
    TimeRecord[] | null
  >(null);
  const [selectedBar, setSelectedBar] = React.useState<dayjs.Dayjs | null>(
    null
  );

  React.useEffect(() => {
    console.log("rocketsFilter changed");
  }, [rocketsFilter]);

  React.useEffect(() => {
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
      time: timeFrame.timestamp.format("HH:mm"),
      drops: timeFrame.drops.length,
    }));

    return graphData;
  };

  const handleBarChange = (time: string | null) => {
    if (time === null) {
      setSelectedBar(null);
      return;
    }
    const currDate = dayjs()
      .startOf("day")
      .hour(Number(time.split(":")[0]))
      .minute(Number(time.split(":")[1]));

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
          onValueChange={(v) => handleBarChange(v!.time.toString())}
        />
        {selectedBar && (
          <DropsTable
            data={
              selectedBar !== null
                ? timeGroupedDrops!.find((timeGroup) =>
                    timeGroup.timestamp.isSame(selectedBar)
                  )!.drops
                : []
            }
          />
        )}
      </div>
    </FilterContext.Provider>
  );
}
