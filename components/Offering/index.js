import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ImgCarousel from "./ImageCarousel";
import Aos from "aos";
import ImgTable from "./ImgTable";
import CardLayanan from "../CardLayanan";

const layananAnak = [
  {
    image:'/images/services_icon/andrologi.png',
    title:'Pubertas Precox',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
  },
  {
    image:'/images/services_icon/endometriosis.png',
    title:'Amenore Primer',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
  }
]

const layananRemaja = [
  {
    image:'/images/services_icon/andrologi.png',
    title:'Vaksin HPV',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
  },
  {
    image:'/images/services_icon/endometriosis.png',
    title:'Gangguan Siklus Haid',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
  }
]

const layananDewasa = [
  {
    image:'/images/services_icon/andrologi.png',
    title:'Kontrasepsi',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
  },
  {
    image:'/images/services_icon/endometriosis.png',
    title:'Gangguan Kesuburan',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
  },
  {
    image:'/images/services_icon/reproduksi_genetik.png',
    title:'Pap Smear',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
  },
  {
    image:'/images/services_icon/masalah_kesuburan.png',
    title:'Colposcopy',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
  },
  {
    image:'/images/services_icon/operasi.png',
    title:'LEEP',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
  },
  {
    image:'/images/services_icon/stimulasi.png',
    title:'Hysteroscopy',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
  }
]

const layananParuh = [
  {
    image:'/images/services_icon/andrologi.png',
    title:'Menopause',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
  },
  {
    image:'/images/services_icon/endometriosis.png',
    title:'Vaginoplasty',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
  }
]

const layananTua = [
  {
    image:'/images/services_icon/andrologi.png',
    title:'Prolaps Uteri',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
  },
  {
    image:'/images/services_icon/endometriosis.png',
    title:'Laparascopy',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
  }
]

function Offering() {
  useEffect(() => {
    Aos.init();
  }, []);

  const [selected, setselected] = useState('dewasa')

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
                <ImgWrapper>
                  <ImgTable />
                </ImgWrapper>
              </div>
            </div>
            <div className="row align-items-center mt-5 me-5">
              <h1 className='ArticleTitleHome py-5'>Melayani Semua Usia</h1>
              <div className="row justify-content-center mb-2">
                <div className="text-center px-2" style={{width:'19%', cursor:'pointer'}} onClick={() => setselected('anak')}>
                  <img width="100%" src="/images/services_icon/anak.png"></img>
                  <div className={selected == 'anak' ? "layananUsiaSelected mt-2" : "layananUsia mt-2"}>Anak</div>
                  {selected == 'anak' ? <hr style={{backgroundColor:'#DF3034', border:'none', height:'3px', opacity: 1}}></hr> : ''}
               </div>
                <div className="text-center px-2" style={{width:'19%', cursor:'pointer'}} onClick={() => setselected('remaja')}>
                  <img width="100%" src="/images/services_icon/remaja.png"></img>
                  <div className={selected == 'remaja' ? "layananUsiaSelected mt-2" : "layananUsia mt-2"}>Remaja</div>
                  {selected == 'remaja' ? <hr style={{backgroundColor:'#DF3034', border:'none', height:'3px', opacity: 1}}></hr> : ''}
                </div>
                <div className="text-center px-2" style={{width:'19%', cursor:'pointer'}} onClick={() => setselected('dewasa')}>
                  <img width="100%" src="/images/services_icon/dewasa.png"></img>
                  <div className={selected == 'dewasa' ? "layananUsiaSelected mt-2" : "layananUsia mt-2"}>Dewasa Muda</div>
                  {selected == 'dewasa' ? <hr style={{backgroundColor:'#DF3034', border:'none', height:'3px', opacity: 1}}></hr> : ''}
                </div>
                <div className="text-center px-2" style={{width:'19%', cursor:'pointer'}} onClick={() => setselected('paruh_baya')}>
                  <img width="100%" src="/images/services_icon/paruh_baya.png"></img>
                  <div className={selected == 'paruh_baya' ? "layananUsiaSelected mt-2" : "layananUsia mt-2"}>Paruh Baya</div>
                  {selected == 'paruh_baya' ? <hr style={{backgroundColor:'#DF3034', border:'none', height:'3px', opacity: 1}}></hr> : ''}
                </div>
                <div className="text-center px-2" style={{width:'19%', cursor:'pointer'}} onClick={() => setselected('tua')}>
                  <img width="100%" src="/images/services_icon/tua.png"></img>
                  <div className={selected == 'tua' ? "layananUsiaSelected mt-2" : "layananUsia mt-2"}>Lanjut Usia</div>
                  {selected == 'tua' ? <hr style={{backgroundColor:'#DF3034', border:'none', height:'3px', opacity: 1}}></hr> : ''}
                </div>
              </div>
              <div className="row px-5">
                {
                    selected == 'anak' ? 
                    layananAnak.map((item, i) => (
                        <div className='col-xl-4 col-lg-4 col-md-6 col-12 p-4' key={i} data-aos="fade-up">
                            <CardLayanan image={item.image} title={item.title} text={item.text}></CardLayanan>
                        </div>
                    ))
                    :
                    selected == 'remaja' ?
                    layananRemaja.map((item, i) => (
                      <div className='col-xl-4 col-lg-4 col-md-6 col-12 p-4' key={i} data-aos="fade-up">
                          <CardLayanan image={item.image} title={item.title} text={item.text}></CardLayanan>
                      </div>
                    ))
                    :
                    selected == 'dewasa' ?
                    layananDewasa.map((item, i) => (
                      <div className='col-xl-4 col-lg-4 col-md-6 col-12 p-4' key={i} data-aos="fade-up">
                          <CardLayanan image={item.image} title={item.title} text={item.text}></CardLayanan>
                      </div>
                    ))
                    :
                    selected == 'paruh_baya' ?
                    layananParuh.map((item, i) => (
                      <div className='col-xl-4 col-lg-4 col-md-6 col-12 p-4' key={i} data-aos="fade-up">
                          <CardLayanan image={item.image} title={item.title} text={item.text}></CardLayanan>
                      </div>
                    ))
                    :
                    layananTua.map((item, i) => (
                      <div className='col-xl-4 col-lg-4 col-md-6 col-12 p-4' key={i} data-aos="fade-up">
                          <CardLayanan image={item.image} title={item.title} text={item.text}></CardLayanan>
                      </div>
                    ))
                }
              </div>
            </div>
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
                <ImgWrapper>
                  <ImgTable />
                </ImgWrapper>
              </div>
            </div>
            <div className="row mt-5">
              <h1 className='ArticleTitleHome text-center py-3' style={{fontSize:'26px',width:'95%'}}>Melayani Semua Usia</h1>
              <div className="row justify-content-center mb-2">
                <div className="col-12 text-center px-2 py-2" style={{cursor:'pointer'}} onClick={() => setselected('anak')}>
                  <img width="100%" src="/images/services_icon/anak.png"></img>
                  <div className={selected == 'anak' ? "layananUsiaSelected mt-2" : "layananUsia mt-2"}>Anak</div>
                  {selected == 'anak' ? <hr style={{backgroundColor:'#DF3034', border:'none', height:'3px', opacity: 1}}></hr> : ''}
               </div>
                <div className="col-12 text-center px-2 py-2" style={{cursor:'pointer'}} onClick={() => setselected('remaja')}>
                  <img width="100%" src="/images/services_icon/remaja.png"></img>
                  <div className={selected == 'remaja' ? "layananUsiaSelected mt-2" : "layananUsia mt-2"}>Remaja</div>
                  {selected == 'remaja' ? <hr style={{backgroundColor:'#DF3034', border:'none', height:'3px', opacity: 1}}></hr> : ''}
                </div>
                <div className="col-12 text-center px-2 py-2" style={{cursor:'pointer'}} onClick={() => setselected('dewasa')}>
                  <img width="100%" src="/images/services_icon/dewasa.png"></img>
                  <div className={selected == 'dewasa' ? "layananUsiaSelected mt-2" : "layananUsia mt-2"}>Dewasa Muda</div>
                  {selected == 'dewasa' ? <hr style={{backgroundColor:'#DF3034', border:'none', height:'3px', opacity: 1}}></hr> : ''}
                </div>
                <div className="col-12 text-center px-2 py-2" style={{cursor:'pointer'}} onClick={() => setselected('paruh_baya')}>
                  <img width="100%" src="/images/services_icon/paruh_baya.png"></img>
                  <div className={selected == 'paruh_baya' ? "layananUsiaSelected mt-2" : "layananUsia mt-2"}>Paruh Baya</div>
                  {selected == 'paruh_baya' ? <hr style={{backgroundColor:'#DF3034', border:'none', height:'3px', opacity: 1}}></hr> : ''}
                </div>
                <div className="col-12 text-center px-2 py-2" style={{cursor:'pointer'}} onClick={() => setselected('tua')}>
                  <img width="100%" src="/images/services_icon/tua.png"></img>
                  <div className={selected == 'tua' ? "layananUsiaSelected mt-2" : "layananUsia mt-2"}>Lanjut Usia</div>
                  {selected == 'tua' ? <hr style={{backgroundColor:'#DF3034', border:'none', height:'3px', opacity: 1}}></hr> : ''}
                </div>
              </div>
              <div className="row">
                {
                    selected == 'anak' ? 
                    layananAnak.map((item, i) => (
                        <div className='col-12 text-start py-2' key={i} data-aos="fade-up">
                            <CardLayanan image={item.image} title={item.title} text={item.text}></CardLayanan>
                        </div>
                    ))
                    :
                    selected == 'remaja' ?
                    layananRemaja.map((item, i) => (
                      <div className='col-12 text-start py-2' key={i} data-aos="fade-up">
                          <CardLayanan image={item.image} title={item.title} text={item.text}></CardLayanan>
                      </div>
                    ))
                    :
                    selected == 'dewasa' ?
                    layananDewasa.map((item, i) => (
                      <div className='col-12 text-start py-2' key={i} data-aos="fade-up">
                          <CardLayanan image={item.image} title={item.title} text={item.text}></CardLayanan>
                      </div>
                    ))
                    :
                    selected == 'paruh_baya' ?
                    layananParuh.map((item, i) => (
                      <div className='col-12 text-start py-2' key={i} data-aos="fade-up">
                          <CardLayanan image={item.image} title={item.title} text={item.text}></CardLayanan>
                      </div>
                    ))
                    :
                    layananTua.map((item, i) => (
                      <div className='col-12 text-start py-2' key={i} data-aos="fade-up">
                          <CardLayanan image={item.image} title={item.title} text={item.text}></CardLayanan>
                      </div>
                    ))
                }
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

  // padding: 2% 0 10% 5%;
`;

const ImgWrapper = styled.div`
  // padding: 0 50%;
  width: 85%;
  margin-top: 5%;

  @media (max-width: 1120px) {
    width: auto;
  }
`;

const AboutConfig = styled.div`
  font-family: "Poppins";
  padding: 5% 0 5% 5%;

  overflow: hidden;

  @media (max-width: 1121px) {
    /* padding: 5%; */
  }
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

  margin-bottom: 1rem;
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
