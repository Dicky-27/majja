import Head from 'next/head'
import React from 'react'
import Footer from '../../../components/footer'
import Navbar from '../../../components/Navbar';
import axios from 'axios';
import FloatingWA from '../../../components/FloatingWA';
import { Card } from "antd";
import styled from "styled-components";
import Lottie from "lottie-react";
import * as animationData from '../../../public/images/fail.json'
import moment from 'moment';

function BookingSuccess() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    // rendererSettings: {
    //   preserveAspectRatio: "xMidYMid slice"
    // }
  };

  return (
    <>
    <Head><title>Booking Failed</title></Head>
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
                    // height: "32rem",
                    backgroundColor: "white",
                    borderRadius: "1rem",
                    boxShadow: "0px 4px 20px rgba(192, 192, 192, 0.25)"
                  }}
                  
                >
                  <div className='align-self-center pt-4'>
                  <h1 className='failTitle'>Pembayaran Gagal</h1>
                  {/* <img src='/images/failful.gif' width="60%"></img> */}
                  <div className='row justify-content-center'>
                    <div className='col-lg-5 col-12'>
                    <Lottie animationData={animationData} loop={true} />
                    </div>
                  </div>
                  <p className='failText'>Mohon maaf, kami mengalami kendala dalam memproses pembayaran untuk booking jadwal Anda saat ini. Harap mencoba kembali!</p>
                 </div>
                </Card>
              </div>
              <div className="col-9 py-3">
                <Card
                  style={{
                    width: "100%",
                    // height: "32rem",
                    backgroundColor: "white",
                    borderRadius: "1rem",
                    boxShadow: "0px 4px 20px rgba(192, 192, 192, 0.25)"
                  }}
                >
                <div className="row justify-content-center align-items-center m-4">
                  <div className='col-12 successSectionTitle'>
                    Detail Booking
                  </div>
                  <div className="col-xl-3 col-12 py-2 successSectionLeft">
                    Nama Pasien
                  </div>
                  <div className="col-xl-9 col-12 py-2 successSectionRight">
                    {typeof window !== 'undefined' && localStorage.getItem('nama_booking')}
                  </div>
                  <div className="col-xl-3 col-12 py-2 successSectionLeft">
                    Kategori Pasien
                  </div>
                  <div className="col-xl-9 col-12 py-2 successSectionRight">
                    {"Pasien "+(typeof window !== 'undefined' && localStorage.getItem('kategori_booking'))}
                  </div>
                  <div className="col-xl-3 col-12 py-2 successSectionLeft">
                    Nomor Rekam Medis
                  </div>
                  <div className="col-xl-9 col-12 py-2 successSectionRight">
                  {typeof window !== 'undefined' && (localStorage.getItem('rekamMedis_booking') != '' ? localStorage.getItem('rekamMedis_booking') : '')}
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
                  {typeof window !== 'undefined' && moment(localStorage.getItem('tanggal_booking')).format('dddd, DD MMMM YYYY  ')}
                  </div>
                  <div className="col-xl-3 col-12 py-2 successSectionLeft align-self-start">
                    Waktu
                  </div>
                  <div className="col-xl-9 col-12 py-2 successSectionRight">
                  {typeof window !== 'undefined' && localStorage.getItem('jam_booking')}<br></br>
                    <span className='disclaimer'>Harap datang tepat waktu. Keterlambatan akan ditoleransi max. 30 menit.</span>
                  </div>
                  {/* <div className='col-12 pt-3 successSectionTitle'>
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
                  {typeof window !== 'undefined' && localStorage.getItem('jam_booking')}
                  </div> */}
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
  )
}


const Wrapper = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */

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

const StyledSectionTitle = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-32);
  color: #a5090c;

  padding: 0 0 0 5%;
`;

const StyledSelected = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-12);
  color: #df3034;

  display: list-item;
  list-style-type: "•";
  list-style-position: inside;
`;

const StyledAvailable = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-12);
  color: #09a53e;

  display: list-item;
  list-style-type: "•";
  list-style-position: inside;
`;

const StyledNotAvail = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-12);
  color: #8d8d8d;

  display: list-item;
  list-style-type: "•";
  list-style-position: inside;
`;

const StyledTitle = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-18);
  color: #433b3b;

  margin-bottom: 2%;
`;

const StyledText = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  text-align: "center";
  font-size: var(--fs-14);
  color: #8d8d8d;

  margin-bottom: 10%;
`;

const StyledTextWIcon = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  text-align: "center";
  font-size: var(--fs-14);
  color: #8d8d8d;
`;

const RenderJamWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 10px;

  overflow-y: auto;
  width: 100%;
  height: 13.813rem;
`;

const BtnWrapper = styled.div`
  padding: 5% 0 0 0;
`;

const StyledButton = styled.button`
  /* display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center; */
  padding: 0.8rem 4rem;

  background: #ffffff;
  border: 0.2rem solid #e0e0e0;
  border-radius: 1rem;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-14);

  :focus {
    color: #ffffff;
    background: #df3034;
  }
`;

export default BookingSuccess