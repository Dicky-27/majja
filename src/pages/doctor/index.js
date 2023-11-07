import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Footer from '../../../components/footer'
import Navbar from '../../../components/Navbar';
import { Select, Input, Pagination } from 'antd';
import axios from 'axios';
import FloatingWA from '../../../components/FloatingWA';
import { Icon } from '@iconify/react';
import Link from 'next/link';
// import { dokter } from '../../../components/DokterData';

function Dokter() {
  const { Option } = Select;
  const { Search } = Input;
  const [DataDokter, setDataDokter] = useState()
  const [DataJadwalDokter, setDataJadwalDokter] = useState()
  const [DataDokterMaster, setDataDokterMaster] = useState()
  const [dayselected, setdayselected] = useState()
  const [layanan, setlayanan] = useState()
  const [harihari, setharihari] = useState(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'])
  const url =process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const [loading, setLoading] = useState(false);

  const onSearch = (value) => {
      const filteredData = DataDokterMaster.filter(entry =>
        (entry.nama.toLowerCase().includes(value))
      );
      setDataDokter(filteredData);
  }

  const filterday = (value) => {
    let temp = [];
    DataJadwalDokter.map((item, i) => (
      item.hari == value && temp.indexOf(item.id_dokter) < 0 && temp.push(item.id_dokter)
    ))

    let filteredData = [];
    DataDokterMaster.map((dktr, i) => (
      temp.indexOf(dktr.id_dokter) > -1 && filteredData.push(dktr)
    ))
    
    setDataDokter(filteredData);
  }

  const filterLayanan = (value) => {
    const filteredData = DataDokterMaster.filter(entry =>
      (entry.posisi.includes(value))
    );
    setDataDokter(filteredData);
  }

  const sortNama = (value) =>{
    if(value == "atoz"){
      const filteredData = DataDokterMaster.sort((a,b) => {
       if(b.nama[4].toLowerCase() > a.nama[4].toLowerCase()){
        return -1;
       } 
      })
      setDataDokter(filteredData);
    }
    else{
      const filteredData = DataDokterMaster.sort((a,b) => {
        if(b.nama[4].toLowerCase() < a.nama[4].toLowerCase()){
          return -1;
         } 
      })
      setDataDokter(filteredData);
    }
  };

  const handlePagination = (value) => {
    if(DataDokterMaster.length < value*9){
      setDataDokter([...slice2(DataDokterMaster, (value-1)*9, DataDokterMaster.length)])
    }
    else{
      setDataDokter([...slice2(DataDokterMaster, (value-1)*9, (value*9))])
    }
  };

  function slice2(array, val, offset) {
    var subarray = [];
    for (var i = val; i<offset; i++) {
        subarray.push(array[i]);
    }

    return subarray;
  }

  useEffect(() => {
    setLoading(true)
    axios.get(`${url}/api/doctors/list`,{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      setDataDokter([...slice2(res.data.dokter, 0, 9)])
      // setDataDokter(res.data.dokter)
      setDataDokterMaster(res.data.dokter)
    })

    axios.get(`${url}/api/doctors/schedule/list`,{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      setLoading(false)
      setDataJadwalDokter(res.data.jadwal)
    })
  }, [])

  return (
    <>
    <Head><title>Dokter</title></Head>
    <Navbar></Navbar>
    <section className='dokterWrapper'>
        <div className='container'>
          <h1 className='dokterPageTitle'>Dokter</h1>
          <div className='filter p-2 my-3'>
            <div className="row align-items-center my-1 px-5">
              <div className="col-xl-4 col-md-6 col-12 py-2 px-3">
                  <span className='py-3'><b>Cari berdasarkan nama dokter</b></span>
                  <Search className='py-1' placeholder="Ketik Nama Dokter" allowClear onSearch={onSearch} />
              </div>
              <div className="col-xl-3 col-md-6 col-12 px-3">
                <span className='py-3'><b>Cari layanan</b></span>
                 <Select
                      style={{width: '100%'}}
                      showSearch
                      className='py-1'
                      placeholder="Nama Layanan"
                      optionFilterProp="children"
                      onChange={(e) => filterLayanan(e)}
                      value={layanan}
                      // filterOption={(input) =>
                      //   (option.children).toLowerCase().includes(input.toLowerCase())
                      //   }
                        >
                      <Option value="Spesialis Anestesi Konsultan Intensive Care">Spesialis Anestesi Konsultan Intensive Care</Option>
                      <Option value="Spesialis Obstetri dan Ginekologi">Spesialis Obstetri dan Ginekologi</Option>
                      <Option value="Spesialis Penyakit Dalam">Spesialis Penyakit Dalam</Option>
                      <Option value="Spesialis Anak">Spesialis Anak</Option>
                      <Option value="Dokter Umum">Dokter Umum</Option>
                      <Option value="Spesialis Gizi">Spesialis Gizi</Option>
                      <Option value="Psikolog">Psikolog</Option>
                  </Select>
              </div>
              <div className="col-xl-3 col-md-6 col-12 px-3">
                <span className='py-3'><b>Cari berdasarkan hari</b></span>
                 <Select
                      style={{width: '100%'}}
                      className='py-1'
                      placeholder="Nama hari"
                      onChange={(e) => filterday(e)}
                      // value={dayselected}
                        >
                      <Option value="Senin">Senin</Option>
                      <Option value="Selasa">Selasa</Option>
                      <Option value="Rabu">Rabu</Option>
                      <Option value="Kamis">Kamis</Option>
                      <Option value="Jumat">Jumat</Option>
                      <Option value="Sabtu">Sabtu</Option>
                  </Select>
              </div>
              <div className="col-xl-2 col-md-6 col-12 px-3">
                <span className='py-3'><b>Diurutkan dari</b></span>
                 <Select
                      style={{width: '100%'}}
                      className='py-1'
                      placeholder=""
                      optionFilterProp="children"
                      // defaultValue="atoz"
                      onChange={(e) => sortNama(e)}
                      // value={sekilselected}
                        >
                      <Option value="atoz">A to Z</Option>
                      <Option value="ztoa">Z to A</Option>
                  </Select>
              </div>
            </div>
          </div>
          {
          !loading?
          <div className='row'>
            {
             DataDokter?.map((item, i) => (
                <div className='col-xl-4 col-lg-6 col-12 p-3' key={i}>
                  <div className='cardDokterList container' >
                    <div className='d-flex'>
                      <img
                        src={(item?.gambar != "" ? item?.gambar : '/images/pp.png')}
                        alt={item?.nama}
                        height="140px" width="105px" style={{borderRadius:'5px', objectFit:'cover'}}
                      />
                      <div className='ps-3' style={{height:"140px"}}>
                        <span className='cardDokterTitle'>{item?.nama}</span>
                        <p className='cardDokterText'>{item?.posisi}</p>
                        <div className='d-flex'>
                            <Icon
                                icon="fa6-solid:briefcase-medical"
                                className="me-2"
                                style={{ cursor: "pointer", fontSize: "18px", color: "#8D8D8D" }}
                            />
                            <p className='cardDokterText'>Pengalaman: {item?.xp}</p>
                        </div>
                      </div>
                    </div>
                    <div className='dot my-3'></div>
                    {
                       harihari.map((hari, i) => (
                        <div key={i}>
                         <div className='row py-1'>
                          <div className='col-2 text'>{hari}</div>
                          {
                            DataJadwalDokter?.map((jdwl, i) => (
                              (jdwl?.id_dokter == item?.id_dokter && 
                               ( jdwl.hari == hari &&
                                <div className='col-5'><span className='text2'>{jdwl.jam_mulai+(jdwl.jam_selesai != null ? (' - '+jdwl.jam_selesai):'')}</span></div>
                                // :
                                // <div className='col-10'> <span className='text'>Tidak ada jadwal praktek</span></div>
                                )
                            )))
                          }
                         </div>
                         <div className='line'></div>
                        </div>
                       ))
                    }
                    <Link href={'/booking/'+item?.id_dokter} style={{textDecoration:'none'}}>
                    <div className='button2 mt-5'>Booking Jadwal</div>
                    </Link>
                  </div>
                </div>
              ))
            }
          </div>
          :
          <div className='col-11 py-5'>
            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          }
          <div className='row justify-content-center'>
            <div className='col-12 text-center py-4'>
              <Pagination onChange={(value) => handlePagination(value)} defaultCurrent={1} total={DataDokterMaster?.length}/>
            </div>
          </div>
        </div>
      
    </section>
    
    <FloatingWA></FloatingWA>
    <Footer></Footer>
    </>
  )
}

export default Dokter