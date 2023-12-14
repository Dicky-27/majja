import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Select } from "antd";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import { Calendar, utils } from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "moment";
require("moment/locale/id");
import {
  convertDaysToNumbers,
  getArrayEveryNDayDates,
  getArrayEveryNDayDatesFromToday,
  transformDatesToFormatDaysOff,
  transformDatesToFormatDaysOn,
} from "../../../../lib/getEveryDate";
import axios from "axios";
import { toast } from "react-toastify";

function AddSchedule({ closeHandler, saveHandler }) {
  const [selectedDay, setSelectedDay] = useState(utils().getToday());
  const [schedules, setSchedules] = useState();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [selectedDoctorId, setSelectedDoctorId] = useState();
  const [hariOn, sethariOn] = useState();
  const [hariOff, sethariOff] = useState();
  const [valuejam, setValuejam] = useState();
  const [nama, setnama] = useState("");
  const [phone, setphone] = useState("");
  const [rekamMedis, setrekamMedis] = useState("");
  const [kategoriPasien, setKategoriPasien] = useState("");
  const [keluhan, setkeluhan] = useState();
  const [errornama, seterrornama] = useState(false);
  const [errorphone, seterrorphone] = useState(false);
  const [errorTime, setErrorTime] = useState(false);
  const [isDoctorsLoading, setDoctorsLoading] = useState(false);
  const [isLoadingSchedule, setLoadingSchedule] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setCheck] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { Option } = Select;
  const { TextArea } = Input;
  let hariOnSet = new Set();
  let date = moment(
    `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`,
    "YYYY-MM-DD"
  );
  date.locale("id");
  let dayName = date.format("dddd");
  var days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  useEffect(() => {
    if (isInitialLoad) {
      fetchData();
    } else {
      validate();
    }
  }, [isChecked, selectedDoctor, valuejam, nama, kategoriPasien, phone]);

  // Sunday to Days off
  const AllHariMingguOffInThisYear = getArrayEveryNDayDates(["0"]);
  const disabledMingguDaysDynamic = transformDatesToFormatDaysOff(
    AllHariMingguOffInThisYear
  );

  // Schedule Days off
  const convertHariOff = convertDaysToNumbers(
    hariOff && hariOff.map((hari) => hari)
  );
  const AllHariOffInThisYear = getArrayEveryNDayDates(convertHariOff);
  const disabledDaysDynamic =
    transformDatesToFormatDaysOff(AllHariOffInThisYear);

  const convertHariOn = convertDaysToNumbers(
    hariOn && hariOn.map((hari) => hari)
  );
  const AllHariOnInThisYear = getArrayEveryNDayDatesFromToday(convertHariOn);

  // Schedule Days on Jam on
  const availableDaysDynamic =
    transformDatesToFormatDaysOn(AllHariOnInThisYear);

  const isFutureTime = (time) => {
    const selectedDateTime = moment(
      `${selectedDay.year}-${selectedDay.month}-${selectedDay.day} ${time}`,
      "YYYY-M-D HH:mm"
    );
    return selectedDateTime.isAfter(moment());
  };

  const handleSelectedTime = (selectedTime, doctorId) => {
    setValuejam(selectedTime);
    checkBooking(doctorId);
  };

  const handleSelectedDoctor = (id) => {
    setSelectedDoctorId(id);
    getDoctorSchedule(id);
  };

  const validate = () => {
    setIsValid(
      isChecked &&
        selectedDoctor !== null &&
        valuejam !== null &&
        nama !== "" &&
        kategoriPasien !== "" &&
        phone !== ""
    );
  };

  function pecahjam(jam) {
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

  const searchUser = (phoneNumber) => {
    axios
      .get(
        `/api/patient/search-by-phone/${phoneNumber}`
      )
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

  const fetchData = async () => {
    setDoctorsLoading(true);
    try {
      const response = await axios.get(
        `/api/doctors/list`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDoctors(response.data.dokter);
      setDoctorsLoading(false);
      setIsInitialLoad(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDoctorSchedule = (id) => {
    setLoadingSchedule(true);
    axios
      .get(`/api/doctors/schedule/` + id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSchedules(res.data.jadwaldokter);
        res.data.jadwaldokter &&
          res.data.jadwaldokter.map((item, i) => hariOnSet.add(item.hari));
        sethariOn(Array.from(hariOnSet));
        let temp = Array.from(hariOnSet);

        temp.map((item) => (days = days.filter((day) => day != item && day)));
        sethariOff(days);
        setLoadingSchedule(false);
      });
  };

  const checkBooking = (time, doctorId) => {
    axios
      .post(
        `/api/booking/checkbooking`,
        {
          today: moment(
            selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day,
            "YYYY-MM-DD"
          ).toISOString(),
          id_dokter: doctorId,
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

  const addSchedule = async () => {
    try {
      setIsLoading(true);
      const jam = valuejam.split(".");
      await axios.post(
        "/api/booking/add",
        {
          nama: nama,
          phone: phone.toString(),
          kategori: kategoriPasien,
          no_rekam_medis: rekamMedis,
          keluhan: keluhan,
          tanggal_booking: moment(
            selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day
          ).format("YYYY-MM-DD"),
          jam_booking: moment.utc(jam, "THH Z").format("HH:mm:ss"),
          id_dokter: selectedDoctorId,
          action_status: 1,
          payment: "manual",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      saveHandler();
      toast.success("Successfully added a schedule");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4">
          <StyledTitle>Tambah Jadwal Temu</StyledTitle>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {/* <Calendar Section /> */}
          <BigCard className="row mt-3 my-2 p-4">
            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 p-0 d-flex justify-content-start">
              <Calendar
                value={selectedDay}
                onChange={setSelectedDay}
                shouldHighlightWeekends
                minimumDate={utils().getToday()}
                disabledDays={disabledDaysDynamic.concat(
                  disabledMingguDaysDynamic
                )}
                customDaysClassName={availableDaysDynamic}
                colorPrimary="#DF3034"
                calendarClassName="responsive-calendar"
                renderFooter={() => (
                  <div className="row align-items-center text-center">
                    <StyledSelected className="col-4">Selected</StyledSelected>
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
              <div className="pt-3">
                <span className="waktuTemu pt-5">Pilih Dokter</span>
                <br></br>
                {!isDoctorsLoading ? (
                  <Select
                    showSearch
                    className="py-1 waktuTemuSelector"
                    placeholder="Pilih Dokter"
                    optionFilterProp="children"
                    onChange={handleSelectedDoctor}
                    value={selectedDoctor}
                    style={{ width: "100%" }}
                  >
                    {doctors.map((doctor) => (
                      <Option key={doctor.id_dokter} value={doctor.id_dokter}>
                        {doctor.nama} - {doctor.posisi}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <div className="d-flex flex-row">
                    <div className="loading-spinner"></div>
                    <div className="align-self-center ms-3">Please Wait</div>
                  </div>
                )}
              </div>
              <div className="pt-3">
                <span className="waktuTemu pt-5">Waktu Temu</span>
                <br></br>
                {!isLoadingSchedule ? (
                  <Select
                    showSearch
                    className="py-1 waktuTemuSelector"
                    placeholder="Pilih jam"
                    optionFilterProp="children"
                    onChange={handleSelectedTime}
                    value={valuejam}
                  >
                    {schedules &&
                      schedules.map(
                        (item) =>
                          dayName == item.hari &&
                          pecahjam(item.jam_mulai + "-" + item.jam_selesai)
                            .filter((time) => isFutureTime(time))
                            .map((time, i) => (
                              <Option key={i} value={time}>
                                {time}
                              </Option>
                            ))
                      )}
                  </Select>
                ) : (
                  <div className="d-flex flex-row">
                    <div className="loading-spinner"></div>
                    <div className="align-self-center ms-3">Please Wait</div>
                  </div>
                )}
              </div>
              {errorTime && (
                <span className="error mt-4">
                  Maaf, jam ini sudah terbooking. Silahkan pilih jam lainnya.
                </span>
              )}
            </div>
          </BigCard>

          {/* <Patient Section /> */}
          <BigCard className="row">
            <div>
              <div className="row justify-content-center align-items-end">
                <div className="col-xl-4 col-md-12 col-sm-12">
                  <span className="bookingInputLabel py-2">
                    Nomor Telepon<span className="required">*</span>
                  </span>
                  <Input
                    className="mt-2"
                    placeholder="+6281234567890"
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

                <div className="col-xl-2 col-md-12 col-sm-12 mt-2 mt-md-2 text-center">
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

                <div className="col-xl-6 col-md-12 col-sm-12 mt-4 mt-md-0">
                  <span className="bookingInputLabel py-2">
                    Nama lengkap pasien<span className="required">*</span>
                  </span>
                  <Input
                    className="mt-2"
                    placeholder="Nama lengkap pasien"
                    value={nama}
                    onChange={(event) => setnama(event.target.value)}
                  />
                  {errornama && (
                    <span className="error mt-4">Nama Anda harus diisi!</span>
                  )}
                </div>
              </div>

              <div className="col-12 py-3">
                <span className="bookingInputLabel py-2">Keluhan</span>
                <TextArea
                  className="mt-2"
                  placeholder="Input keluhan di sini"
                  value={keluhan}
                  onChange={(event) => setkeluhan(event.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div className="text-end mt-3">
              {!isLoading ? (
                <>
                  <button
                    className="buttonAlt mx-3"
                    onClick={() => closeHandler(false)}
                  >
                    Batalkan
                  </button>
                  <button
                    className={isValid ? "button" : "buttonDisabled"}
                    onClick={() => isValid && addSchedule()}
                    disabled={!isValid}
                  >
                    Simpan
                  </button>
                </>
              ) : (
                <div className="d-flex flex-row" style={{ float: "right" }}>
                  <div className="loading-spinner"></div>
                  <div className="align-self-center ms-3">Please Wait</div>
                </div>
              )}
            </div>
          </BigCard>
        </div>
      </div>
    </div>
  );
}

const BigCard = styled.div`
  border-radius: 0.625rem;
  box-shadow: 0px 0.375rem 1.25rem 0px rgba(192, 192, 192, 0.25);
  padding: 1.5rem;
  background-color: #ffffff;
  margin: 1% 0;
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
  color: #433b3b;
  font-size: var(--fs-24);
  font-family: Poppins;
  font-weight: 600;

  margin: 1% 0;
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
`;

export default AddSchedule;
