import dayjs from "dayjs";

export const PREDEFINED_LOCATIONS_FITLERS = [
  {
    title: "Jersulem",
    locations: [
      "עמינדב",
      "אורה",
      "ירושלים - מרכז",
      "ירושלים - מערב",
      "ירושלים - דרום",
      "ירושלים - מזרח",
      "פנימיית עין כרם",
      "אבן ספיר",
      "מבשרת ציון",
      "בית זית",
      "ירושלים - צפון",
      "מוצא עילית",
      "גבעת זאב",
    ],
  },
];

const generateWarDates = () => {
  const dates = [];
  let startingDate = dayjs("07-10-2023", "DD-MM-YYYY").startOf("day");
  const today = dayjs().startOf("day");

  while (!startingDate.isAfter(today)) {
    dates.push(startingDate);
    startingDate = startingDate.add(1, "day");
  }

  return dates;
};

export const PREDEFINED_DATES_FILTERS = [
  {
    title: "Iron Swords",
    dates: generateWarDates(),
  },
  {
    title: "Today",
    dates: [dayjs().startOf("day")],
  },
];
