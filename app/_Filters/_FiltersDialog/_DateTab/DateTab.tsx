import { Calendar } from "@/components/shared/Calender/Calendar";
import { Button } from "@/components/ui/Button/Button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/Dialog";
import { DateFilter } from "@/types/rockets/RocketsFilter.interface";
import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import { FilterContext } from "@/context/FilterContext";

interface DateTabProps {}

const DateTab: FunctionComponent<DateTabProps> = () => {
  const { filter: originState, setFilter: setOriginState } =
    React.useContext(FilterContext);
  const [filter, setFilter] = React.useState<DateFilter>(
    originState.dateFilter
  );

  const applyChanges = () => {
    setOriginState({
      ...originState,
      dateFilter: filter,
    });
  };

  const transformDates = (nativeDates: Date[] | undefined) => {
    setFilter(
      nativeDates ? nativeDates.map((date) => dayjs(date).startOf("day")) : []
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <DialogTitle>Filters</DialogTitle>
      <DialogHeader>Choose the locations you want to view</DialogHeader>
      <DialogDescription className="h-[350px] relative">
        <Calendar
          mode="multiple"
          selected={filter?.map((date) => date.toDate())}
          onSelect={transformDates}
          className="rounded-md border w-auto absolute left-[50%] top-[10px] translate-x-[-50%]"
        />
      </DialogDescription>
      <DialogFooter>
        <Button onClick={applyChanges}>Apply</Button>
      </DialogFooter>
    </div>
  );
};

export default DateTab;
