import React, { useEffect } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import Aos from "aos";

function ImgTable() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <Wrapper>
      <StyledText>
        <table>
          <tbody>
            <tr>
              <td data-aos="fade-up" style={{ padding: ".5rem 3rem .25rem 0" }}>
                <Icon
                  icon="ion:medkit"
                  className=""
                  style={{
                    cursor: "pointer",
                    fontSize: "36px",
                    color: "#DF3034",
                  }}
                />
              </td>
              <td data-aos="fade-up" style={{ padding: ".5rem 3rem .25rem 0" }}>
                <Icon
                  icon="mdi:heart"
                  className=""
                  style={{
                    cursor: "pointer",
                    fontSize: "36px",
                    color: "#DF3034",
                  }}
                />
              </td>
              <td data-aos="fade-up" style={{ padding: ".5rem 3rem .25rem 0" }}>
                <Icon
                  icon="ph:stethoscope-bold"
                  className=""
                  style={{
                    cursor: "pointer",
                    fontSize: "36px",
                    color: "#DF3034",
                  }}
                />
              </td>
              <td data-aos="fade-up" style={{ padding: ".5rem 3rem .25rem 0" }}>
                <Icon
                  icon="fa6-solid:hand-holding-medical"
                  className=""
                  style={{
                    cursor: "pointer",
                    fontSize: "36px",
                    color: "#DF3034",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td data-aos="fade-up" style={{ padding: ".5rem 3rem .25rem 0" }}>
                <StyledNumberTable>20+</StyledNumberTable>
              </td>
              <td data-aos="fade-up" style={{ padding: ".5rem 3rem .25rem 0" }}>
                <StyledNumberTable>8,500+</StyledNumberTable>
              </td>
              <td data-aos="fade-up" style={{ padding: ".5rem 3rem .25rem 0" }}>
                <StyledNumberTable>10+</StyledNumberTable>
              </td>
              <td data-aos="fade-up" style={{ padding: ".5rem 3rem .25rem 0" }}>
                <StyledNumberTable>10+</StyledNumberTable>
              </td>
            </tr>
            <tr>
              <td data-aos="fade-up" style={{ padding: ".5rem 3rem .25rem 0" }}>
                <StyledTextTable>Years of Experiences</StyledTextTable>
              </td>
              <td data-aos="fade-up" style={{ padding: ".5rem 3rem .25rem 0" }}>
                <StyledTextTable>Happy Patients</StyledTextTable>
              </td>
              <td data-aos="fade-up" style={{ padding: ".5rem 3rem .25rem 0" }}>
                <StyledTextTable>Qualified Doctors & Staffs</StyledTextTable>
              </td>
              <td data-aos="fade-up" style={{ padding: ".5rem 3rem .25rem 0" }}>
                <StyledTextTable>Services</StyledTextTable>
              </td>
            </tr>
          </tbody>
        </table>
      </StyledText>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* padding: 0 0 5% 0; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  padding-left:2.5rem;

  background: #ffffff;
  box-shadow: 0px 0px 2rem rgba(192, 192, 192, 0.25);
  border-radius: 5%;

  @media (max-width: 1121px) {
    box-shadow: none;
  }
`;

const StyledText = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  text-align: center;
  font-size: var(--fs-12);
`;

const StyledNumberTable = styled.div`
  color: #df3034;
  font-size: var(--fs-20);
`;

const StyledTextTable = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #8d8d8d;

  @media (max-width: 1121px) {
    font-size: 10px;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }

  @media (max-width: 468px) {
    font-size: 10px;
  }

  @media (max-width: 368px) {
    font-size: 8px;
  }
`;

export default ImgTable;
