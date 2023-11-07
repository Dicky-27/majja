import React, { useRef, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";

const ImageSlider = () => {
  return (
    <Wrapper>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={true}
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <img src="/images/offering1.png" alt="slide1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/offering1.png" alt="slide2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/offering1.png" alt="slide3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/offering1.png" alt="slide4" />
        </SwiperSlide>
      </Swiper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  @media (max-width: 1121px) {
    width: 110%;
    margin: 0 0 0 -7%;
  }
`;

export default ImageSlider;
