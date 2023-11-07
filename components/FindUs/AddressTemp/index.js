import React from "react";
import styled from "styled-components";

function AddresTemp() {
  return (
    <Wrapper className="mb-5">
      <div>
        <StyledTitle>MAJJA Klinik Fertilitas Endokrin Reproduksi</StyledTitle>
        <StyledText>
          Jl. Ternate No.17, RT.14/RW.6, Cideng, Kec. Gambir, Kota Jakarta
          Barat, DKI Jakarta 10150
        </StyledText>
      </div>
      <div className="mt-4">
        <StyledTitle>Opening Hours</StyledTitle>
        <StyledText>
          <table>
            <tbody>
              <tr>
                <td style={{ padding: ".5rem 3rem .25rem 0" }}>Mon - Fri</td>
                <td style={{ padding: ".5rem 3rem .25rem 0" }}>
                  06.00 - 22.00
                </td>
              </tr>
              <tr>
                <td style={{ padding: ".5rem 3rem .25rem 0" }}>Sat - Sun</td>
                <td style={{ padding: ".5rem 3rem .25rem 0" }}>06.00 - 20.00</td>
              </tr>
            </tbody>
          </table>
        </StyledText>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* padding: 0 0 5% 0; */
`;

const StyledTitle = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-18);
  color: #262626;
`;

const StyledText = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  text-align:'center';
  font-size: var(--fs-14);

  /* Black */
  color: #262626;

  opacity: 0.6;
`;

export default AddresTemp;
