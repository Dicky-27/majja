export const getEveryNDayDates = (n) => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1); // Start from January 1st of the current year
  const endDate = new Date(currentDate.getFullYear(), 11, 31); // End on December 31st of the current year

  const mondayDates = [];
  let currentDatePointer = startDate;

  while (currentDatePointer <= endDate) {
    if (currentDatePointer.getDay() === n) {
      mondayDates.push(new Date(currentDatePointer)); // Store a new instance of the date
    }
    currentDatePointer.setDate(currentDatePointer.getDate() + 1); // Move to the next day
  }

  return mondayDates;
};

export const getArrayEveryNDayDatesFromToday = (weekdays) => {
  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  ); // Start from the current date
  const endDate = new Date(currentDate.getFullYear(), 11, 31); // End on December 31st of the current year

  const selectedDates = [];
  let currentDatePointer = startDate;

  while (currentDatePointer <= endDate) {
    const weekday = currentDatePointer.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

    if (weekdays?.includes(weekday.toString())) {
      selectedDates.push(new Date(currentDatePointer)); // Store a new instance of the date
    }

    currentDatePointer.setDate(currentDatePointer.getDate() + 1); // Move to the next day
  }

  return selectedDates;
};

export const getArrayEveryNDayDates = (weekdays) => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1); // Start from January 1st of the current year
  const endDate = new Date(currentDate.getFullYear(), 11, 31); // End on December 31st of the current year

  const selectedDates = [];
  let currentDatePointer = startDate;

  while (currentDatePointer <= endDate) {
    const weekday = currentDatePointer.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

    if (weekdays && weekdays.includes(weekday.toString())) {
      selectedDates.push(new Date(currentDatePointer)); // Store a new instance of the date
    }

    currentDatePointer.setDate(currentDatePointer.getDate() + 1); // Move to the next day
  }

  return selectedDates;
};

export const transformDatesToFormatDaysOff = (datesArray) => {
  const transformedDates = datesArray.map((date) => ({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }));

  return transformedDates;
};

export const transformDatesToFormatDaysOn = (datesArray) => {
  const transformedDates = datesArray.map((date) => ({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    className: "GrDay",
  }));

  return transformedDates;
};

export const getArrayEveryNDayDates2 = (weekdays) => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1); // Start from January 1st of the current year
  const endDate = new Date(currentDate.getFullYear(), 11, 31); // End on December 31st of the current year

  const selectedDates = [];
  let currentDatePointer = startDate;

  while (currentDatePointer <= endDate) {
    const weekday = currentDatePointer.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

    if (weekdays.includes(weekday.toString())) {
      const formattedDate = currentDatePointer.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
      selectedDates.push(formattedDate); // Store the formatted date
    }

    currentDatePointer.setDate(currentDatePointer.getDate() + 1); // Move to the next day
  }

  return selectedDates;
};

export const getArrayEveryNDayDatesDDOnly = (weekdays) => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1); // Start from January 1st of the current year
  const endDate = new Date(currentDate.getFullYear(), 11, 31); // End on December 31st of the current year

  const selectedDates = [];
  let currentDatePointer = startDate;

  while (currentDatePointer <= endDate) {
    const weekday = currentDatePointer.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

    if (weekdays.includes(weekday.toString())) {
      const dayOfMonth = currentDatePointer.getDate(); // Get the day of the month
      selectedDates.push(dayOfMonth); // Store the day of the month
    }

    currentDatePointer.setDate(currentDatePointer.getDate() + 1); // Move to the next day
  }

  return selectedDates;
};

export const getArrayEveryNDayDatesMMOnly = (weekdays) => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1); // Start from January 1st of the current year
  const endDate = new Date(currentDate.getFullYear(), 11, 31); // End on December 31st of the current year

  const selectedMonths = [];
  let currentDatePointer = startDate;

  while (currentDatePointer <= endDate) {
    const weekday = currentDatePointer.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

    if (weekdays.includes(weekday.toString())) {
      const month = currentDatePointer.getMonth() + 1; // Get the month (0-based index, so add 1)
      selectedMonths.push(month); // Store the month
    }

    currentDatePointer.setDate(currentDatePointer.getDate() + 1); // Move to the next day
  }

  return selectedMonths;
};

export const getArrayEveryNDayDatesYYYYOnly = (weekdays) => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1); // Start from January 1st of the current year
  const endDate = new Date(currentDate.getFullYear(), 11, 31); // End on December 31st of the current year

  const selectedYears = [];
  let currentDatePointer = startDate;

  while (currentDatePointer <= endDate) {
    const weekday = currentDatePointer.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

    if (weekdays.includes(weekday.toString())) {
      const year = currentDatePointer.getFullYear(); // Get the year
      selectedYears.push(year); // Store the year
    }

    currentDatePointer.setDate(currentDatePointer.getDate() + 1); // Move to the next day
  }

  return selectedYears;
};

export const getDayNumber = (day) => {
  const daysOfWeek = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];
  const dayIndex = daysOfWeek.indexOf(day);

  // If the day is not found in the array, return -1 or handle the error case as desired
  if (dayIndex === -1) {
    return -1;
  }

  // Adding 1 to the index since the array is zero-based, but you want the numbers to start from 1
  return dayIndex + 1;
};

export const convertDaysToNumbers = (days) => {
  const daysOfWeek = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];

  const numbers = days && days.map((day) => {
    const dayIndex = daysOfWeek.indexOf(day);

    // If the day is not found in the array, return an empty string or handle the error case as desired
    if (dayIndex === -1) {
      return "";
    }

    // Adding 1 to the index since the array is zero-based, but you want the numbers to start from 1
    return (dayIndex + 1).toString();
  });

  return numbers;
};
