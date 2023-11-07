import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

function DetailDokter() {
  return (
    <div className="row mb-4">
      <div className="col-3">
        <img src="/images/doctor1Rec.png" alt="doctor1" width="90%" />
      </div>
      <div className="col-9">
        <StyledTitle>Dr. Cindy Rani, SpOG-KFER</StyledTitle>
        <StyledText>Spesialis Obstetri dan Ginekologi</StyledText>
        <StyledTextWIcon>
          <Icon
            icon="ion:medkit"
            className=""
            style={{
              cursor: "pointer",
              fontSize: "var(--fs-24)",
              color: "#8D8D8D",
              marginRight: "2%", 
            }}
          />
          Pengalaman: 15 tahun
        </StyledTextWIcon>
      </div>
    </div>
  );
}

const StyledTitle = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-18);
  color: #433b3b;

  margin-bottom: 2%;
`;

const StyledText = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  text-align: "center";
  font-size: var(--fs-14);
  color: #8d8d8d;

  margin-bottom: 10%;
`;

const StyledTextWIcon = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  text-align: "center";
  font-size: var(--fs-14);
  color: #8d8d8d;
`;

export default DetailDokter;
