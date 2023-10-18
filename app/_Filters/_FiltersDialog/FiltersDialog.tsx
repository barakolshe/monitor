import CheckboxAccordion, {
  DataType as AccordionDataType,
} from "@/components/shared/CheckboxAccordion/CheckboxAccordion";
import { Button } from "@/components/ui/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/Dialog";
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

interface FiltersDialogProps extends Omit<DialogProps, "onOpenChange"> {
  onOpenChange: (state: boolean) => void;
}

const FiltersDialog: FunctionComponent<FiltersDialogProps> = ({
  onOpenChange,
  ...props
}) => {
  return (
    <Dialog onOpenChange={onOpenChange} {...props}>
      <DialogContent>
        <Tabs defaultValue="location">
          <TabsList>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="date">Date</TabsTrigger>
          </TabsList>
          <TabsContent value="location">
            <LocationTab />
          </TabsContent>
          <TabsContent
            value="date"
            className="flex flex-col justify-center items-center"
          >
            <DateTab />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersDialog;
