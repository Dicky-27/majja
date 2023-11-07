import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Tag, Modal, Select } from "antd";
import moment from "moment";
import "moment/locale/id";
import { Input, Pagination } from "antd";
import { Icon } from "@iconify/react";
import NewDoctor from "../NewDoctor";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
moment.locale("id");
const { Search } = Input;

// const handleStatusChange = (value, record) => {
//   console.log(`Status changed to ${value} for record:`, record);
// };

function DoctorList({ updateRes }) {
  const [DataDokter, setDataDokter] = useState()
  const [DataDokterMaster, setDataDokterMaster] = useState()
  const [modalOpen, setModalOpen] = useState(false);
  const [namaDokter, setNamaDokter] = useState();
  const [posisi, setPosisi] = useState();
  const [telepon, setTelepon] = useState();
  const [email, setEmail] = useState();
  const [status_dokter, setstatus_dokter] = useState();
  const [password, setPassword] = useState();
  const [xp, setxp] = useState();
  const [jadwal, setjadwal] = useState();
  const [id, setid] = useState();
  const [showpassword, setshowpassword] = useState(false);
  const [showTambahDokter, setShowTambahDokter] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const url =process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  const onSearch = (value) => {
    const filteredData =  DataDokterMaster.filter(entry =>
      (entry.nama.toLowerCase().includes(value))
    );
    setDataDokter(filteredData);
  }

  function getJadwal(idnya){
    axios.get(`${url}/api/doctors/schedule/`+idnya,{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      setjadwal(res.data.jadwaldokter)
    })
  }

  const openModalDoctor = (record) => {
    setModalOpen(true)
    setNamaDokter(record.nama)
    setPosisi(record.posisi)
    setTelepon(record.phone)
    setEmail(record.email)
    setPassword(record.pass)
    setstatus_dokter(record.status)
    setxp(record.xp)
    setid(record.id_dokter)
    getJadwal(record.id_dokter)
  }

  const fetchData = async () => {
    try {
      axios.get(`${url}/api/doctors/list`,{
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        setLoading(false)
        setDataDokter(res.data.dokter)
        setDataDokterMaster(res.data.dokter)
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    setLoading(true)
    if(!Cookies.get('token')){
      router.push('/login')
    }
    else{
      fetchData();
    }
  }, [])

  function deletedoctor(id){
    axios.post(`${url}/api/doctors/delete`, { id_dokter:id },{
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if(res.status == 200){
          toast.success('Delete Dokter Berhasil!')
          // localStorage.setItem('halamandash', 4)
          // window.location.reload()
          updateRes(4);
          setModalOpen(false);
          fetchData();
        }else{
          toast.error('Gagal menghapus dokter')
        }
      })
  }

  const columns = [
    {
      title: "Nama Dokter",
      dataIndex: "nama",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.nama.localeCompare(b.nama),
      width: 500,
      // render: ((_, record) => ( 
      //   <span style={{cursor:'pointer'}} onClick={() => openModalDoctor(record)}>{record.nama}</span>
      // ))
    },
    {
      title: "Spesialis",
      dataIndex: "posisi",
      filters: [
        {
          text: 'Spesialis Obstetri dan Ginekologi',
          value: 'Spesialis Obstetri dan Ginekologi',
        },
        {
          text: 'Spesialis Anak',
          value: 'Spesialis Anak',
        },
        {
          text: 'Spesialis Penyakit Dalam',
          value: 'Spesialis Penyakit Dalam',
        },
        {
          text: 'Spesialis Anestesi Konsultan Intensive Care',
          value: 'Spesialis Anestesi Konsultan Intensive Care',
        },
        {
          text: 'Spesialis Gizi',
          value: 'Spesialis Gizi',
        },
        {
          text: 'Psikolog',
          value: 'Psikolog',
        },
        {
          text: 'Dokter Umum',
          value: 'Dokter Umum',
        },
      ],
      onFilter: (value, record) => (
        record.posisi.indexOf(value) === 0),
      width: 500,
    },
    {
      title: "Nomor Telepon",
      dataIndex: "phone",
      width: 350,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status - b.status,
      render: ((_, record) => (
        record.status == 1 ?
        <Tag color="green">
          Praktek Rutin
        </Tag>
        :
        <Tag>
          Dengan Janji
        </Tag>
    )),
      // render: (text, record) => {
      //   const statusLabels = {
      //     1: "Prakter Rutin",
      //     2: "Dengan Janji",
      //   };
  
      //   return (
      //     <Select
      //       defaultValue={text.toString()}
      //       onChange={(value) => handleStatusChange(value, record)}
      //       status={text == 1 ? "success" : ""}
      //     >
      //       {Object.entries(statusLabels).map(([value, label]) => (
      //         <Option key={value} value={value}>
      //           {label}
      //         </Option>
      //       ))}
      //     </Select>
      //   );
      // },
    },
  ];

  return (
    <>
    {
      showTambahDokter ?
      <NewDoctor updateBatal={setShowTambahDokter} updateSimpan={setShowTambahDokter} callData={fetchData}></NewDoctor>
      :
      <Wrapper className="container-fluid">
      <div className="row">
        <div className="col-6"><StyledTitle>Daftar Dokter</StyledTitle></div>
        <div className="col-6 text-end align-self-center">
          <button className='buttonAlt' onClick={()=>setShowTambahDokter(true)}>+ Tambah Dokter Baru</button>
        </div>
      </div>
      <div className="row">
        <BigCard className="col m-2">
          {/* <StyledTitle>Jadwal Booking Konsultasi</StyledTitle> */}
          <div className="col-lg-3 col-12 ">
          <Search
          className="py-2"
          placeholder="Cari Dokter"
          allowClear
          onSearch={onSearch}
        />
        </div>
          <div>
          {
            !loading ?
            <Table
              columns={columns}
              dataSource={DataDokter}
              onChange={onChange}
              pagination={false}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    openModalDoctor(record)
                  },
                };
              }}
            />
            :
            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </div>
          }
          </div>
        </BigCard>
      </div>
    </Wrapper>
    }
    <Modal
        centered
        open={modalOpen}
        footer={null}
        width={650}
        // onOk={() => setModalOpen(false)}
        onCancel={() => (setModalOpen(false), setshowpassword(false))}
      >
        <div className="p-3">
          <h5 className="pb-3 modalDoctorTitle">{namaDokter}</h5>

          <div className="row justify-content-center">
            <div className="col-6">
              <span className="modalSubtitle">Spesialis</span><br></br>
              <span className="modalSubtitleData">{posisi}</span>
            </div>
            <div className="col-3">
              <span className="modalSubtitle">Telepon</span><br></br>
              <span className="modalSubtitleData">
                {telepon}
                <Icon
                  icon="solar:copy-bold"
                  className="ms-1 align-self-center"
                  onClick={() => (navigator.clipboard.writeText(telepon), toast.success('Copied to Clipboard!'))}
                  style={{
                    cursor: "pointer",
                    fontSize: "16px",
                    color: "#8D8D8D",
                  }}
                />
              </span>
            </div>
            <div className="col-3">
              <span className="modalSubtitle">Status</span>
              {status_dokter == 1 ?
              <Tag color="green">
                Praktek Rutin
              </Tag>
              :
              <Tag>
                Dengan Janji
              </Tag>}
            </div>
          </div>
          <div className="p-3 my-4" style={{border:'1px solid #ccc', borderRadius:'10px'}}>
            <div className="row py-2">
              <div className="col-lg-4 col-12 modalSubtitle">Email</div>
              <div className="col-lg-8 col-12 modalSubtitleData">{email}</div>
            </div>
            <div className="row py-2">
              <div className="col-lg-4 col-12 modalSubtitle">Password</div>
              <div className="col-lg-8 col-12 modalSubtitleData">
                {showpassword ? password : '*********'} 
                <Icon
                  icon={!showpassword ? "mdi:eye" : "mdi:eye-off"}
                  className="ms-2 align-self-center"
                  onClick={() => setshowpassword(!showpassword)}
                  style={{
                    cursor: "pointer",
                    fontSize: "16px",
                    color: "#8D8D8D",
                  }}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-lg-4 col-12 modalSubtitle">Pengalaman</div>
              <div className="col-lg-8 col-12 modalSubtitleData">{xp}</div>
            </div>
            <div className="row py-2">
              <div className="col-lg-4 col-12 modalSubtitle">Jadwal Praktek</div>
              <div className="col-lg-8 col-12 modalSubtitleData">
                {
                jadwal?.map((item, i) => (
                    <div className="py-1" key={i}>
                      <span>{item.hari}</span>
                      <span className="ms-2">{item.jam_mulai+(item.jam_selesai != null ? (' - '+item.jam_selesai):'')}</span>
                      <br></br>
                    </div>
                ))
                }
               </div>
            </div>
          </div>
          <div className="text-center">
            <button className='buttonAlt' onClick={() => deletedoctor(id)}>Hapus Dari Daftar</button>
          </div>
        </div>
    </Modal>
      </>
  );
}

const Wrapper = styled.div``;

const StyledTitle = styled.div`
  color: #433b3b;
  font-size: var(--fs-24);
  font-family: Poppins;
  font-weight: 600;

  margin: 1% 0;
`;

const BigCard = styled.div`
  border-radius: 0.625rem;
  box-shadow: 0px 0.375rem 1.25rem 0px rgba(192, 192, 192, 0.25);
  padding: 1.5rem;
  min-height: 32rem;
  background-color: #ffffff;
`;

export default DoctorList;
