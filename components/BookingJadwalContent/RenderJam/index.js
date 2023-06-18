import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonJam from "../ButtonJam";

function RenderJam({ data, selectedDate }) {
  const [filteredDate, setFilteredDate] = useState([]);
  const filterData = data
    .filter(
      (item) =>
        item.day == selectedDate.day &&
        item.month == selectedDate.month &&
        item.year == selectedDate.year
    )
    .map((item) => item.hour);
  const availableHour = filterData.map((item) => item.available);
  const unavailableHour = filterData.map((item) => item.unavailable);
  const allHour = availableHour.flat(1).concat(unavailableHour.flat(1));
  const sortAllHour = allHour.sort(function (a, b) {
    return a - b;
  });
  const chkDisabled = () => {
    if (allHour.indexOf(unavailableHour) !== -1) return true
  }
  return (
    <Wrapper className="section">
      {sortAllHour.map((item) => (
        <ButtonJam text={item} disabled={chkDisabled} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 10px;

  overflow-y: auto;
  width: 39.375rem;
  height: 13.813rem;
`;

export default RenderJam;
