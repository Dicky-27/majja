import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Tag, Modal, Select, Input, Pagination } from "antd";
import moment from "moment";
import "moment/locale/id";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
moment.locale("id");
const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;
const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function BookingSchedule({ updateRes, isAdmin, email }) {
  const [DataBookingSchedule, setDataBookingSchedule] = useState();
  const [DataBookingScheduleMaster, setDataBookingScheduleMaster] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [nama, setnama] = useState();
  const [jadwal, setjadwal] = useState();
  const [dokter, setdokter] = useState();
  const [statusbook, setstatusbook] = useState();
  const [telepon, settelepon] = useState();
  const [kategori, setkategori] = useState();
  const [keluhan, setkeluhan] = useState();
  const [catatan, setCatatan] = useState();
  const [idBooking, setidBooking] = useState();
  const router = useRouter();

  const fetchDataAdmin = async () => {
    try {
      axios.get(`${url}/api/booking`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setDataBookingSchedule(res.data.result);
          setDataBookingScheduleMaster(res.data.result);
        })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchDataNonAdmin = async () => {
    try {
      axios.post(`${url}/api/booking/bookingonemail`, { email: JSON.parse(email) }, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setDataBookingSchedule(res.data.result);
          setDataBookingScheduleMaster(res.data.result);
        })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (!Cookies.get('token')) {
      router.push('/login')
    }
    else {
      isAdmin ?
        fetchDataAdmin()
        :
        fetchDataNonAdmin()
    }
  }, []);

  const handleStatusChange = (value, id, note) => {
    axios.post(`${url}/api/booking/update_actionstatus`, { id_booking: id, action_status: value, catatan: note }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status == 200) {
          toast.success('Edit Action Status Success!');
          // localStorage.setItem('halamandash', 2)
          // window.location.reload()
          setModalOpen(false)
          isAdmin ? fetchDataAdmin() : fetchDataNonAdmin;
          updateRes(2)
        }
        else {
          toast.error('Silahkan Coba Lagi')
        }
      })
  };

  const columns = [
    {
      title: "Nama Pasien",
      dataIndex: "nama",
      sorter: (a, b) => a.nama.localeCompare(b.nama),
      width: 200,
      // render: (_, record) => (
      //   <span
      //     style={{ cursor: "pointer" }}
      //     onClick={() => openBookingSchedule(record)}
      //   >
      //     {record.nama}
      //   </span>
      // ),
    },
    {
      title: "Jadwal Konsultasi",
      dataIndex: "tanggal_booking",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        const dateTimeA = moment(a.tanggal_booking + ' ' + a.jam_booking, 'YYYY-MM-DD HH:mm:ss').toDate();
        const dateTimeB = moment(b.tanggal_booking + ' ' + b.jam_booking, 'YYYY-MM-DD HH:mm:ss').toDate();
        if (dateTimeA.getDate() === dateTimeB.getDate()) {
          // If the dates are equal, sort by "jam_booking" in descending order
          return moment(b.jam_booking, 'HH:mm').diff(moment(a.jam_booking, 'HH:mm'));
        }
        // Sort by "tanggal_booking" in ascending order
        return dateTimeA - dateTimeB;
      },
      render: (_, record) =>
        moment(record.tanggal_booking).format("DD MMM YY") + ", " + record.jam_booking,
      width: 200,
    },
    {
      title: "Dokter",
      dataIndex: "nama_dokter",
      width: 400,
    },
     {
      title: "Status",
      dataIndex: "action_status",
      sorter: (a, b) => a.action_status - b.action_status,
      filters: [
        {
          text: 'New Bookings',
          value: 1,
        },

        {
          text: "Reminded",
          value: 2,
        },
        {
          text: 'Completed',
          value: 3,
        },
        {
          text: 'Not Shown',
          value: 4,
        }
      ],
      onFilter: (value, record) => (
        record.action_status == value
        ),
      render: (text, record) => {
        const statusLabels = {
          1: "New Bookings",
          2: "Reminded",
          3: "Completed",
          4: "Not Shown",
        };

        return (
          <Select
            value={record.action_status && record.action_status.toString()}
            onChange={(value) => handleStatusChange(value, record.id, record.catatan)}
            style={{
              color: record.action_status &&
                (record.action_status ==
                  1 ? "#1D5D9B" : record.action_status ==
                    2 ? "#F4D160" : record.action_status ==
                      3 ? "#54B435" : record.action_status ==
                        4 ? "#666" :
                  "")
            }}
            onClick={(e) => e.stopPropagation()} // stop onRow click on table
          >
            {
              Object.entries(statusLabels).map(([value, label]) => (
                <Option
                  key={value}
                  value={value}
                  style={{
                    color:
                      value == 1 ? "#1D5D9B" : // biru
                        value == 2 ? "#F4D160" : // kuning
                          value == 3 ? "#54B435" : // hijau
                            value == 4 ? "#666" :    // abu
                              ''
                  }}>
                  {label}
                </Option>
              ))}
          </Select>
        );

        // return statusLabels[record.action_status]
      },
    },
    {
      title: "Catatan",
      dataIndex: "catatan",
      width: 400,
    },
  ];

  const columnsDoctor = [
    {
      title: "Nama Pasien",
      dataIndex: "nama",
      sorter: (a, b) => a.nama.localeCompare(b.nama),
      width: 200,
      // render: (_, record) => (
      //   <span
      //     style={{ cursor: "pointer" }}
      //     onClick={() => openBookingSchedule(record)}
      //   >
      //     {record.nama}
      //   </span>
      // ),
    },
    {
      title: "Jadwal Konsultasi",
      dataIndex: "tanggal_booking",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        const dateTimeA = moment(a.tanggal_booking + ' ' + a.jam_booking, 'YYYY-MM-DD HH:mm:ss').toDate();
        const dateTimeB = moment(b.tanggal_booking + ' ' + b.jam_booking, 'YYYY-MM-DD HH:mm:ss').toDate();
        if (dateTimeA.getDate() === dateTimeB.getDate()) {
          // If the dates are equal, sort by "jam_booking" in descending order
          return moment(b.jam_booking, 'HH:mm').diff(moment(a.jam_booking, 'HH:mm'));
        }
        // Sort by "tanggal_booking" in ascending order
        return dateTimeA - dateTimeB;
      },
      render: (_, record) =>
        moment(record.tanggal_booking).format("DD MMM YY") + ", " + record.jam_booking,
      width: 200,
    },
     {
      title: "Status",
      dataIndex: "action_status",
      sorter: (a, b) => a.action_status - b.action_status,
      filters: [
        {
          text: 'New Bookings',
          value: 1,
        },

        {
          text: "Reminded",
          value: 2,
        },
        {
          text: 'Completed',
          value: 3,
        },
        {
          text: 'Not Shown',
          value: 4,
        }
      ],
      onFilter: (value, record) => (
        record.action_status == value
        ),
      render: (text, record) => {
        const statusLabels = {
          1: "New Bookings",
          2: "Reminded",
          3: "Completed",
          4: "Not Shown",
        };

        return (
          <Select
            value={record.action_status && record.action_status.toString()}
            onChange={(value) => handleStatusChange(value, record.id, record.catatan)}
            style={{
              color: record.action_status &&
                (record.action_status ==
                  1 ? "#1D5D9B" : record.action_status ==
                    2 ? "#F4D160" : record.action_status ==
                      3 ? "#54B435" : record.action_status ==
                        4 ? "#666" :
                  "")
            }}
            onClick={(e) => e.stopPropagation()} // stop onRow click on table
          >
            {
              Object.entries(statusLabels).map(([value, label]) => (
                <Option
                  key={value}
                  value={value}
                  style={{
                    color:
                      value == 1 ? "#1D5D9B" : // biru
                        value == 2 ? "#F4D160" : // kuning
                          value == 3 ? "#54B435" : // hijau
                            value == 4 ? "#666" :    // abu
                              ''
                  }}>
                  {label}
                </Option>
              ))}
          </Select>
        );

        // return statusLabels[record.action_status]
      },
    },
    {
      title: "Catatan",
      dataIndex: "catatan",
      width: 400,
    },
  ];

  const openBookingSchedule = (record) => {
    setModalOpen(true)
    setnama(record.nama)
    setjadwal(moment(record.tanggal_booking).format('DD MMM YY') + ', ' + record.jam_booking)
    setdokter(record.nama_dokter)
    setstatusbook(record.action_status)
    settelepon(record.phone)
    setkategori(record.kategori)
    setkeluhan(record.keluhan)
    setidBooking(record.id)
    setCatatan(record.catatan)

  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onSearch = (value) => {
    const filteredData = DataBookingScheduleMaster.filter((entry) =>
      entry.nama.toLowerCase().includes(value)
    );
    setDataBookingSchedule(filteredData);
  };

  return (
    <>
      <Wrapper className="container-fluid">
        <div className="row">
          <StyledTitle>Jadwal Temu</StyledTitle>
        </div>
        <div className="row">
          <BigCard className="col m-2">
            {/* <StyledTitle>Jadwal Booking Konsultasi</StyledTitle> */}
            <div className="col-lg-3 col-12 ">
              <Search
                className="py-2"
                placeholder="Search"
                allowClear
                onSearch={onSearch}
              />
            </div>
            <div>
              <Table
                columns={isAdmin ? columns : columnsDoctor}
                dataSource={DataBookingSchedule}
                onChange={onChange}
                pagination={false}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      openBookingSchedule(record)
                    },
                  };
                }}
              />
            </div>
          </BigCard>
        </div>
      </Wrapper>
      <Modal
        centered
        open={modalOpen}
        footer={null}
        width={650}
        // onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <div className="p-3">
          <h5 className="pb-3 modalDoctorTitle">{nama}</h5>

          <div className="row justify-content-center">
            <div className="col-4">
              <span className="modalSubtitle">Jadwal Konsultasi</span><br></br>
              <span className="modalSubtitleData">{moment(jadwal).format('DD MMM, HH:mm')}</span>
            </div>
            <div className="col-5">
              <span className="modalSubtitle">Dokter</span><br></br>
              <span className="modalSubtitleData">
                {dokter}
              </span>
            </div>
            <div className="col-3">
              <span className="modalSubtitle">Status</span><br></br>
              {
                statusbook == 1 ?
                  <Tag color="geekblue">
                    New Bookings
                  </Tag>
                  :
                  statusbook == 2 ?
                    <Tag color="yellow">
                      Reminded
                    </Tag>
                    :
                    statusbook == 3 ?
                      <Tag color="green">
                        Completed
                      </Tag>
                      :
                      <Tag>
                        Not Shown
                      </Tag>
              }
            </div>
          </div>
          <div className="p-3 my-4" style={{ border: '1px solid #ccc', borderRadius: '10px' }}>
            <div className="row py-2">
              <div className="col-lg-4 col-12 modalSubtitle">Nomor Telepon</div>
              <div className="col-lg-8 col-12 modalSubtitleData">{telepon}
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
              </div>
            </div>
            <div className="row py-2">
              <div className="col-lg-4 col-12 modalSubtitle">Kategori Pasien</div>
              <div className="col-lg-8 col-12 modalSubtitleData">
                {kategori == "baru" ? 'Pasien Baru' : "Pasien Lama"}
              </div>
            </div>
            <div className="row py-2">
              <div className="col-lg-4 col-12 modalSubtitle">Keluhan</div>
              <div className="col-lg-8 col-12 modalSubtitleData">{keluhan}</div>
            </div>
            <div className="row py-2">
              <div className="col-lg-4 col-12 modalSubtitle">Catatan</div>
              <div className="col-lg-8 col-12 modalSubtitleData">
                {
                  isAdmin ?
                    <TextArea rows={2} placeholder="Tulis Disini" value={catatan}
                      onChange={(e) => setCatatan(e.target.value)}
                    />
                    :
                    catatan
                }
              </div>
            </div>
          </div>
          <div className="text-end">
            {
              statusbook == 1 ?
                <button className='buttonModalReminded' onClick={() => handleStatusChange(2, idBooking, catatan)}>Reminded</button>
                :
                statusbook == 2 ?
                  <div className="text-end">
                    <button className='buttonModalNot mx-1' onClick={() => handleStatusChange(4, idBooking, catatan)}>Not Shown</button>
                    <button className='buttonModalComplete mx-1' onClick={() => handleStatusChange(3, idBooking, catatan)}>Completed</button>
                  </div>
                  :
                  ''
            }
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

export default BookingSchedule;
