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
      {/*TODO: unhide after assets is ready*/}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        // navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
        loop={true}
        autoplay={true}
      >
        {/* <button className="arrow-left arrow">
          <img src="/images/ic-chevron-left.svg" />
        </button>
        <button className="arrow-right arrow">
          <img src="/images/ic-chevron-right.svg" />
        </button> */}

        <SwiperSlide>
          <div class="py-4">
            <img src="/images/img-banner-1.webp" alt="slide1" class="rounded" />
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>
          <img src="/images/offering1.png" alt="slide2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/offering1.png" alt="slide3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/offering1.png" alt="slide4" />
        </SwiperSlide> */}
      </Swiper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 5%;

  .swiper {
    width: 100%;
    height: auto;

    .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      background: none;
      border: none;
    }

    .arrow-left {
      left: 3.5vw;
    }

    .arrow-right {
      right: 3.5vw;
    }
  }

  @media (max-width: 1121px) {
    width: 110%;
    margin: 0 0 0 -7%;
  }
`;

export default ImageSlider;
