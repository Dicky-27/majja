import Head from "next/head";
import React from "react";
import Footer from "../../../components/footer";
import Navbar from "../../../components/Navbar";
import FloatingWA from "../../../components/FloatingWA";
import { Card } from "antd";
import styled from "styled-components";
import Lottie from "lottie-react";
import * as animationDataSuccess from "../../../public/images/success.json";
import moment from "moment";

function BookingSuccess() {
  return (
    <>
      <Head>
        <title>Booking Success</title>
      </Head>
      <Navbar></Navbar>
      <Wrapper id="findUs">
        <Config>
          {/* <PC> */}
          <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
              <div className="col-9 py-3 text-center align-self-center">
                <Card
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "1rem",
                    boxShadow: "0px 4px 20px rgba(192, 192, 192, 0.25)",
                  }}
                >
                  <div className="align-self-center pt-4">
                    <h1 className={"successTitle"}>Pembayaran Berhasil</h1>
                    <div className="row justify-content-center">
                      <div className="col-lg-8 col-12">
                        <Lottie
                          animationData={animationDataSuccess}
                          loop={true}
                        />
                      </div>
                    </div>
                    <p className={"successText"}>
                      Anda akan segera menerima pesan konfirmasi melalui
                      Whatsapp
                    </p>
                  </div>
                </Card>
              </div>
              <div className="col-9 py-3">
                <Card
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "1rem",
                    boxShadow: "0px 4px 20px rgba(192, 192, 192, 0.25)",
                  }}
                >
                  <div className="row justify-content-center align-items-center m-4">
                    <div className="col-12 successSectionTitle">
                      Detail Booking
                    </div>
                    <div className="col-xl-3 col-12 py-2 successSectionLeft">
                      Nama Pasien
                    </div>
                    <div className="col-xl-9 col-12 py-2 successSectionRight">
                      {typeof window !== "undefined" &&
                        localStorage.getItem("nama_booking")}
                    </div>
                    <div className="col-xl-3 col-12 py-2 successSectionLeft">
                      Kategori Pasien
                    </div>
                    <div className="col-xl-9 col-12 py-2 successSectionRight">
                      {"Pasien " +
                        (typeof window !== "undefined" &&
                          localStorage.getItem("kategori_booking"))}
                    </div>
                    <div className="col-xl-3 col-12 py-2 successSectionLeft">
                      Nomor Rekam Medis
                    </div>
                    <div className="col-xl-9 col-12 py-2 successSectionRight">
                      {typeof window !== "undefined" &&
                        (localStorage.getItem("rekamMedis_booking") != ""
                          ? localStorage.getItem("rekamMedis_booking")
                          : "")}
                    </div>
                    <div className="col-xl-3 col-12 py-2 successSectionLeft">
                      Jenis Booking
                    </div>
                    <div className="col-xl-9 col-12 py-2 successSectionRight">
                      Sesi Konsultasi
                    </div>
                    <div className="col-xl-3 col-12 py-2 successSectionLeft">
                      Tanggal
                    </div>
                    <div className="col-xl-9 col-12 py-2 successSectionRight">
                      {typeof window !== "undefined" &&
                        moment(localStorage.getItem("tanggal_booking")).format(
                          "dddd, DD MMMM YYYY"
                        )}
                    </div>
                    <div className="col-xl-3 col-12 py-2 successSectionLeft align-self-start">
                      Waktu
                    </div>
                    <div className="col-xl-9 col-12 py-2 successSectionRight">
                      {typeof window !== "undefined" &&
                        localStorage.getItem("jam_booking")}
                      <br></br>
                      <span className="disclaimer">
                        Harap datang tepat waktu. Keterlambatan akan ditoleransi
                        max. 30 menit.
                      </span>
                    </div>
                    <div className="col-12 pt-3 successSectionTitle">
                      Detail Pembayaran
                    </div>
                    <div className="col-xl-3 col-12 py-2 successSectionLeft">
                      Total
                    </div>
                    <div className="col-xl-9 col-12 py-2 successSectionRight">
                      Rp 50.000,-
                    </div>
                    <div className="col-xl-3 col-12 py-2 successSectionLeft">
                      Metode Pembayaran
                    </div>
                    <div className="col-xl-9 col-12 py-2 successSectionRight">
                      Midtrans
                    </div>
                    <div className="col-xl-3 col-12 py-2 successSectionLeft">
                      Tanggal
                    </div>
                    <div className="col-xl-9 col-12 py-2 successSectionRight">
                      {typeof window !== "undefined" &&
                        moment(new Date()).format("DD MMMM YYYY HH:mm")}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          {/* </PC> */}

          <MOBILE></MOBILE>
        </Config>
      </Wrapper>
      <FloatingWA></FloatingWA>
      <Footer></Footer>
    </>
  );
}

const Wrapper = styled.div`
  background: #edf6ff;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  padding-top: 10%;
`;

const Config = styled.div`
  font-family: "Poppins";
  padding: 2% 5% 10% 5%;
  overflow: hidden;

  @media (max-width: 1121px) {
    padding: 5%;
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

export default BookingSuccess;
