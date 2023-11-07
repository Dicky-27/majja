import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Tag, Modal, Select } from "antd";
import moment from "moment";
import "moment/locale/id";
import { Input, Pagination } from "antd";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
moment.locale("id");
const { Search } = Input;

function PatientList({ updateRes }) {
  const [DataPatient, setDataPatient] = useState()
  const [DataPatientMaster, setDataPatientMaster] = useState();
  const [loading, setLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const router = useRouter();
  const onSearch = (value) => {
    const filteredData = DataPatientMaster.filter(entry =>
      (entry.nama.toLowerCase().includes(value))
    );
    setDataPatient(filteredData);
  }

  useEffect(() => {
    setLoading(true)
    if (!Cookies.get('token')) {
      router.push('/login')
    }
    else {
      axios.get(`${url}/api/patient/list`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          setLoading(false)
          setDataPatient(res.data.pasien)
          setDataPatientMaster(res.data.pasien)
        })
    }
  }, [])

  const columns = [
    {
      title: "Nama",
      dataIndex: "nama",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.nama.localeCompare(b.nama),
      width: 500,
    },
    {
      title: "Nomor Telepon",
      dataIndex: "phone",
      width: 350,
    },
    {
      title: "No Rekam Medis",
      dataIndex: "no_rekam_medis",
      width: 350,
    },
    {
      title: "Status",
      dataIndex: "kategori",
      sorter: (a, b) => a.kategori.localeCompare(b.kategori),
      render: ((_, record) => (
        record.kategori == "baru" ?
          <Tag color="geekblue">
            Pasien Baru
          </Tag>
          :
          record.kategori == "lama" ?
            <Tag color="magenta">
              Pasien Lama
            </Tag>
            :
            <Tag color="red">
              Unknown
            </Tag>
      )),
    },
  ];

  return (
    <Wrapper className="container-fluid">
      <div className="row">
        <div className="col-6"><StyledTitle>Daftar Pasien</StyledTitle></div>
      </div>
      <div className="row">
        <BigCard className="col m-2">
          {/* <StyledTitle>Jadwal Booking Konsultasi</StyledTitle> */}
          <div className="col-lg-3 col-12 ">
            <Search
              className="py-2"
              placeholder="Cari Pasien"
              allowClear
              onSearch={onSearch}
            />
          </div>
          <div>
            {
              !loading ?
                <Table
                  columns={columns}
                  dataSource={DataPatient}
                  pagination={false}
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

export default PatientList;
