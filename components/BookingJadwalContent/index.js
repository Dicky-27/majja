import React, { useState } from "react";
import styled from "styled-components";
import DetailBooking from "./DetailBooking";
import { Card, Input, Select } from "antd";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import { Calendar, utils } from "@amir04lm26/react-modern-calendar-date-picker";
import { Icon } from "@iconify/react";
import moment from "moment";
require("moment/locale/id");
import { useRouter } from "next/router";
import {
  convertDaysToNumbers,
  getArrayEveryNDayDates,
  getArrayEveryNDayDatesFromToday,
  transformDatesToFormatDaysOff,
  transformDatesToFormatDaysOn,
} from "../../lib/getEveryDate";
import axios from "axios";
import { toast } from "react-toastify";

function BookingJadwalContent({ data, id, jadwal, hariOff, hariOn }) {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(utils().getToday());
  let d = new Date(
    selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day
  );
  let date = moment(
    `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`,
    "YYYY-MM-DD"
  );
  date.locale("id");
  let dayName = date.format("dddd");
  const [bookingan, setbookingan] = useState([]);
  const [valuejam, setValuejam] = useState();
  const [nama, setnama] = useState();
  const [phone, setphone] = useState();
  const [rekamMedis, setrekamMedis] = useState("");
  const [showCalendar, setshowCalendar] = useState(true);
  const [kategoriPasien, setKategoriPasien] = useState();
  const [keluhan, setkeluhan] = useState();
  const [errornama, seterrornama] = useState(false);
  const [errorphone, seterrorphone] = useState(false);
  const [errorTime, setErrorTime] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChecked, setCheck] = useState(false);

  const { Option } = Select;
  const { TextArea } = Input;

  const checkBooking = (time) => {
    axios
      .post(
        `/api/booking/checkbooking`,
        {
          today: moment(
            selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day,
            "YYYY-MM-DD"
          ).toISOString(),
          id_dokter: id,
          time: moment.utc(time, "THH Z").format("HH:mm:ss"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const result = response.data.result;
        if (result.length !== 0) {
          setErrorTime(true);
          setValuejam(null);
        } else {
          setErrorTime(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  };

  // Minggu jadi Days off
  const AllHariMingguOffInThisYear = getArrayEveryNDayDates(["0"]);
  const disabledMingguDaysDynamic = transformDatesToFormatDaysOff(
    AllHariMingguOffInThisYear
  );

  // Jadwal Days off
  const convertHariOff = convertDaysToNumbers(
    hariOff && hariOff.map((hari) => hari)
  );
  const AllHariOffInThisYear = getArrayEveryNDayDates(convertHariOff);
  const disabledDaysDynamic =
    transformDatesToFormatDaysOff(AllHariOffInThisYear);

  // Jadwal Days on
  const JadwalHariOn =
    data && data.jadwal && data.jadwal.filter((jadwal) => jadwal.jam);
  const convertHariOn = convertDaysToNumbers(
    hariOn && hariOn.map((hari) => hari)
  );
  const AllHariOnInThisYear = getArrayEveryNDayDatesFromToday(convertHariOn);

  // Jadwal Days on Jam on
  const availableDaysDynamic =
    transformDatesToFormatDaysOn(AllHariOnInThisYear);

  // Memfilter waktu yang telah dipesan dari pilihan waktu yang akan ditampilkan
  const filteredTimes = (bookedTimes, allTimes) => {
    let arrJam;
    if (bookedTimes.length > 0) {
      let setJam = new Set();
      allTimes.map((all) =>
        bookedTimes.map((booked) =>
          moment(d).format("YYYY-MM-DD") ==
          moment(booked.tanggal_booking).format("YYYY-MM-DD")
            ? all != booked.jam_booking && setJam.add(all)
            : setJam.add(all)
        )
      );
      arrJam = Array.from(setJam);
    } else {
      arrJam = allTimes;
    }
    return arrJam;
  };

  const dgnPerjanjian = Array.from(
    { length: 12 },
    (_, i) => Number(i + 8) + ".00"
  );

  const handleSelectedTime = (e) => {
    setValuejam(e);
    checkBooking(e);
  };

  const isFutureTime = (time) => {
    const selectedDateTime = moment(
      `${selectedDay.year}-${selectedDay.month}-${selectedDay.day} ${time}`,
      "YYYY-M-D HH:mm"
    );
    return selectedDateTime.isAfter(moment());
  };

  const searchUser = (phoneNumber) => {
    axios
      .get(`/api/patient/search-by-phone/${phoneNumber}`)
      .then((response) => {
        const result = response.data.pasien;

        if (response.status == 200) {
          if (result.length !== 0) {
            setKategoriPasien("lama");
            setnama(result[0].nama);
            setrekamMedis(result[0].no_rekam_medis);
          } else {
            setKategoriPasien("baru");
            setrekamMedis("");
          }
          setCheck(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  function bayar() {
    setLoading(true);
    seterrornama(false);
    seterrorphone(false);
    if (!nama || !phone) {
      if (!nama) {
        setLoading(false);
        seterrornama(true);
      }
      if (!phone) {
        setLoading(false);
        seterrorphone(true);
      }
    } else {
      const jam = valuejam.split(".");
      axios
        .post(
          `/api/booking/add`,
          {
            nama,
            phone: phone.toString(),
            kategori: kategoriPasien,
            no_rekam_medis: rekamMedis,
            keluhan,
            tanggal_booking: moment(
              selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day
            ).format("YYYY-MM-DD"),
            jam_booking: moment.utc(jam, "THH Z").format("HH:mm:ss"),
            id_dokter: router.query.id,
            action_status: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            if (kategoriPasien == "baru") {
              axios
                .post(
                  `/api/patient/add`,
                  { nama, telp: phone.toString() },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((res) => {
                  if (res.status != 200) {
                    toast.error(res.data.msg);
                  }
                });
            }
            axios
              .post(
                `https://dev-payment.klinikmajja.com/gateway1/snap/checkout`,
                {
                  booking_id: res.data.result.insertId,
                  amount: 50000,
                  full_name: nama,
                  phone: phone.toString(),
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((res) => {
                if (res.status == 200) {
                  if (typeof window !== "undefined") {
                    localStorage.setItem("nama_booking", nama);
                    localStorage.setItem("phone_booking", phone.toString());
                    localStorage.setItem("kategori_booking", kategoriPasien);
                    localStorage.setItem("rekamMedis_booking", rekamMedis);
                    localStorage.setItem("keluhan_booking", keluhan);
                    localStorage.setItem(
                      "tanggal_booking",
                      moment(
                        selectedDay.year +
                          "-" +
                          selectedDay.month +
                          "-" +
                          selectedDay.day
                      ).format("dddd, YYYY-MM-DD")
                    );
                    localStorage.setItem(
                      "jam_booking",
                      moment.utc(jam, "THH Z").format("HH:mm:ss")
                    );
                    localStorage.setItem("idDokter_booking", router.query.id);
                  }
                  var url = res.data.url;
                  window.location.replace(url);
                }
              });
          } else {
            toast.error("cek kembali data Anda!");
          }
        })
        .catch(function (error) {
          setLoading(true);
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if (error.response.status == 404) {
              toast.error(error);
              setLoading(false);
            }
          } else if (error.request) {
            console.log(error.request);
            setLoading(false);
          } else {
            console.log("Error", error.message);
            setLoading(false);
          }
        });
    }
  }

  function pecahjam(jam, bookingan) {
    var temp = [];
    var jamstring;
    if (jam) {
      jam.split(".");
      var awal = jam[0] + jam[1];
      var awalconverted = Number(awal);
      var akhir = jam[6] + jam[7];
      var akhirconverted = Number(akhir);
      for (var i = awalconverted; i < akhirconverted; i++) {
        if (i >= 10 && i <= 99) {
          jamstring = i + ".00";
        } else {
          jamstring = "0" + i + ".00";
        }
        temp.push(jamstring);
      }
    }
    return temp;
  }

  return (
    <Wrapper id="findUs">
      <StyledSectionTitle>Booking Jadwal</StyledSectionTitle>
      <Config>
        {/* <PC> */}
        <div className="container-fluid">
          <div className="row flex-reverse-column-sm ">
            <div className="col-lg-9 col-12 my-2">
              <Card
                style={{
                  width: "100%",
                  maxheight: "auto",
                  minHeight: "100%",
                  backgroundColor: "white",
                  borderRadius: "1.5rem",
                  boxShadow: "0px 4px 20px rgba(192, 192, 192, 0.25)",
                }}
              >
                {/* <ChooseBooking /> */}
                {showCalendar ? (
                  <div className="row justify-content-center">
                    <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 p-0 d-flex justify-content-center">
                      <Calendar
                        value={selectedDay}
                        onChange={setSelectedDay}
                        shouldHighlightWeekends
                        minimumDate={utils().getToday()}
                        disabledDays={disabledDaysDynamic.concat(
                          disabledMingguDaysDynamic
                        )} // here to disable off days
                        customDaysClassName={availableDaysDynamic}
                        colorPrimary="#DF3034"
                        calendarClassName="responsive-calendar"
                        renderFooter={() => (
                          <div className="row align-items-center text-center">
                            <StyledSelected className="col-4">
                              Selected
                            </StyledSelected>
                            <StyledAvailable className="col-4">
                              Available
                            </StyledAvailable>
                            <StyledNotAvail className="col-4">
                              Not Available
                            </StyledNotAvail>
                          </div>
                        )}
                      />
                    </div>
                    <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 pt-4">
                      <div className="row">
                        <div className="col-lg-3 col-4">
                          <img
                            src={
                              data &&
                              data[0] &&
                              (data[0].gambar != ""
                                ? data[0].gambar
                                : "/images/pp.png")
                            }
                            alt={data && data[0] && data[0].nama}
                            width="100%"
                          />
                        </div>
                        <div className="col-lg-9 col-8">
                          <StyledTitle>
                            {data && data[0] && data[0].nama}
                          </StyledTitle>
                          <StyledText>
                            {data && data[0] && data[0].posisi}
                          </StyledText>
                          <StyledTextWIcon>
                            <Icon
                              icon="ion:medkit"
                              className=""
                              style={{
                                cursor: "pointer",
                                fontSize: "var(--fs-24)",
                                color: "#8D8D8D",
                                marginRight: "2%",
                              }}
                            />
                            Pengalaman: {data && data[0] && data[0].xp}
                          </StyledTextWIcon>
                        </div>
                      </div>
                      <div className="pt-3">
                        <span className="waktuTemu pt-5">Waktu Temu</span>
                        <br></br>
                        <Select
                          showSearch
                          className="py-1 waktuTemuSelector"
                          placeholder="Pilih jam"
                          optionFilterProp="children"
                          onChange={handleSelectedTime}
                          value={valuejam}
                        >
                          {jadwal &&
                            jadwal.map(
                              (item, i) =>
                                // dayName undefined @ safari, need to convert DateJS to MomentJS or DaysJS, fixed but need to check expected result
                                dayName == item.hari &&
                                (item.jam_mulai == "Dengan Perjanjian"
                                  ? filteredTimes(bookingan, dgnPerjanjian)
                                      .filter((time) => isFutureTime(time))
                                      .map((time, i3) => (
                                        <Option key={i3} value={time}>
                                          {time}
                                        </Option>
                                      ))
                                  : // Pecah jam item.jam menjadi array jam_booking yang telah dipesan
                                    filteredTimes(
                                      bookingan,
                                      pecahjam(
                                        item.jam_mulai + "-" + item.jam_selesai
                                      ).map((item2, i2) => item2)
                                    )
                                      .filter((time) => isFutureTime(time)) // Filter only future times
                                      .map((time, i3) => (
                                        <Option key={i3} value={time}>
                                          {time}
                                        </Option>
                                      )))
                            )}
                        </Select>
                      </div>
                      {errorTime && (
                        <span className="error mt-4">
                          Maaf, jam ini sudah terbooking. Silahkan pilih jam
                          lainnya.
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="row align-items-center align-self-center">
                    <div className="row justify-content-center align-items-center">
                      <div className="col-10 p-3">
                        <span className="bookingInputLabel py-2">
                          Nomor Telepon<span className="required">*</span>
                        </span>
                        <Input
                          placeholder="Tulis nomor HP di sini"
                          value={phone}
                          type="number"
                          onChange={(event) => setphone(event.target.value)}
                        />
                        {errorphone && (
                          <span className="error mt-4">
                            Nomor Telepon Anda harus diisi!
                          </span>
                        )}
                      </div>

                      <div className="col-md-2 p-3">
                        {phone ? (
                          <CheckButton onClick={() => searchUser(phone)}>
                            Check
                          </CheckButton>
                        ) : (
                          <DisabledButton
                            onClick={() => searchUser(phone)}
                            disabled={true}
                          >
                            Check
                          </DisabledButton>
                        )}
                      </div>
                    </div>

                    <div className="col-12 p-3">
                      <span className="bookingInputLabel py-2">
                        Nama lengkap pasien<span className="required">*</span>
                      </span>
                      <Input
                        placeholder="Tulis nama lengkapmu di sini"
                        value={nama}
                        onChange={(event) => setnama(event.target.value)}
                      />
                      {errornama && (
                        <span className="error mt-4">
                          Nama Anda harus diisi!
                        </span>
                      )}
                    </div>
                    <div className="col-12 p-3">
                      <span className="bookingInputLabel py-2">Keluhan</span>
                      <TextArea
                        placeholder="Tulis keluhanmu di sini"
                        value={keluhan}
                        onChange={(event) => setkeluhan(event.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                )}
              </Card>
            </div>
            <div className="col-lg-3 col-12 my-2">
              <DetailBooking
                value={valuejam}
                dateItem={selectedDay}
                showCalendar={showCalendar}
                setshowCalendar={setshowCalendar}
                bayar={bayar}
                loading={loading}
                isChecked={isChecked}
              />
            </div>
          </div>
        </div>
        {/* </PC> */}

        {/* <MOBILE></MOBILE> */}
      </Config>
    </Wrapper>
  );
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

  @media (max-width: 576px) {
    padding-top: 40%;
  }
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

  padding: 0 0 0 6%;

  @media (max-width: 576px) {
    padding: 0 0 0 8%;
  }
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

const CheckButton = styled.button`
  background: #df3034;
  width: 100%;
  border: none;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  cursor: pointer;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;

  margin-top: 15%;
`;

const DisabledButton = styled.button`
  background: #ccc;
  width: 100%;
  border: none;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  cursor: pointer;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  cursor: not-allowed;

  margin-top: 15%;
`;

export default BookingJadwalContent;
