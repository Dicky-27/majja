import React from "react";
import { Card } from "antd";
import moment, { months } from "moment";
import styled from "styled-components";
import { Icon } from "@iconify/react";

function DetailBooking({ value, dateItem, showCalendar, setshowCalendar, bayar,loading }) {
  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("en-US", {
      month: "long",
    });
  };
  var convDate =
    `${dateItem.year}` + "-" + `${dateItem.month}` + "-" + `${dateItem.day}`;
  var dt = moment(convDate, "YYYY-MM-DD");

  return (
    <div>
      <Card
        title="Detail Booking"
        // bordered={false}
        headStyle={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: "22px",
          color: "#433B3B",
          paddingTop:'35px'
        }}
        style={{
          width: "100%",
          // maxHeight: "auto",
          minHeight: "32rem",
          borderRadius: "1.5rem",
        }}
      >
        {/* {value ? ( */}
          <div>
            <TopWrapper>
              <StyledText>Sesi Konsultasi</StyledText>
              {
                dateItem &&
              <StyledText>
                {dt.format("dddd")}, {dateItem.day}{" "}
                {getMonthName(dateItem.month)} {dateItem.year}
              </StyledText>
              }
              <StyledText>Jam {value ? moment(value, "HH").format("HH:mm") : ''}</StyledText>
            </TopWrapper>
            <StyledDashed />
            <BottomWrapper>
              <StyledTextPaymentTitle>Detail Pembayaran</StyledTextPaymentTitle>
              <div className="row align-items-center">
                <div className="col-6">
                  <StyledTextPayment>Total</StyledTextPayment>
                </div>
                <div className="col-6">
                  <StyledNumberPayment>Rp 50.000,-</StyledNumberPayment>
                </div>
              </div>
            </BottomWrapper>
            {
              !loading ? 
                (
                  showCalendar ? 
                  (value?
                  <LoginButton onClick={() => setshowCalendar(false)}>Selanjutnya</LoginButton>
                  :
                  <DisabledButton onClick={() => setshowCalendar(false)} disabled={true}>Selajutnya</DisabledButton>
                  )
                  :
                  <LoginButton onClick={() => bayar()}>Bayar</LoginButton>
                )
              :
              <Icon
                icon="svg-spinners:pulse-3"
                className="text-right"
                style={{ cursor: "pointer", fontSize: "108px", color: '#DF3034' }}
              />
            }
            </div>
         {/* ) : (
          <></>
        )}  */}
      </Card>
    </div>
  );
}

const TopWrapper = styled.div`
  margin: 5%;
`;

const BottomWrapper = styled.div`
  margin: 5%;
`;

const StyledDashed = styled.div`
  border: 0.15rem dashed #e0e0e0;
`;

const StyledText = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  text-align: "center";
  font-size: var(--fs-14);
  color: #433b3b;

  margin: 5% 0;
`;

const StyledTextPaymentTitle = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-14);
  color: #8d8d8d;
  margin-bottom: 20%;
`;

const StyledTextPayment = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  text-align: "center";
  font-size: var(--fs-14);
  color: #433b3b;
`;

const StyledNumberPayment = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  text-align: "center";
  font-size: var(--fs-14);
  color: #433b3b;

  display: flex;
  justify-content: flex-end;
`;

const LoginButton = styled.button`
  background: #df3034;
  width: 100%;
  border: 0.2rem solid #df3034;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-16);
  color: #ffffff;

  margin-top: 15%;
`;

const DisabledButton = styled.button`
  background: #ccc;
  width: 100%;
  border: 0.2rem solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-16);
  color: #ffffff;
  cursor:not-allowed;

  margin-top: 15%;`
;

export default DetailBooking;
