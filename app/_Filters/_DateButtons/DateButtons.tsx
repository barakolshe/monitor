import { Button } from "@/components/ui/Button/Button";
import { Separator } from "@/components/ui/Separator/Separator";
import { PREDEFINED_DATES_FILTERS } from "@/configs/main";
import { cn } from "@/lib/utils/tailwindUtils";
import { RocketsFilter } from "@/types/rockets/RocketsFilter.interface";
import React, { FunctionComponent } from "react";
import dayjs from "dayjs";

export interface PredefinedDateFilter {
  title: string;
  dates: dayjs.Dayjs[];
}

interface DateButtonsProps {
  filter: RocketsFilter;
  setFilter: (filter: RocketsFilter) => void;
}

const DateButtons: FunctionComponent<DateButtonsProps> = ({
  filter,
  setFilter,
}) => {
  const isFilterSelected = (predefinedFilter: PredefinedDateFilter) => {
    if (filter === null) {
      return false;
    }
    if (filter.dateFilter.length !== predefinedFilter.dates.length) {
      return false;
    }
    for (const date of filter.dateFilter) {
      if (
        !predefinedFilter.dates.some((currPredefinedDate) =>
          currPredefinedDate.isSame(date)
        )
      ) {
        return false;
      }
    }
    return true;
  };

  const setPredefinedFilter = (predefinedFilter: PredefinedDateFilter) => {
    setFilter({
      ...filter,
      dateFilter: predefinedFilter.dates,
    });
  };

  const handleFilterClick = (predefinedFilter: PredefinedDateFilter) => {
    isFilterSelected(predefinedFilter)
      ? resetFilter()
      : setPredefinedFilter(predefinedFilter);
  };

  const resetFilter = () => {
    setFilter({
      ...filter,
      dateFilter: [dayjs().startOf("day")],
    });
  };

  return (
    <div className="flex flex-row-reverse justify-center items-center h-5 space-x-4">
      {PREDEFINED_DATES_FILTERS.map((currFilter, index) => (
        <React.Fragment key={currFilter.title}>
          <Button
            variant="ghost"
            className={cn({
              "bg-accent": isFilterSelected(currFilter),
              "ml-4": index === 0,
            })}
            onClick={() => handleFilterClick(currFilter)}
          >
            {currFilter.title}
          </Button>
          {index !== PREDEFINED_DATES_FILTERS.length - 1 && (
            <Separator orientation="vertical" />
          )}{" "}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DateButtons;
