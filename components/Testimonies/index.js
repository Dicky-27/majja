/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css/navigation";
SwiperCore.use([Navigation]);
import AOS from "aos";
import Card from "../Card";
// import i18n from '../../i18n';

const eventsEN = [
  {
    id: 1,
    text: "“Rekomended.. sudah terbukti, kami pasien dari Dr. Cindy, dari awal kandungan istri lemah sampai di pantau terus, dan akhirnya lahir dengan selamat putri kami tercinta.. Terima kasih Dr. Cindy, suster Theresa.”",
    title: "Shania Wiranty",
    stars: 5,
  },
  {
    id: 2,
    text: '"dari awal kontrol sampe lahiran selalu disini , bagus banget pelayananan nya khusus nya buat Dr.Cindy yg udh selalu kasih penjelasan mendetail tanpa harus di tanya2 ❤️"',
    title: "Indrawati Ekaria",
    stars: 5,
  },
  {
    id: 3,
    text: "“Dari program mau punya baby sampe skrg anak udah mo 5 tahun, kalau masalah obgyn selalu cari dr. Cindy. Kliniknya juga uda semakin keren, alat2nya canggih. Vaksin HPV Gardasil 9 juga uda tersedia disini. Thank you dr. Cindy 👍👍”",
    title: "Amelia Juliani",
    stars: 5,
  },
  {
    id: 4,
    text: "“Love banget sm dok Cindy & dok HariantoHamil 12 week nge flek ud ke dok lain tp malah ampuhnya ke dok Cindy smpai lahiran di Majja juga ❤ pelayanan nya duhhhh mantul deh pkknya”",
    title: "Rika Andriani",
    stars: 5,
  },
  {
    id: 5,
    text: "“Istri Sudah menjadi pasien dr Cindy sejak 9 tahun yang lalu (anak ke 2 dan ke 3). Dr Cindy selalu merawat istri bagaikan merawat sahabat atau keluarga nya sendiri, jadi kita bisa ngobrol dan bertanya apa saja ke dokter Cindy. Penuh empati dan tulus dalam pekerjaan nya.”",
    title: "Boy Utama",
    stars: 5,
  },
  {
    id: 6,
    text: "“Dr. Cindy helped us enormously. She is very professional and takes the time to speak to you (and understands and speaks a fair amount of Dutch) Thanks for all the help”",
    title: "Assia El Fakir",
    stars: 5,
  },
  {
    id: 7,
    text: "“Dokternya ramah, kalau meriksa itu sabar & detail, ngejelasinya juga sampai clear tanya apapun pasti di jawab ampe jelas. Kmrn kesana cek up sekalian bawa dibawel hasil promil sama Dr Cindy 😊. Tempatnya juga super nyaman & cozy ada lift nya loh 😆”",
    title: "Feby Patricia",
    stars: 5,
  },
  {
    id: 8,
    text: "“Love banget sm Dr Cindy & Dr Harianto. Hamil 12 week nge flek ud ke dok lain tp malah ampuhnya ke dok Cindy smpai lahiran di Majja juga ❤Pelayanan nya duhhhh mantul deh pkknya.”",
    title: "Ping Ping",
    stars: 5,
  },
];

function Testimonies() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Wrapper className="container-fluid py-5 my-5">
      <h1 className="testi-title mb-4">Dipercaya Oleh 8,500+ Pelanggan</h1>
      <div className="backtestimonies">
        <div className="row justify-content-center">
          <div className="col-12 my-5">
            {/* PC version */}
            <div className="swipercarousel" data-aos="fade-up">
              <Swiper
                slidesPerView={4}
                spaceBetween={20}
                slidesPerGroup={1}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                autoHeight={true}
              >
                {eventsEN.map((item, i) => (
                  <SwiperSlide key={i}>
                    <Card
                      text={item.text}
                      title={item.title}
                      starCount={item.stars}
                    ></Card>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
            {/* Mobile version */}
            <div className="swipercarouselphone" data-aos="fade-up">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                slidesPerGroup={1}
                navigation={false}
              >
                {eventsEN.map((item, i) => (
                  <SwiperSlide key={i}>
                    <Card
                      text={item.text}
                      title={item.title}
                      starCount={item.stars}
                    ></Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .swiper {
    background: none;
    padding-left: 30px;
    padding-right: 30px;
    height: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .swiper-slide img {
    width: 24px;
  }

  .swiper-slide {
    height: 100%;
    min-height: 360px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .swiper-button-prev {
    background-image: url(/images/ic-chevron-left.svg) !important;
  }
  .swiper-button-next {
    background-image: url(/images/ic-chevron-right.svg) !important;
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    display: none;
  }

  .swiper-button-prev {
    left: 30px;
  }

  .swiper-button-next {
    right: 30px;
  }

  padding: 10%;
`;

export default Testimonies;
