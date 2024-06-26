import React, { useEffect } from "react";
import styled from "styled-components";
import AddresTemp from "./AddressTemp";
import Button from "../Button";
import { Icon } from "@iconify/react";
import Aos from "aos";

function FindUs() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <Wrapper id="findUs">
      <AboutConfig>
        <div>
          <Image src={"/images/img-flower.svg"} width="100%"></Image>
        </div>

        <PC>
          <StyledSectionTitle className="px-5">Find Us!</StyledSectionTitle>
          <div className="px-5 p-0" data-aos="fade-up">
            <div className="row align-items-center">
              <div className="col-6 p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15866.85873367116!2d106.806317!3d-6.168947!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f7a57dbadcb3%3A0x96cb5b79b9070c36!2sMAJJA%20Klinik%20Fertilitas%20Endokrin%20Reproduksi!5e0!3m2!1sen!2sid!4v1686694634517!5m2!1sen!2sid"
                  height="472px"
                  style={{
                    border: "0",
                    width: "95%",
                    borderRadius: "10px",
                    marginLeft: "10px",
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-1">
                    <Icon
                      icon="mdi:location"
                      className=""
                      style={{
                        cursor: "pointer",
                        fontSize: "36px",
                        color: "#A5090C",
                      }}
                    />
                  </div>
                  <div className="col-11">
                    <AddresTemp />
                  </div>
                </div>
                <StyledSectionWrapper className="row">
                  <div className="col-1">
                    <Icon
                      icon="mdi:telephone"
                      rotate={3}
                      className=""
                      style={{
                        cursor: "pointer",
                        fontSize: "36px",
                        color: "#A5090C",
                      }}
                    />
                  </div>
                  <StyledSubTitle className="col-11 mb-5">
                    +62 813 8075 1331
                  </StyledSubTitle>
                </StyledSectionWrapper>
                <StyledSectionWrapper className="row">
                  <div className="col-1">
                    <Icon
                      icon="tabler:mail-filled"
                      className=""
                      style={{
                        cursor: "pointer",
                        fontSize: "36px",
                        color: "#A5090C",
                      }}
                    />
                  </div>
                  <StyledSubTitle className="col-11">
                    sekretariat.majja@gmail.com
                  </StyledSubTitle>
                </StyledSectionWrapper>
                <ButtonWrapper>
                  <Button link="/doctor" text="Booking Sekarang"></Button>
                </ButtonWrapper>
              </div>
            </div>
          </div>
        </PC>

        <MOBILE>
          <StyledSectionTitle>Find Us!</StyledSectionTitle>
          <div>
            <div className="row align-items-center">
              <div className="col-12">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15866.85873367116!2d106.806317!3d-6.168947!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f7a57dbadcb3%3A0x96cb5b79b9070c36!2sMAJJA%20Klinik%20Fertilitas%20Endokrin%20Reproduksi!5e0!3m2!1sen!2sid!4v1686694634517!5m2!1sen!2sid"
                  height="472px"
                  style={{ border: "0", width: "100%", borderRadius: "10px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="col-12 py-4">
                <div className="row">
                  <div className="col-1">
                    <Icon
                      icon="mdi:location"
                      className=""
                      style={{
                        cursor: "pointer",
                        fontSize: "26px",
                        color: "#A5090C",
                      }}
                    />
                  </div>
                  <div className="col-11">
                    <AddresTemp />
                  </div>
                </div>
                <StyledSectionWrapper className="row">
                  <div className="col-1">
                    <Icon
                      icon="mdi:telephone"
                      rotate={3}
                      className=""
                      style={{
                        cursor: "pointer",
                        fontSize: "26px",
                        color: "#A5090C",
                      }}
                    />
                  </div>
                  <StyledSubTitle className="col-11 mb-5">
                    +62 813 8075 1331
                  </StyledSubTitle>
                </StyledSectionWrapper>
                <StyledSectionWrapper className="row">
                  <div className="col-1">
                    <Icon
                      icon="tabler:mail-filled"
                      className=""
                      style={{
                        cursor: "pointer",
                        fontSize: "26px",
                        color: "#A5090C",
                      }}
                    />
                  </div>
                  <StyledSubTitle className="col-11">
                    sekretariat.majja@gmail.com
                  </StyledSubTitle>
                </StyledSectionWrapper>
                <ButtonWrapper>
                  <Button link="/doctor" text="Booking Sekarang"></Button>
                </ButtonWrapper>
              </div>
            </div>
          </div>
        </MOBILE>
      </AboutConfig>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */

  background: transparent;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const AboutConfig = styled.div`
  position: relative;
  font-family: "Poppins";
  padding: 5% 5% 10% 5%;
  overflow: hidden;
`;

const PC = styled.div`
  @media (max-width: 1120px) {
    display: none;
  }
`;

const MOBILE = styled.div`
  @media (min-width: 1121px) {
    display: none;
  }
`;

const StyledSectionWrapper = styled.div`
  padding: 0 5% 0 0;
`;

const ButtonWrapper = styled.div`
  padding: 10% 0 0 0;
`;

const StyledSectionTitle = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: var(--fs-32);
  color: #a5090c;

  padding: 0 0 2.5% 0;
`;

const StyledTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: var(--fs-42);
  line-height: 162%;
  color: #262626;

  margin-bottom: 5%;

  @media (max-width: 1121px) {
    font-size: var(--fs-42);
  }

  @media (max-width: 768px) {
    font-size: var(--fs-32);
  }

  @media (max-width: 468px) {
    font-size: var(--fs-28);
  }

  @media (max-width: 368px) {
    font-size: var(--fs-26);
  }
`;

const StyledSubTitle = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-18);
  color: #262626;
`;

const StyledText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: var(--fs-22);
  line-height: 162%;
  color: #8d8d8d;

  @media (max-width: 1121px) {
    font-size: var(--fs-22);
  }

  @media (max-width: 768px) {
    font-size: var(--fs-20);
  }

  @media (max-width: 468px) {
    font-size: var(--fs-18);
  }

  @media (max-width: 368px) {
    font-size: var(--fs-12);
  }
`;

const IMG = styled.img`
  width: 100%;

  @media (max-width: 1121px) {
    width: 50%;
    margin: 10% auto;
  }

  /* @media (max-width: 768px) {
    font-size: var(--fs-42);
  }

  @media (max-width: 468px) {
    font-size: var(--fs-32);
  }

  @media (max-width: 368px) {
    font-size: var(--fs-28);
  } */
`;

const Image = styled.img`
  position: absolute;

  @media (max-width: 1120px) {
    width: 40vh;
    right: -4vh;
    bottom: -3vh;
    z-index: -1;
  }

  @media (min-width: 1121px) {
    width: 75vh;
    right: -4vh;
    bottom: -3vh;
    z-index: -1;
  }
`;

export default FindUs;
