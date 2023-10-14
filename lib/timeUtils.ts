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

export const padTimePortion = (timePortion: number) => {
  return timePortion.toString().padStart(2, "0");
};

export const getDatetime = (date: string, time: string) => {
  return new Date(Date.parse(`${date.split("/").reverse().join("-")}T${time}`));
};

export const getGraphFormat = (timestamp: Date) => {
  return `${padTimePortion(timestamp.getHours())}:${padTimePortion(
    timestamp.getMinutes()
  )}`;
};

export const getTime = (timestamp: Date) => {
  return `${padTimePortion(timestamp.getHours())}:${padTimePortion(
    timestamp.getMinutes()
  )}:${padTimePortion(timestamp.getSeconds())}`;
};

export const getDate = (timestamp: Date) => {
  return `${timestamp.getFullYear()} ${timestamp.getMonth()} ${timestamp.getDay()}`;
};
