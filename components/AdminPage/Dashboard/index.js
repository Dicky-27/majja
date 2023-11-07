import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Tag, Select, Modal, Input } from "antd";
import moment from "moment";
import "moment/locale/id";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
moment.locale("id");
const { Option } = Select;
const { Search } = Input;
const { TextArea } = Input;

function Dashboard({ updateRes }) {
  const [today, setToday] = useState(new Date()); // Save the current date to be able to trigger an update
  const [sevendays, setsevendays] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7));
  const [thirtydays, setthirtydays] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30));
  const [oneyear, setoneyear] = useState(new Date(today.getFullYear(), 0, 1));
  const [yesterday, setyesterday] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()-1));
  const [tomorrow, settomorrow] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()+1));
  const [nextyear, setnextyear] = useState(new Date(today.getFullYear()+1, today.getMonth(), today.getDate()));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [range, setrange] = useState("1");
  const [modalOpen, setModalOpen] = useState(false);
  const [nama, setnama] = useState();
  const [idBooking, setidBooking] = useState();
  const [jadwal, setjadwal] = useState();
  const [dokter, setdokter] = useState();
  const [statusbook, setstatusbook] = useState();
  const [telepon, settelepon] = useState();
  const [kategori, setkategori] = useState();
  const [keluhan, setkeluhan] = useState();
  const [dataBooking, setdataBooking] = useState()
  const [dataBookingMaster, setDataBookingMaster] = useState()
  const [jumlahpasien, setjumlahpasien] = useState()
  const [catatan, setCatatan] = useState();
  const [loading, setLoading] = useState(false);
  const [percentBook, setpercentBook] = useState(0);
  const [percentPasien, setpercentPasien] = useState(0);
  const [percentEarning, setpercentEarning] = useState(0);
  const [countBook, setcountBook] = useState(0);
  const [countPasien, setcountPasien] = useState(0);
  const [countEarning, setcountEarning] = useState(0);
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const openModal = (record) => {
    setModalOpen(true)
    setnama(record.name)
    setjadwal(moment(record.tanggal_booking).format('DD MMM') + ', ' + moment(record.jam_booking, 'HH:mm:ss').format('HH:mm'))
    setdokter(record.nama_dokter)
    setstatusbook(record.action_status)
    settelepon(record.phone)
    setkategori(record.kategori)
    setkeluhan(record.keluhan)
    setidBooking(record.id)
    setCatatan(record.catatan)
  }

  const handleStatusChange = (value, id, note) => {
    axios.post(`${url}/api/booking/update_actionstatus`, { id_booking: id, action_status: value, catatan: note }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status == 200) {
          toast.success('Edit Action Status Success!');
          // localStorage.setItem('halamandash', 1)
          // window.location.reload()
          setModalOpen(false)
          fetchData()
          updateRes(1)
        }
        else {
          toast.error('Silahkan Coba Lagi')
        }
      })
  };

  function callData(start, end) {
    axios.post(`${url}/api/booking/range`, { start, end }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        setdataBooking(res.data.result)
      })
  }

  function percentage(time) {
    axios.get(`${url}/api/dashboard/` + time, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        setcountBook(res.data.data.curr_book)
        setcountEarning(res.data.data.curr_book * 50000)
        setcountPasien(res.data.data.curr_pasien)
        
        setpercentBook(res.data.count.book_percent)
        setpercentEarning(res.data.count.earning_percent)
        setpercentPasien(res.data.count.pasien_percent)
      })
  }

  function handleRangeChange(value) {
    setrange(value);
    if (value == "7") {
      // callData(sevendays, today)
      percentage('weekly')
    }
    else if (value == "30") {
      // callData(thirtydays, today)
      percentage('monthly')
    }
    else if (value == "1") {
      // callData(yesterday, tomorrow)
      percentage('daily')
    }
    else {
      // callData(oneyear, today)
      percentage('annualy')
    }
  }

  const columns = [
    {
      title: "Nama Pasien",
      dataIndex: "nama",
      sorter: (a, b) => a.nama.localeCompare(b.nama),
      // render: ((_, record) => ( 
      //   <span style={{cursor:'pointer'}} onClick={() => openModal(record)}>{record.nama}</span>
      // ))
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
      render: ((_, record) => moment(record.tanggal_booking).format('DD MMM YY') + ', ' + record.jam_booking),
    },
    {
      title: "Dokter",
      dataIndex: "nama_dokter",
      sorter: (a, b) => a.nama_dokter.localeCompare(b.nama_dokter),
    },
    {
      title: "Status",
      dataIndex: "action_status",
      sorter: (a, b) => a.action_status - b.action_status,
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
              width: '100%',
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
      width: 300,
    },
  ];

  const fetchData = async () => {
    try {
      callData(yesterday, nextyear)
      percentage('daily')

      axios.get(`${url}/api/patient/list`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => {
          setLoading(false)
          setjumlahpasien(res.data.pasien.length)
        })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    setLoading(true)
    if (!Cookies.get('token')) {
      router.push('/login')
    }
    else {
      fetchData()
    }
  }, [])

  const onSearch = (value) => {
    const filteredData = dataBookingMaster.filter(entry =>
      (entry.nama.toLowerCase().includes(value))
    );
    setdataBooking(filteredData);
  }

  return (
    <>
      <Wrapper className="container-fluid">
        <div className="row">
          <div className="col-10"><StyledTitle>Dashboard</StyledTitle></div>
          <div className="col-2 align-self-center text-end">
            <Select
              style={{ fontFamily: 'Poppins', minWidth:'130px', textAlign:'left'}}
              defaultValue={range}
              onChange={(value) => handleRangeChange(value)}
            >
              <Option key={1} value="7">7 Hari Terakhir</Option>
              <Option key={2} value="30">30 Hari Terakhir</Option>
              <Option key={3} value="365">1 Tahun Terakhir</Option>
              <Option key={4} value="all">Semua Periode</Option>
              <Option key={5} value="1">Hari Ini</Option>
            </Select>
          </div>
        </div>
        {
          !loading ?
            <>
              <div className="row">
                <SmallCard className="col m-2">
                  <StyledCardTitle>Total Booking</StyledCardTitle>
                  {/* <StyledCardContent>{dataBooking && dataBooking.length}</StyledCardContent> */}
                  <StyledCardContent>{countBook}</StyledCardContent>
                  <StyledCardSubTitle>
                    {range == "1" ? "Daily" : range == "7" ? 'Weekly' : range == "30" ? 'Monthly' : range == "365" ? 'Yearly' : "All"} Bookings {
                      percentBook > 0 ? <StyledCardPercentPos>+{percentBook?.toFixed(2)}%</StyledCardPercentPos> : <StyledCardPercentNeg>{percentBook?.toFixed(2)}%</StyledCardPercentNeg>
                    }
                  </StyledCardSubTitle>
                </SmallCard>
                <SmallCard className="col m-2">
                  <StyledCardTitle>Total Pasien</StyledCardTitle>
                  {/* <StyledCardContent>{jumlahpasien} </StyledCardContent> */}
                  <StyledCardContent>{countPasien} </StyledCardContent>
                  <StyledCardSubTitle>
                    {range == "1" ? "Daily" : range == "7" ? 'Weekly' : range == "30" ? 'Monthly' : range == "365" ? 'Yearly' : "All"} Patients {
                      percentPasien > 0 ? <StyledCardPercentPos>+{percentPasien?.toFixed(2)}%</StyledCardPercentPos> : <StyledCardPercentNeg>{percentPasien?.toFixed(2)}%</StyledCardPercentNeg>
                    }
                  </StyledCardSubTitle>
                </SmallCard>
                <SmallCard className="col m-2">
                  <StyledCardTitle>Pemasukan Booking</StyledCardTitle>
                  {/* <StyledCardContent>Rp {dataBooking && (dataBooking.length * 50000).toLocaleString('id')},00</StyledCardContent> */}
                  <StyledCardContent>Rp {(countEarning).toLocaleString('id')},00</StyledCardContent>
                  <StyledCardSubTitle>
                    {range == "1" ? "Daily" : range == "7" ? 'Weekly' : range == "30" ? 'Monthly' : range == "365" ? 'Yearly' : "All"} Earning {
                      percentEarning > 0 ? <StyledCardPercentPos>+{percentEarning?.toFixed(2)}%</StyledCardPercentPos> : <StyledCardPercentNeg>{percentEarning?.toFixed(2)}%</StyledCardPercentNeg>
                    }
                  </StyledCardSubTitle>
                </SmallCard>
                <SmallCard className="col m-2">
                  <StyledCardTitle>Pengunjung Website</StyledCardTitle>
                  <StyledCardContent>Google Analytics</StyledCardContent>
                  {/* <StyledCardSubTitle>
                Weekly Visitors <StyledCardPercent>^ 0%</StyledCardPercent>
              </StyledCardSubTitle> */}
                </SmallCard>
              </div>
              <div className="row">
                <BigCard className="col m-2">
                  <div className="row justify-content-center">
                    <div className="col-lg-9 col-12">
                      <StyledTitle>Jadwal Booking Konsultasi</StyledTitle>
                    </div>
                    <div className="col-lg-3 col-12">
                      <Search
                        className="py-2"
                        placeholder="Cari Pasien"
                        allowClear
                        onSearch={onSearch}
                      />
                    </div>
                  </div>

                  <div>
                    <Table
                      columns={columns}
                      dataSource={dataBooking}
                      onChange={onChange}
                      pagination={false}
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: (event) => {
                            openModal(record)
                          },
                        };
                      }}
                    />
                  </div>
                </BigCard>
              </div>
            </>
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
              <span className="modalSubtitleData">{jadwal}</span>
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
              <div className="col-lg-4 col-12 modalSubtitle">Telepon</div>
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
                {kategori}
              </div>
            </div>
            <div className="row py-2">
              <div className="col-lg-4 col-12 modalSubtitle">Keluhan</div>
              <div className="col-lg-8 col-12 modalSubtitleData">{keluhan}</div>
            </div>
            <div className="row py-2">
              <div className="col-lg-4 col-12 modalSubtitle">Catatan</div>
              <div className="col-lg-8 col-12 modalSubtitleData">
                <TextArea rows={2} placeholder="Tulis Disini" value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                /></div>
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

const SmallCard = styled.div`
  border-radius: 0.625rem;
  background: #fff;
  box-shadow: 0px 0.375rem 1.25rem 0px rgba(192, 192, 192, 0.25);
  padding: 1rem;
  min-width: 15.875rem;
`;

const BigCard = styled.div`
  border-radius: 0.625rem;
  box-shadow: 0px 0.375rem 1.25rem 0px rgba(192, 192, 192, 0.25);
  padding: 1.5rem;
  min-height: 32rem;
  background-color: #ffffff;
`;

const StyledTitle = styled.div`
  color: #433b3b;
  font-size: var(--fs-24);
  font-family: Poppins;
  font-weight: 600;

  margin: 1% 0;
`;

const StyledCardTitle = styled.div`
  color: #8d8d8d;
  font-size: var(--fs-16);
  font-family: Poppins;
  font-weight: 500;
`;

const StyledCardContent = styled.div`
  color: #433b3b;
  font-size: var(--fs-24);
  font-family: Poppins;
  font-weight: 600;
`;

const StyledCardSubTitle = styled.div`
  color: rgba(67, 59, 59, 0.85);
  font-size: var(--fs-12);
  font-family: Poppins;
  font-weight: 500;
`;

const StyledCardPercentPos = styled.span`
  color: #09a53e;
  font-size: var(--fs-12);
  font-family: Poppins;
  font-weight: 500;
`;
const StyledCardPercentNeg = styled.span`
  color: #DF3034;
  font-size: var(--fs-12);
  font-family: Poppins;
  font-weight: 500;
`;
export default Dashboard;
