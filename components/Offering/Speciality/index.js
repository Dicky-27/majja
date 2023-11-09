import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Aos from "aos";
import CardSpeciality from "../../CardSpeciality";

const specialities = [
  {
    image: "/images/img-obstetrics.png",
    title: "Obstetri",
    caption:
      "Percayakan perjalanan kehamilan Anda bersama dokter spesialis kebidanan kami.",
  },
  {
    image: "/images/img-gynecologist.png",
    title: "Ginekologi Fertilitas",
    caption:
      "Temui ahli ginekologi fertilitas klinik kami yang berdedikasi untuk mendukung kesehatan dan kesejahteraan alat reproduksi Anda.",
  },
  {
    image: "/images/img-child.png",
    title: "Anak",
    caption:
      "Percayakan kesehatan, pertumbuhan, dan perkembangan anak Anda sejak bayi hingga remaja pada dokter spesialis anak kami.",
  },
  {
    image: "/images/img-internist.png",
    title: "Internis (Penyakit Dalam)",
    caption:
      "Temui dokter spesialis penyakit dalam kami yang berdedikasi untuk memberikan perawatan komprehensif, dari diagnosis hingga pengobatan.",
  },
  {
    image: "/images/img-vaccine.png",
    title: "Vaksin",
    caption:
      "Majja Klinik menyediakan beragam jenis vaksin untuk melindungi Anda dan orang-orang tercinta, menjamin masa depan yang lebih sehat.",
  },
  {
    image: "/images/img-nutrition.png",
    title: "Gizi",
    caption:
      "Optimalkan kesehatan Anda dengan panduan nutrisi dari ahli gizi berpengalaman kami.",
  },
];

function Speciality({ isMobile }) {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className={`mt-5 row align-items-center ${isMobile ? "" : "me-5"}`}>
      <h1
        className="ArticleTitleHome text-center"
        style={isMobile ? { fontSize: "26px", width: "95%" } : {}}
      >
        Spesialisasi Kami
      </h1>
      <div className={`row ${isMobile ? "" : "px-5"}`}>
        {specialities.map((item, i) => (
          <div
            className={`${
              isMobile
                ? "col-12 text-start py-2"
                : "col-xl-4 col-lg-4 col-md-6 col-12 p-4"
            } `}
            key={i}
            data-aos="fade-up"
          >
            <CardSpeciality
              image={item.image}
              title={item.title}
              caption={item.caption}
            ></CardSpeciality>
          </div>
        ))}
      </div>
    </div>
  );
}

const Wrapper = styled.div``;

const AboutConfig = styled.div`
  font-family: "Poppins";
  padding: 5% 0 5% 5%;

  overflow: hidden;

  @media (max-width: 1121px) {
    /* padding: 5%; */
  }
`;

export default Speciality;
