import React, { useEffect, Fragment } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import Aos from "aos";

function ImgTable({ isMobile }) {
  const data = [
    {
      icon: "images/icons/ic-experience.svg",
      number: "20+",
      text: "Years of Experiences",
    },
    {
      icon: "images/icons/ic-love.svg",
      number: "15,000+",
      text: "Happy Patients",
    },
    { icon: "images/icons/ic-baby.svg", number: "10,100+", text: "IUI Baby" },
    {
      icon: "images/icons/ic-doctor.svg",
      number: "10+",
      text: "Qualified Doctors & Staffs",
    },

    { icon: "images/icons/ic-services.svg", number: "30+", text: "Services" },
  ];

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className={`row align-items-center ${isMobile ? "" : "me-5"}`}>
      <div className={`${isMobile ? "row" : "px-5"}`}>
        <Box>
          <StyledText>
            <div
              className={`d-flex flex-row justify-content-between ${
                isMobile ? "" : "px-5"
              }`}
              style={{ gap: "0.5rem" }}
            >
              {data.map((item, index) => (
                <Fragment key={index}>
                  <div data-aos="fade-up">
                    <img
                      src={item.icon}
                      alt={`Icon ${index}`}
                      style={{
                        cursor: "pointer",
                        width: "36px",
                        height: "36px",
                        marginBottom: "16px",
                      }}
                    />
                    <StyledNumberTable>{item.number}</StyledNumberTable>
                    <StyledTextTable>{item.text}</StyledTextTable>
                  </div>
                </Fragment>
              ))}
            </div>
          </StyledText>
        </Box>
      </div>
    </div>
  );
}

const Box = styled.div`
  padding: 1.5rem;
  background: #ffffff;
  box-shadow: 0px 0px 2rem rgba(192, 192, 192, 0.25);
  border-radius: 10px;
  margin-right: 2%;
  margin-left: 1%;
  margin-bottom: 10%;

  @media (max-width: 1121px) {
    box-shadow: none;
    margin-right: 0%;
    margin-left: 0%;
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
