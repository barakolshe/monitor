import { Dialog, DialogContent } from "@/components/ui/Dialog/Dialog";
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "@/components/ui/Tabs/Tabs";
import { RocketsFilter } from "@/types/rockets/RocketsFilter.interface";
import { DialogProps } from "@radix-ui/react-dialog";
import React, { FunctionComponent } from "react";
import LocationTab from "./_LocationTab/LocationTab";
import DateTab from "./_DateTab/DateTab";
import { FilterContext } from "@/context/FilterContext";
import DistanceTab from "./_DistanceTab/DistanceTab";
import { X } from "lucide-react";
import { initialDistanceFilter } from "@/lib/utils/rockets/filterUtils";
import isEqual from "lodash.isequal";

export type TabsType = "location" | "date";

interface FiltersDialogProps extends Omit<DialogProps, "onOpenChange"> {
  onOpenChange: (state: boolean) => void;
}

const FiltersDialog: FunctionComponent<FiltersDialogProps> = ({
  onOpenChange,
  ...props
}) => {
  const { filter: originState, setFilter: setOriginState } =
    React.useContext(FilterContext);
  const [filter, setFilter] = React.useState<RocketsFilter>(originState);

  const applyChanges = () => {
    setOriginState(filter);
    onOpenChange(false);
  };

  React.useEffect(() => {
    setFilter(originState);
  }, [originState]);

  return (
    <Dialog onOpenChange={onOpenChange} {...props}>
      <DialogContent>
        <Tabs defaultValue="location">
          <TabsList>
            <TabsTrigger value="location">
              <div className="flex flex-row gap-1 justify-center items-center">
                Location
                {!isEqual(filter.distanceFilter, initialDistanceFilter) && (
                  <X className="h-4 w-4 mt-[3px] text-red-500" />
                )}
              </div>
            </TabsTrigger>
            <TabsTrigger value="distance">
              <div className="flex flex-row gap-1 justify-center items-center">
                Distance
                {isEqual(filter.distanceFilter, initialDistanceFilter) && (
                  <X className="h-4 w-4 mt-[3px] text-red-500" />
                )}
              </div>
            </TabsTrigger>
            <TabsTrigger value="date">Date</TabsTrigger>
          </TabsList>
          <TabsContent value="location">
            <LocationTab
              filter={filter}
              setFilter={setFilter}
              applyChanges={applyChanges}
            />
          </TabsContent>
          <TabsContent
            value="date"
            className="flex flex-col justify-center items-center"
          >
            <DateTab
              filter={filter}
              setFilter={setFilter}
              applyChanges={applyChanges}
            />
          </TabsContent>
          <TabsContent
            value="distance"
            className="flex flex-col justify-center items-center overflow-x-visible"
          >
            <DistanceTab
              filter={filter}
              setFilter={setFilter}
              applyChanges={applyChanges}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersDialog;
