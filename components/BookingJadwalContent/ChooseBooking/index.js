import React, { useState } from "react";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import { Calendar, utils } from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "moment";
import styled from "styled-components";
import DetailDokter from "../DetailDokter";
import RenderJam from "../RenderJam";

// let today = moment()
// let currDate = today.date()
// let currMonth = today.month() + 1
// let currYear = today.year()
// const defaultValue = {
//   year: currYear,
//   month: currMonth,
//   day: currDate,
// };

const disabledDays = [
  {
    year: 2023,
    month: 6,
    day: 19,
  },
  {
    year: 2023,
    month: 6,
    day: 29,
  },
  {
    year: 2023,
    month: 6,
    day: 27,
  },
];

const availableDays = [
  {
    year: 2023,
    month: 6,
    day: 20,
    className: "GrDay",
    hour: {
      available: [9, 10, 17, 19, 20, 21],
      unavailable: [8, 18],
    },
  },
  {
    year: 2023,
    month: 6,
    day: 21,
    className: "GrDay",
    hour: {
      available: [9, 17, 19, 21],
      unavailable: [8, 10, 18, 20],
    },
  },
  {
    year: 2023,
    month: 6,
    day: 22,
    className: "GrDay",
    hour: {
      available: [8, 9, 10, 17, 19, 20, 21],
      unavailable: [18],
    },
  },
  {
    year: 2023,
    month: 6,
    day: 23,
    className: "GrDay",
    hour: {
      available: [8, 9, 10, 17, 18, 19, 20, 21],
      unavailable: [],
    },
  },
  {
    year: 2023,
    month: 6,
    day: 24,
    className: "GrDay",
    hour: {
      available: [9],
      unavailable: [8, 10, 17, 18, 19, 20, 21],
    },
  },
];

function ChooseBooking({dokter}) {
  const [selectedDay, setSelectedDay] = useState(utils().getToday());
  return (
    <div className="row align-items-center">
      <div className="col-5">
        <Calendar
          value={selectedDay}
          onChange={setSelectedDay}
          shouldHighlightWeekends
          minimumDate={utils().getToday()}
          disabledDays={disabledDays} // here to disable off days
          customDaysClassName={availableDays}
          colorPrimary="#DF3034"
          calendarClassName="responsive-calendar"
          style={{boxShadow:'none', width:'100%'}}
          renderFooter={() => (
            <div className="row align-items-center text-center">
              <StyledSelected className="col-4">Selected</StyledSelected>
              <StyledAvailable className="col-4">Available</StyledAvailable>
              <StyledNotAvail className="col-4">Not Available</StyledNotAvail>
            </div>
          )}
        />
      </div>
      <div className="col-7">
        <div>
          <DetailDokter />
        </div>
        <div>
          <RenderJam data={availableDays} selectedDate={selectedDay} />
        </div>
      </div>
    </div>
  );
}

const StyledSelected = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-12);
  color: #df3034;

  display: list-item;
  list-style-type: "•";
  list-style-position: inside;
`;

const StyledAvailable = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-12);
  color: #09a53e;

  display: list-item;
  list-style-type: "•";
  list-style-position: inside;
`;

const StyledNotAvail = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-12);
  color: #8d8d8d;

  display: list-item;
  list-style-type: "•";
  list-style-position: inside;
`;

export default ChooseBooking;
