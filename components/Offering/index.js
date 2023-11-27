import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ImgCarousel from "./ImageCarousel";
import Aos from "aos";
import ImgTable from "./ImgTable";
import CardLayanan from "../CardLayanan";
import Speciality from "./Speciality";

const layananAnak = [
  {
    image: "/images/services_icon/andrologi.png",
    title: "Pubertas Precox",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
  },
  {
    image: "/images/services_icon/endometriosis.png",
    title: "Amenore Primer",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
  },
];

const layananRemaja = [
  {
    image: "/images/services_icon/andrologi.png",
    title: "Vaksin HPV",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
  },
  {
    image: "/images/services_icon/endometriosis.png",
    title: "Gangguan Siklus Haid",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
  },
];

const layananDewasa = [
  {
    image: "/images/services_icon/andrologi.png",
    title: "Kontrasepsi",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
  },
  {
    image: "/images/services_icon/endometriosis.png",
    title: "Gangguan Kesuburan",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
  },
  {
    image: "/images/services_icon/reproduksi_genetik.png",
    title: "Pap Smear",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
  },
  {
    image: "/images/services_icon/masalah_kesuburan.png",
    title: "Colposcopy",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
  },
  {
    image: "/images/services_icon/operasi.png",
    title: "LEEP",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
  },
  {
    image: "/images/services_icon/stimulasi.png",
    title: "Hysteroscopy",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
  },
];

const layananParuh = [
  {
    image: "/images/services_icon/andrologi.png",
    title: "Menopause",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
  },
  {
    image: "/images/services_icon/endometriosis.png",
    title: "Vaginoplasty",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
  },
];

const layananTua = [
  {
    image: "/images/services_icon/andrologi.png",
    title: "Prolaps Uteri",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
  },
  {
    image: "/images/services_icon/endometriosis.png",
    title: "Laparascopy",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc",
  },
];

function Offering() {
  useEffect(() => {
    Aos.init();
  }, []);

  const [selected, setselected] = useState("dewasa");

  return (
    <Wrapper id="offering">
      <AboutConfig>
        <PC>
          <div className="container-fluid" data-aos="fade up">
            <div className="row align-items-center">
              <div className="col-6">
                <ImgCarousel />
              </div>
              <div className="col-6">
                <StyledTitle>
                  MAJJA Klinik menawarkan layanan konsultasi dan pengobatan
                  lengkap untuk masalah{" "}
                  <span style={{ color: "#A5090C" }}>kesuburan.</span>
                </StyledTitle>
                <StyledText>
                  Dengan tim medis ahli di bidang Obstetri, Ginekologi, dan
                  Andrologi, MAJJA Klinik menggunakan teknologi mutakhir dan
                  metode efektif untuk memberikan diagnosis akurat dan
                  penanganan yang tepat.
                </StyledText>
              </div>
            </div>
            <ImgTable isMobile={false} />
            <Speciality isMobile={false} />
          </div>
        </PC>

        <MOBILE>
          <div className="container text-center">
            <div className="row align-items-center">
              <div className="col-12">
                <ImgCarousel />
              </div>
              <div className="col-12">
                <StyledTitle>
                  MAJJA Klinik menawarkan layanan konsultasi dan pengobatan
                  lengkap untuk masalah{" "}
                  <span style={{ color: "#A5090C" }}>kesuburan.</span>
                </StyledTitle>
                <StyledText>
                  Dengan tim medis ahli di bidang Obstetri, Ginekologi, dan
                  Andrologi, MAJJA Klinik menggunakan teknologi mutakhir dan
                  metode efektif untuk memberikan diagnosis akurat dan
                  penanganan yang tepat.
                </StyledText>
              </div>
            </div>
            <ImgWrapper>
              <ImgTable isMobile={true} />
            </ImgWrapper>
            <Speciality isMobile={true} />
          </div>
        </MOBILE>
      </AboutConfig>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: transparent;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ImgWrapper = styled.div`
  margin-top: 5%;

  @media (max-width: 1120px) {
    width: auto;
  }
`;

const AboutConfig = styled.div`
  font-family: "Poppins";
  padding: 5% 0 5% 5%;

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

const StyledTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-32);
  line-height: 150%;
  color: #262626;

  margin-bottom: 2rem;
  inline-size: 85%;
  overflow-wrap: break-word;
  text-align: left;

  @media (max-width: 1121px) {
    font-size: var(--fs-32);
  }

  @media (max-width: 768px) {
    font-size: var(--fs-22);
  }

  @media (max-width: 468px) {
    font-size: var(--fs-28);
  }

  @media (max-width: 368px) {
    font-size: var(--fs-26);
  }
`;

const StyledText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: var(--fs-16);
  line-height: 182%;
  color: #8d8d8d;

  inline-size: 85%;
  overflow-wrap: break-word;
  text-align: left;

  @media (max-width: 1121px) {
    font-size: var(--fs-16);
  }

  @media (max-width: 768px) {
    font-size: var(--fs-14);
  }

  @media (max-width: 468px) {
    font-size: var(--fs-14);
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

export default Offering;
