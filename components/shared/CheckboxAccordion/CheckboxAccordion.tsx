import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion/Accordion";
import { Checkbox, LabeledCheckbox } from "@/components/ui/Checkbox/Checkbox";
import React, { FunctionComponent } from "react";

interface CheckboxAccordionProps {}

const CheckboxAccordion: FunctionComponent<CheckboxAccordionProps> = () => {
  const checkboxClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("checkbox");
    e.stopPropagation(); // stopping the click to propagrate to the accordion
  };

  return (
    <Accordion type="multiple">
      <AccordionItem value="Jerusalem">
        <AccordionTrigger className="flex">
          <div className="flex flex-row justify-between align-middle flex-grow">
            Jerusalem
            <Checkbox className="mr-4 my-auto" onClick={checkboxClick} />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-1">
            <LabeledCheckbox id="Jerusalem1" label="Some neighber" />
            <LabeledCheckbox id="Jerusalem1" label="Some neighber" />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="TelAviv">
        <AccordionTrigger className="flex">
          <div className="flex flex-row justify-between align-middle flex-grow">
            TelAviv
            <Checkbox className="mr-4 my-auto" onClick={checkboxClick} />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-1">
            <LabeledCheckbox id="TelAviv1" label="Some neighber" />
            <LabeledCheckbox id="TelAviv1" label="Some neighber" />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CheckboxAccordion;
