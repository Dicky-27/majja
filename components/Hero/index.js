import React from "react";
import Button from "../Button";

function Hero() {
  return (
    <section className="hero-wrapper" id="hero">
      <div className="container-fluid">
        <div className="row justify-content-between">
          <div
            className="col-lg-7 col-md-6 col-12 align-self-center hero-left"
            id="about"
            style={{ paddingRight: "15%" }}
          >
            <h3 className="hero-title">
              Mulai Perjalanan Keluarga yang Sehat Sejak Dalam Kandungan Hingga
              Masa Tua
            </h3>
            <p className="hero-text my-4">
              Percayakan kehamilanmu hingga kelahiran buah hati kepada ahlinya
              sekarang juga!
            </p>
            <div className="hero-btn-wrapper">
              <Button link="/doctor" text="Booking Jadwal"></Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
