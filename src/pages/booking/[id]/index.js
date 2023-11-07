import Head from "next/head";
import React, { useEffect, useState } from "react";
import Footer from "../../../../components/footer";
import Navbar from "../../../../components/Navbar";
import FloatingWA from "../../../../components/FloatingWA";
import BookingJadwalContent from "../../../../components/BookingJadwalContent";
import axios from "axios";

function Booking({id}) {
  const [jadwal, setjadwal] = useState()
  const [dokter, setdokter] = useState()
  const [hariOn, sethariOn] = useState()
  const [hariOff, sethariOff] = useState()
  var days = ['Minggu','Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  let hariOnSet = new Set();
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    axios.get(`${url}/api/doctors/`+id,{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      setdokter(res.data.dokter)
    })

    axios.get(`${url}/api/doctors/schedule/`+id,{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      setjadwal(res.data.jadwaldokter)
      res.data.jadwaldokter && res.data.jadwaldokter.map((item, i) => (
        hariOnSet.add(item.hari)
      ))
      sethariOn(Array.from(hariOnSet));
      let temp = Array.from(hariOnSet);

      temp.map((item) => (
        days = days.filter(day => (
          day != item && day
        ))
      ))
      sethariOff(days);
    })
  }, [])
  
  return (
    <>
      <Head>
        <title>Booking Jadwal</title>
      </Head>
      <Navbar></Navbar>
      <BookingJadwalContent data={dokter} hariOn={hariOn} hariOff={hariOff} jadwal={jadwal} id={id} />
      <FloatingWA></FloatingWA>
      <Footer></Footer>
    </>
  );
}

export default Booking;

export async function getServerSideProps({ req, params }) {
  const { id } = params;

  return {
    props: {
      id: id,
    },
  };
}
