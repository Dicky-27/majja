import React from "react";
import CardLayanan from "../CardLayanan";
import ButtonAlt from "../ButtonAlt";
import styled from "styled-components";

function LayananHome() {
  const layanan = [
    {
      image: "/images/services_icon/andrologi.png",
      title: "Andrologi",
      text: "Sindrom polikistik ovarium atau polycystic ovarian syndrome (PCOS) adalah gangguan hormon yang terjadi pada wanita di usia su..",
    },
    {
      image: "/images/services_icon/endometriosis.png",
      title: "Endometriosis",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
    },
    {
      image: "/images/services_icon/implantasi.png",
      title: "Implantasi & Kehamilan Dini",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
    },
    {
      image: "/images/services_icon/reproduksi_genetik.png",
      title: "Reproduksi Genetik",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
    },
    {
      image: "/images/services_icon/masalah_kesuburan.png",
      title: "Masalah Kesuburan",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
    },
    {
      image: "/images/services_icon/prakonsepsi.png",
      title: "Prakonsepsi ECS",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
    },
    {
      image: "/images/services_icon/operasi.png",
      title: "Operasi Endometriosis",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
    },
    {
      image: "/images/services_icon/stimulasi.png",
      title: "Stimulasi Ovarium",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
    },
    {
      image: "/images/services_icon/anomali.png",
      title: "Anomali Genital Wanita",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
    },
  ];
  return (
    <section className="layananWrapper py-4" id="layanan">
      <Wrapper>
        <PC>
          <h1 className="ArticleTitleHome">Layanan Terbaik Untuk Kamu</h1>
          <div className="row px-5">
            {layanan.map((item, i) => (
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 p-4"
                key={i}
                data-aos="fade-up"
              >
                <CardLayanan
                  image={item.image}
                  title={item.title}
                  text={item.text}
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
            {layanan.map((item, i) => (
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-12 p-4"
                key={i}
                data-aos="fade-up"
              >
                <CardLayanan
                  image={item.image}
                  title={item.title}
                  text={item.text}
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
