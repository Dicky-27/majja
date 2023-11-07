import React, { useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import DetailBooking from "../DetailBooking";

function ButtonJam({ text, disabled }) {
  const [value, setValue] = useState();
  // const handleInput = (e) => {
  //   // console.log(e.target.value);
  //   setValue(e.target.value);
  //   console.log(value)
  // };
  return (
    <Wrapper 
    // onClick={(e) => handleInput(e, "value")}
    onClick={(e) => setValue(e.target.value, "value")}
    >
      <StyledButton value={text} disabled={disabled}>
        {moment(text, "HH").format("HH:mm")}
      </StyledButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 5% 0 0 0;
`;

const StyledButton = styled.button`
  /* display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center; */
  padding: 0.8rem 4rem;

  background: #ffffff;
  border: 0.2rem solid #e0e0e0;
  border-radius: 1rem;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-14);

  :focus {
    color: #ffffff;
    background: #df3034;
  }
`;
export default ButtonJam;
