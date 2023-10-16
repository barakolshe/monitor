import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion/Accordion";
import {
  Checkbox,
  CheckboxState,
  LabeledCheckbox,
} from "@/components/ui/Checkbox/Checkbox";
import React, { FunctionComponent } from "react";
import cloneDeep from "lodash.clonedeep";

export type DataType = {
  id: string;
  label: string;
  value: any;
  checkboxes: {
    id: string;
    label: string;
    value: any;
    active: boolean;
  }[];
}[];

interface CheckboxAccordionProps {
  initialState: DataType;
  data: DataType | null;
  setData: (checked: DataType | null) => void;
}

const CheckboxAccordion: FunctionComponent<CheckboxAccordionProps> = ({
  initialState,
  data,
  setData,
}) => {
  const isAccordionChecked = (accordionValue: any) => {
    const targetAccordion = data?.find(
      (currAccord) => currAccord.value == accordionValue
    );
    if (targetAccordion === undefined) {
      console.error("error");
      return CheckboxState.Unchecked;
    }
    if (
      targetAccordion.checkboxes.some((currCheckbox) => currCheckbox.active)
    ) {
      if (
        targetAccordion.checkboxes.every((currCheckbox) => currCheckbox.active)
      ) {
        return CheckboxState.Checked;
      } else {
        return CheckboxState.SemiChecked;
      }
    } else {
      return CheckboxState.Unchecked;
    }
  };

  const changeCheckboxActivation = (
    accordionValue: string,
    checkboxValue: string
  ) => {
    const dataCopy = cloneDeep(data);
    const targetAccordion = dataCopy?.find(
      (currAccord) => currAccord.value == accordionValue
    );
    if (targetAccordion === undefined) {
      return;
    }
    const targetCheckbox = targetAccordion?.checkboxes.find(
      (currCheckbox) => currCheckbox.value === checkboxValue
    );
    if (targetCheckbox === undefined) {
      return;
    }
    targetCheckbox.active = !targetCheckbox.active;
    setData(dataCopy);
  };

  const changeCheckboxTopic = (
    accordionValue: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation(); // stopping the click to propagrate to the accordion
    const desiredState =
      isAccordionChecked(accordionValue) === CheckboxState.Unchecked
        ? true
        : false;
    const dataCopy = cloneDeep(data);
    const targetAccordion = dataCopy!.find(
      (currAccord) => currAccord.value == accordionValue
    );
    if (targetAccordion === undefined) {
      return;
    }
    targetAccordion.checkboxes.forEach(
      (currCheckbox) => (currCheckbox.active = desiredState)
    );
    setData(dataCopy);
  };

  const generateElements = () => {
    if (data === null) {
      return null;
    }
    let accrodionItems = [];
    for (const accordion of data) {
      let checkboxesElements = [];
      for (const checkbox of accordion.checkboxes) {
        checkboxesElements.push(
          <LabeledCheckbox
            key={checkbox.id}
            id={checkbox.id}
            label={checkbox.label}
            checked={
              checkbox.active ? CheckboxState.Checked : CheckboxState.Unchecked
            }
            onClick={() =>
              changeCheckboxActivation(accordion.value, checkbox.value)
            }
          />
        );
      }
      accrodionItems.push(
        <AccordionItem key={accordion.id} value={accordion.value}>
          <AccordionTrigger className="flex">
            <div
              className="flex flex-row justify-between align-middle flex-grow py-4"
              onClick={(e) => changeCheckboxTopic(accordion.value, e)}
            >
              {accordion.label}
              <Checkbox
                id={accordion.id}
                className="mr-4 my-auto"
                checked={isAccordionChecked(accordion.value)}
              />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1">{...checkboxesElements}</div>
          </AccordionContent>
        </AccordionItem>
      );
    }

    return accrodionItems;
  };

  let items = generateElements();

  React.useEffect(() => {
    setData(initialState);
  }, [initialState, setData]);

  return <Accordion type="multiple">{items}</Accordion>;
};

export default CheckboxAccordion;
