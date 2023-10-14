export const getBegginingOfDay = () => {
  const currDate = new Date();
  currDate.setHours(0);
  currDate.setMinutes(0);
  currDate.setSeconds(0);
  currDate.setMilliseconds(0);

  return currDate;
};

export const getEndOfDay = () => {
  const currDate = new Date();
  currDate.setHours(0);
  currDate.setMinutes(0);
  currDate.setSeconds(0);
  currDate.setMilliseconds(0);
  return new Date(currDate.getTime() + 24 * 60 * 60000);
};

export const getDatetime = (date: string, time: string) => {
  return new Date(Date.parse(`${date.split("/").reverse().join("-")}T${time}`));
};

export const getGraphFormat = (timestamp: Date) => {
  return `${timestamp.getHours().toString().padStart(2, "0")}:${timestamp
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};
