import { Calendar } from "@/components/shared/Calender/Calendar";
import { Button } from "@/components/ui/Button/Button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/Dialog";
import {
  DateFilter,
  RocketsFilter,
} from "@/types/rockets/RocketsFilter.interface";
import dayjs from "dayjs";
import React, { FunctionComponent } from "react";

interface DateTabProps {
  filter: RocketsFilter;
  setFilter: (filter: RocketsFilter) => void;
  applyChanges: () => void;
}

const DateTab: FunctionComponent<DateTabProps> = ({
  filter,
  setFilter,
  applyChanges,
}) => {
  const transformDates = (nativeDates: Date[] | undefined) => {
    setFilter({
      ...filter,
      dateFilter: nativeDates
        ? nativeDates.map((date) => dayjs(date).startOf("day"))
        : [],
    });
  };

  const { dateFilter } = filter;

  return (
    <div className="flex flex-col gap-4 w-full">
      <DialogTitle>Filters</DialogTitle>
      <DialogHeader>Choose the dates you want to view</DialogHeader>
      <DialogDescription className="relative">
        <div className="flex flex-row justify-center items-center">
          <Calendar
            mode="multiple"
            selected={dateFilter.map((date) => date.toDate())}
            onSelect={transformDates}
            className="rounded-md border w-auto"
          />
        </div>
      </DialogDescription>
      <DialogFooter>
        <Button onClick={applyChanges}>Apply</Button>
      </DialogFooter>
    </div>
  );
};

export default DateTab;
