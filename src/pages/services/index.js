import React from "react";
import Head from "next/head";
import Navbar from "../../../components/Navbar";
import FloatingWA from "../../../components/FloatingWA";
import Footer from "../../../components/footer";
import styled from "styled-components";
import ServicesPageContent from "../../../components/ServicesPageContent";

function Services() {
  return (
    <>
      <Head>
        <title>Layanan</title>
      </Head>
      <Navbar></Navbar>
      <StyledSection>
        <ServicesPageContent />
      </StyledSection>
      <FloatingWA></FloatingWA>
      <Footer></Footer>
    </>
  );
}

const StyledSection = styled.section`
  background: #f9fcff;
  padding-top: 10%;

  /* @media (max-width: 1120px) {
    padding-top: 30%;
  } */
`;

export default Services;
