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

export interface CheckedType {
  [topic: string]: {
    [item: string]: boolean;
  };
}

interface CheckboxAccordionProps {
  initialState: CheckedType;
  checked: CheckedType | null;
  setChecked: (checked: CheckedType | null) => void;
}

const CheckboxAccordion: FunctionComponent<CheckboxAccordionProps> = ({
  initialState,
  checked,
  setChecked,
}) => {
  const getTopicState = (topic: string) => {
    let count = 0;
    let checkedCount = 0;

    for (const [_, checkboxValue] of Object.entries(checked![topic])) {
      if (checkboxValue) {
        checkedCount += 1;
      }
      count += 1;
    }
    if (checkedCount === 0) {
      return CheckboxState.Unchecked;
    } else if (checkedCount !== count) {
      return CheckboxState.SemiChecked;
    } else {
      return CheckboxState.Checked;
    }
  };

  const changeCheckboxItem = (topic: string, item: string) => {
    const checkedCopy = cloneDeep(checked);
    checkedCopy![topic][item] = !checkedCopy![topic][item];
    setChecked(checkedCopy);
  };

  const changeCheckboxTopic = (
    topic: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation(); // stopping the click to propagrate to the accordion
    const desiredState =
      getTopicState(topic) === CheckboxState.Unchecked ? true : false;
    const checkedCopy = cloneDeep(checked);
    for (let item in checkedCopy![topic]) {
      checkedCopy![topic][item] = desiredState;
    }
    setChecked(checkedCopy);
  };

  const generateElements = () => {
    if (checked === null) {
      return null;
    }
    let accrodionItems = [];
    for (const topic in checked) {
      let checkboxes = [];
      for (const item in checked[topic]) {
        checkboxes.push(
          <LabeledCheckbox
            id={`${topic}_${item}`}
            label={item}
            checked={
              checked[topic][item]
                ? CheckboxState.Checked
                : CheckboxState.Unchecked
            }
            onClick={() => changeCheckboxItem(topic, item)}
          />
        );
      }
      accrodionItems.push(
        <AccordionItem value={topic}>
          <AccordionTrigger className="flex">
            <div className="flex flex-row justify-between align-middle flex-grow">
              {topic}
              <Checkbox
                className="mr-4 my-auto"
                checked={getTopicState(topic)}
                onClick={(e) => changeCheckboxTopic(topic, e)}
                id={topic}
              />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1">{...checkboxes}</div>
          </AccordionContent>
        </AccordionItem>
      );
    }

    return accrodionItems;
  };

  let items = generateElements();

  React.useEffect(() => {
    setChecked(initialState);
  }, [initialState, setChecked]);

  return <Accordion type="multiple">{items}</Accordion>;
};

export default CheckboxAccordion;
