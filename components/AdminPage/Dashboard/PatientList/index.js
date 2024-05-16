import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Tag } from "antd";
import moment from "moment";
import "moment/locale/id";
import { Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
moment.locale("id");
const { Search } = Input;

function PatientList({ updateRes }) {
  const [DataPatient, setDataPatient] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSearchExecute = () => {
    setCurrentPage(1);
    fetchPatients();
  };

  const fetchPatients = () => {
    setLoading(true);
    axios
      .get(`/api/patient/list`, {
        params: {
          search: searchTerm,
          page: currentPage,
          limit: pageSize,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        setDataPatient(res.data.pasien);
        setTotalRecords(res.data.total || 0);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Failed to fetch patients:", error);
        toast.error("Failed to load data");
      });
  };

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      handleSearchExecute();
    }, 1000); // Wait for 1 second of inactivity

    setDebounceTimer(timer);

    // Cleanup function to clear timer on component unmount
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!Cookies.get("token")) {
      router.push("/login");
    } else {
      fetchPatients(currentPage, pageSize);
    }
  }, [currentPage, pageSize]);

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
      dataIndex: "telp",
      width: 350,
    },
    {
      title: "No Rekam Medis",
      dataIndex: "no_rekam_medis",
      width: 350,
    },
    {
      title: "Status",
      dataIndex: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (_, record) =>
        record.category == "baru" ? (
          <Tag color="geekblue">Pasien Baru</Tag>
        ) : record.category == "lama" ? (
          <Tag color="magenta">Pasien Lama</Tag>
        ) : (
          <Tag color="red">Unknown</Tag>
        ),
    },
  ];

  return (
    <Wrapper className="container-fluid">
      <div className="row">
        <div className="col-6">
          <StyledTitle>Daftar Pasien</StyledTitle>
        </div>
      </div>
      <div className="row">
        <BigCard className="col m-2">
          {/* <StyledTitle>Jadwal Booking Konsultasi</StyledTitle> */}
          <div className="col-lg-3 col-12 ">
            <Search
              className="py-2"
              placeholder="Cari Pasien"
              allowClear
              onChange={(e) => handleSearchChange(e.target.value)}
              onSearch={handleSearchExecute}
            />
          </div>
          <div>
            {!loading ? (
              <Table
                columns={columns}
                dataSource={DataPatient}
                loading={loading}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: totalRecords,
                  onChange: (page, pageSize) => {
                    setCurrentPage(page);
                    setPageSize(pageSize);
                  },
                  showSizeChanger: true, // Allows changing the number of items per page
                  pageSizeOptions: ["10", "20", "50", "100"], // You can specify the options here
                }}
              />
            ) : (
              <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
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
