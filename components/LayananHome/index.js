import React from "react";
import CardLayanan from "../CardLayanan";
import ButtonAlt from "../ButtonAlt";
import styled from "styled-components";
import { serviceList } from "../ServiceData";

function LayananHome() {
  return (
    <section className="layananWrapper py-4" id="layanan">
      <Wrapper>
        <PC>
          <h1 className="ArticleTitleHome">Layanan Terbaik Untuk Kamu</h1>
          <div className="row px-5">
            {serviceList.slice(0, 9).map((item, i) => (
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 p-4"
                key={i}
                data-aos="fade-up"
              >
                <CardLayanan
                  image={item.icon}
                  title={item.title}
                  text={item.text}
                  link={"/services/" + item.id}
                ></CardLayanan>
              </div>
            ))}
          </div>
          <div className="row justify-content-center my-4">
            <div className="col-12 text-center">
              <ButtonAlt
                link="/services"
                text="Lihat Semua Layanan"
              ></ButtonAlt>
            </div>
          </div>
        </PC>
        <MOBILE>
          <h1 className="ArticleTitleHome">Layanan Terbaik Untuk Kamu</h1>
          <div className="row">
            {serviceList.slice(0, 9).map((item, i) => (
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 p-4"
                key={i}
                data-aos="fade-up"
              >
                <CardLayanan
                  image={item.icon}
                  title={item.title}
                  text={item.text}
                  link={"/services/" + item.id}
                ></CardLayanan>
              </div>
            ))}
          </div>
          <div className="row justify-content-center my-4">
            <div className="col-12 text-center">
              <ButtonAlt
                link="/services"
                text="Lihat Semua Layanan"
              ></ButtonAlt>
            </div>
          </div>
        </MOBILE>
      </Wrapper>
    </section>
  );
}

const Wrapper = styled.div`
  padding: 5%;
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

export default LayananHome;
