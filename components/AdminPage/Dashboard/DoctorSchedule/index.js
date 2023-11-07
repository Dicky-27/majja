import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Table,
  Tag,
  Modal,
  Select,
  DatePicker,
  Radio,
  Space,
  TimePicker,
} from "antd";
import moment from "moment";
import "moment/locale/id";
import { Input, Pagination } from "antd";
import { Icon } from "@iconify/react";
import dayjs, { recur } from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
moment.locale("id");
const { Option } = Select;

function DoctorSchedule({ updateRes, isAdmin, email }) {
  const [DataDokter, setDataDokter] = useState();
  const [DataDokterMaster, setDataDokterMaster] = useState()
  const [DataAddJadwalDokter, setDataAddJadwalDokter] = useState([])
  const [DataAddDokter, setDataAddDokter] = useState([])
  const [dokterSelected, setdokterSelected] = useState();
  const [recurring, setrecurring] = useState();
  const [jamMulai, setjamMulai] = useState();
  const [jamSelesai, setjamSelesai] = useState();
  const [angkaUlang, setAngkaUlang] = useState();
  const [textUlang, setTextUlang] = useState();
  const [ulangHari, setulangHari] = useState();
  const [berakhirpada, setberakhirpada] = useState();
  const [date, setDate] = useState();
  const [onDate, setOnDate] = useState();
  const [afterDate, setAfterDate] = useState();
  const [tanggalpraktek, settanggalpraktek] = useState();
  const [jampraktek, setjampraktek] = useState();
  const [namaDokter, setNamaDokter] = useState();
  const [idDokter, setidDokter] = useState();
  const [berakhir_setelah_modal, setberakhir_setelah_modal] = useState();
  const [berakhir_pada_modal, setberakhir_pada_modal] = useState();
  const [tidak_diulang_modal, settidak_diulang_modal] = useState();
  const [jamMulaiPraktek, setjamMulaiPraktek] = useState();
  const [jamSelesaiPraktek, setjamSelesaiPraktek] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPreferensiOpen, setModalPreferensiOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [hapusJadwal, sethapusJadwal] = useState(null);
  const [jadwalkhusus, setjadwalkhusus] = useState([]);
  const [looptoast, setlooptoast] = useState();
  const [idjadwal, setidjadwal] = useState();
  const [btnTab, setbtnTab] = useState("tabel");
  const [today, setToday] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const router = useRouter();

  const fetchDataAdmin = async () => {
    try {
      axios.get(`${url}/api/doctors/schedule/list`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          setDataDokter(res.data.jadwal)
        })

      axios.get(`${url}/api/doctors/list`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          setDataDokterMaster(res.data.dokter)
        })

      axios.get(`${url}/api/doctors/schedule/list_khusus`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          setjadwalkhusus(res.data.jadwal)
          setLoading(false)
        })
    } catch (error) {
      setLoading(false)
      console.error('Error fetching data:', error);
    }
  }

  const fetchDataNonAdmin = async () => {
    try {
      axios.post(`${url}/api/doctors/schedule/scheduleonemail`, { email: JSON.parse(email) }, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setDataDokter(res.data.result)
          setLoading(false)
        })
    } catch (error) {
      setLoading(false)
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    setLoading(true)
    if (!Cookies.get('token')) {
      router.push('/login')
    }
    else {
      if (isAdmin) {
        fetchDataAdmin()
      }
      else {
        fetchDataNonAdmin()
      }
    }

  }, [])

  useEffect(() => {
    if (recurring == 5) {
      setModalPreferensiOpen(true)
    }
  }, [recurring])

  useEffect(() => {
    if (looptoast) {
      toast.success('Tambah Jadwal Dokter Berulang Success!');
    }
  }, [looptoast])

  const openModalAddJadwal = () => {
    setModalOpen(true);
  };

  function isiArrayJadwal() {
    var rep = angkaUlang + ' ' + textUlang;
    setDataAddJadwalDokter([...DataAddJadwalDokter, { jamMulai, jamSelesai, recurring, rep, onDate, afterDate }])
    setjamMulai('')
    setjamSelesai('')
    setrecurring('')
    setAngkaUlang()
    setTextUlang()
    setulangHari()
    setberakhirpada()
    setOnDate('')
    setAfterDate('')
  }

  function addDokterAPI(start, end, day, recur, rep, on, after, tidak_diulang) {
    axios.post(`${url}/api/doctors/schedule/add`, {
      id_dokter: dokterSelected, hari:day, jam_mulai: start, jam_selesai: end,
      recurring: recur, repeat: rep, berakhir_pada: on, berakhir_setelah: after, tidak_diulang:tidak_diulang
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status == 200) {
          if(recurring == 3 || recurring == 4){
            setlooptoast(true)
          }
          else{
            toast.success('Tambah Jadwal Dokter Success!');
          }
          isAdmin ? fetchDataAdmin() : fetchDataNonAdmin();
          updateRes(5)
        }
        else {
          toast.error('Silahkan Coba Lagi')
        }
      })
      .catch(function (error) {
        toast.error('Silahkan Coba Lagi')
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
  }

  const addJadwalDokter = () => {
    var repetisi = angkaUlang + ' ' + textUlang;
    if(!dokterSelected){
      toast.error('Dokter harus dipilih!')
    }
    else if (!jamMulai){
      toast.error('Jam Mulai Praktek harus diisi!')
    }
    else if(!jamSelesai){
      toast.error('Jam Selesai Praktek harus diisi!')
    }
    else if(!recurring){
      toast.error('Perulangan(Setiap hari/Senin-Jumat/Tidak Diulang) harus diisi!')
    }
    else if(recurring == 2 && !date){
      toast.error('Jika tidak diulang, tanggal harus diisi!')
    }
    else{
      if (DataAddJadwalDokter.length > 0) {
        DataAddJadwalDokter.map((item, i) => (
          item.recurring == 2 ?
          addDokterAPI(moment(item.jamMulai).format('HH.mm'), moment(item.jamSelesai).format('HH.mm'), moment(date).day(), recurring, repetisi, item.onDate ? item.onDate : null, item.afterDate ? item.afterDate : null, moment(date._d).format('YYYY-MM-DD'))
          :
          item.recurring == 3 ?
          (addDokterAPI(moment(item.jamMulai).format('HH.mm'), moment(item.jamSelesai).format('HH.mm'), 0, item.recurring, item.rep, item.onDate, item.afterDate, null),
          addDokterAPI(moment(item.jamMulai).format('HH.mm'), moment(item.jamSelesai).format('HH.mm'), 1, item.recurring, item.rep, item.onDate, item.afterDate, null),
          addDokterAPI(moment(item.jamMulai).format('HH.mm'), moment(item.jamSelesai).format('HH.mm'), 2, item.recurring, item.rep, item.onDate, item.afterDate, null),
          addDokterAPI(moment(item.jamMulai).format('HH.mm'), moment(item.jamSelesai).format('HH.mm'), 3, item.recurring, item.rep, item.onDate, item.afterDate, null),
          addDokterAPI(moment(item.jamMulai).format('HH.mm'), moment(item.jamSelesai).format('HH.mm'), 4, item.recurring, item.rep, item.onDate, item.afterDate, null),
          addDokterAPI(moment(item.jamMulai).format('HH.mm'), moment(item.jamSelesai).format('HH.mm'), 5, item.recurring, item.rep, item.onDate, item.afterDate, null),
          addDokterAPI(moment(item.jamMulai).format('HH.mm'), moment(item.jamSelesai).format('HH.mm'), 6, item.recurring, item.rep, item.onDate, item.afterDate, null))
          :
          item.recurring == 4 ?
          (addDokterAPI(moment(item.jamMulai).format('HH.mm'), moment(item.jamSelesai).format('HH.mm'), 1, item.recurring, item.rep, item.onDate, item.afterDate, null),
          addDokterAPI(moment(item.jamMulai).format('HH.mm'), moment(item.jamSelesai).format('HH.mm'), 2, item.recurring, item.rep, item.onDate, item.afterDate, null),
          addDokterAPI(moment(item.jamMulai).format('HH.mm'), moment(item.jamSelesai).format('HH.mm'), 3, item.recurring, item.rep, item.onDate, item.afterDate, null),
          addDokterAPI(moment(item.jamMulai).format('HH.mm'), moment(item.jamSelesai).format('HH.mm'), 4, item.recurring, item.rep, item.onDate, item.afterDate, null),
          addDokterAPI(moment(item.jamMulai).format('HH.mm'), moment(item.jamSelesai).format('HH.mm'), 5, item.recurring, item.rep, item.onDate, item.afterDate, null))
          :
          addDokterAPI(moment(item.jamMulai).format('HH.mm'), moment(item.jamSelesai).format('HH.mm'),  moment(date).day(), item.recurring, item.rep, item.onDate, item.afterDate, null)
        ))
        if(recurring == 2){
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), moment(date).day(), recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, moment(date._d).format('YYYY-MM-DD'))
        }
        else if(recurring == 3){
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 0, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 1, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 2, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 3, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 4, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 5, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 6, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
        }
        else if(recurring == 4){
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 1, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 2, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 3, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 4, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 5, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
        }
        else{
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), moment(date).day(), recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
        }
        closeModal()
        isAdmin ? fetchDataAdmin() : fetchDataNonAdmin();
        updateRes(5)
      }
      else {
        if(recurring == 2){
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), moment(date).day(), recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, moment(date._d).format('YYYY-MM-DD'))
        }
        else if(recurring == 3){
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 0, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 1, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 2, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 3, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 4, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 5, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 6, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
        }
        else if(recurring == 4){
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 1, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 2, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 3, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 4, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), 5, recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
        }
        else{
          addDokterAPI(moment(jamMulai).format('HH.mm'), moment(jamSelesai).format('HH.mm'), moment(date).day(), recurring, repetisi, onDate ? onDate : null, afterDate ? afterDate : null, null)
        }
        closeModal()
        isAdmin ? fetchDataAdmin() : fetchDataNonAdmin();
        updateRes(5)
      }
    }
  }

  const openModalDoctor = (record) => {
    setModalOpen2(true);
    setNamaDokter(record.nama);
    settanggalpraktek(record.hari);
    setjampraktek(record.jam_mulai + (record.jam_selesai != null ? (' - ' + record.jam_selesai) : ''))
    setjamMulaiPraktek(record.jam_mulai)
    setjamSelesaiPraktek(record.jam_selesai)
    setidjadwal(record.id_jadwal)
    setidDokter(record.id_dokter)
    setberakhir_setelah_modal(record.berakhir_setelah != null ? moment(record.berakhir_setelah).add('days',0).format('YYYY-MM-DD') : null)
    setberakhir_pada_modal(record.berakhir_pada != null ? moment(record.berakhir_pada).add('days',0).format('YYYY-MM-DD') : null)
    settidak_diulang_modal(record.tidak_diulang != null ? moment(record.tidak_diulang).add('days',0).format('YYYY-MM-DD'): null)
  };

  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const onChangeDate = (dateChosen, dateString) => {
    setDate(dateChosen);
  };

  const onChangeOnDate = (dateChosen, dateString) => {
    setOnDate(dateChosen);
  };

  const onChangeAfterDate = (dateChosen, dateString) => {
    setAfterDate(dateChosen);
  };

  const onChangeHapus = () => {
    //semua
    if (hapusJadwal == 0) {
      axios.post(`${url}/api/doctors/schedule/delete`, { id: idjadwal }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => {
          if (res.status == 200) {
            toast.success('Seluruh Jadwal Berhasil Dihapus!');
            setModalOpen2(false)
            setModalOpen3(false)
            // localStorage.setItem('halamandash', 5)
            // window.location.reload()
            isAdmin ? fetchDataAdmin() : fetchDataNonAdmin();
            updateRes(5)
          }
          else {
            toast.error('Silahkan Coba Lagi')
            setModalOpen2(false)
            setModalOpen3(false);
          }
        })
    }
    //harian
    else if (hapusJadwal == null) {
      toast.error('Hapus Jadwal Gagal! Pilih Pilihan Hapus Jadwal!')
      setModalOpen3(false);
    }
    else {
      var tgl = hapusJadwal.split(' ');
      var bln = tgl[2] == "Januari" ? '01' : tgl[2] == 'Februari' ? '02' : tgl[2] == 'Maret' ? '03' : tgl[2] == 'April' ? '04' : tgl[2] == 'Mei' ? '05' : tgl[2] == "Juni" ? '06' :
          tgl[2] == 'Juli' ? '07' : tgl[2] == 'Agustus' ? '08' : tgl[2] == 'September' ? '09' : tgl[2] == 'Oktober' ? '10' : tgl[2] == 'November' ? '11' : '12';
      var tgl2 = moment(tgl[3]+'-'+bln+'-'+tgl[1]).format('YYYY-MM-DD')
      axios.post(`${url}/api/doctors/schedule/add_once`, {
        id_dokter: idDokter, hari: tanggalpraktek, jam_mulai: moment.utc(jamMulaiPraktek, "THH Z").format('HH:mm:ss'),
        jam_selesai: moment.utc(jamSelesaiPraktek, "THH Z").format('HH:mm:ss'), tanggal:tgl2, hapus: 1
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          if (res.status == 200) {
            toast.success('Jadwal tanggal ' + hapusJadwal + ' berhasil dihapus!');
            setModalOpen3(false);
            setModalOpen2(false)
            // localStorage.setItem('halamandash', 5)
            // window.location.reload()
            isAdmin ? fetchDataAdmin() : fetchDataNonAdmin();
            updateRes(5)
          }
          else {
            toast.error('Silahkan Coba Lagi')
            setModalOpen3(false);
            closeModal()
          }
        })
    }
  };

  function cancelModalPreferensi() {
    setModalPreferensiOpen(false)
    setAngkaUlang()
    setTextUlang()
    setulangHari()
    setberakhirpada()
    setOnDate()
    setAfterDate()
  }

  function closeModal(){
    setModalOpen(false)
    setdokterSelected()
    setjamMulai()
    setjamSelesai()
    setDate()
    setrecurring()
  }

  function generateDate(hari, isRadio) {
    let jarakHari = Number(moment(today).daysInMonth()) - Number(moment(today).format('DD'));
    let i = 0;
    let newdate;
    let tglpraktekSet = new Set(); // Menggunakan Set untuk menyimpan tanggal unik

    if(tidak_diulang_modal == null){
      if (jarakHari > 6) {
        for (i = 0; i <= jarakHari; i++) {
          newdate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
          if (newdate.getDay() == hari) {
            tglpraktekSet.add(moment(newdate).format('dddd, DD MMMM YYYY'));
            if(jadwalkhusus.length > 0){
              jadwalkhusus?.forEach((item) => { 
                if (item.id_dokter == idDokter && 
                    item.jam_mulai == moment.utc(jamMulaiPraktek, "THH Z").format('HH:mm:ss')) {
                      tglpraktekSet.delete(moment(item.tanggal).format('dddd, DD MMMM YYYY'));
                } 
                // if (item.id_dokter == idDokter && 
                //     item.jam_mulai == moment.utc(jamMulaiPraktek, "THH Z").format('HH:mm:ss') && 
                //     moment(item.tanggal).format('YYYY-MM-DD') != moment(newdate).format('YYYY-MM-DD')) {
                //       tglpraktekSet.add(moment(newdate).format('DD MMMM YYYY'));
                // } 
                // else if (item.id_dokter == idDokter && 
                //   item.jam_mulai != moment.utc(jamMulaiPraktek, "THH Z").format('HH:mm:ss') && 
                //   moment(item.tanggal).format('YYYY-MM-DD') == moment(newdate).format('YYYY-MM-DD')) {
                //     tglpraktekSet.add(moment(newdate).format('DD MMMM YYYY'));
                // } 
                // else if (item.id_dokter == idDokter && 
                //   item.jam_mulai != moment.utc(jamMulaiPraktek, "THH Z").format('HH:mm:ss') && 
                //   moment(item.tanggal).format('YYYY-MM-DD') != moment(newdate).format('YYYY-MM-DD')) {
                //   if (!tglpraktekSet.has(moment(newdate).format('DD MMMM YYYY'))) {
                //     tglpraktekSet.add(moment(newdate).format('DD MMMM YYYY'));
                //   }
                // } 
                // else if (moment(item.tanggal).format('YYYY-MM-DD') != moment(newdate).format('YYYY-MM-DD') && 
                //   item.id_dokter != idDokter && 
                //   item.jam_mulai != moment.utc(jamMulaiPraktek, "THH Z").format('HH:mm:ss')) {
                //   if (!tglpraktekSet.has(moment(newdate).format('DD MMMM YYYY'))) {
                //     tglpraktekSet.add(moment(newdate).format('DD MMMM YYYY'));
                //   }
                // }
              });
            }
          }
        }
      }
      else {
        for (i = 0; i <= 6; i++) {
          newdate = moment(today).add(i, 'days')
          if (moment(newdate).day() == hari) {
            if(jadwalkhusus.length > 0){
              jadwalkhusus?.forEach((item) => { // Menggunakan forEach untuk iterasi array
                if (item.id_dokter == idDokter && item.jam_mulai == moment.utc(jamMulaiPraktek, "THH Z").format('HH:mm:ss') && moment(item.tanggal).format('YYYY-MM-DD') != moment(newdate).format('YYYY-MM-DD')) {
                  tglpraktekSet.add(moment(newdate).format('dddd, DD MMMM YYYY'));
                } else if (item.id_dokter == idDokter && item.jam_mulai != moment.utc(jamMulaiPraktek, "THH Z").format('HH:mm:ss') && moment(item.tanggal).format('YYYY-MM-DD') == moment(newdate).format('YYYY-MM-DD')) {
                  tglpraktekSet.add(moment(newdate).format('dddd, DD MMMM YYYY'));
                } else if (item.id_dokter == idDokter && item.jam_mulai != moment.utc(jamMulaiPraktek, "THH Z").format('HH:mm:ss') && moment(item.tanggal).format('YYYY-MM-DD') != moment(newdate).format('YYYY-MM-DD')) {
                  if (!tglpraktekSet.has(moment(newdate).format('dddd, DD MMMM YYYY'))) {
                    tglpraktekSet.add(moment(newdate).format('dddd, DD MMMM YYYY'));
                  }
                } else if (moment(item.tanggal).format('YYYY-MM-DD') != moment(newdate).format('YYYY-MM-DD') && item.id_dokter != idDokter && item.jam_mulai != moment.utc(jamMulaiPraktek, "THH Z").format('HH:mm:ss')) {
                  if (!tglpraktekSet.has(moment(newdate).format('dddd, DD MMMM YYYY'))) {
                    tglpraktekSet.add(moment(newdate).format('dddd, DD MMMM YYYY'));
                  }
                }
              });
            }else{
              tglpraktekSet.add(moment(newdate).format('dddd, DD MMMM YYYY'));
            }
          }
        }
      }
    }
    else{
      tglpraktekSet.add(moment(tidak_diulang_modal).format('dddd, DD MMMM YYYY'));
    }

    const tglpraktek = Array.from(tglpraktekSet); // Mengonversi Set kembali menjadi array

    if (!isRadio) {
      return tglpraktek.map((item, i) => (
        <div key={i}>
          <span>{item}</span>
          <br></br><br></br>
        </div>
      ));
    } else {
      return tglpraktek.map((item, i) => (
        <div key={i}>
          <Radio value={item}>Jadwal {item}</Radio>
        </div>
      ));
    }
  }

  const columns = [
    {
      dataIndex: "no",
      title: "No",
      width: 70,
      align: 'center',
      render: ((value, item, index) => index += 1)
    },
    {
      title: "Nama Dokter",
      dataIndex: "nama",
      defaultSortOrder: "ascend",
      // sorter: (a, b) => a.nama.localeCompare(b.nama),
      width: 500,
      // render: (_, record) => (
      //   <span
      //     style={{ cursor: "pointer" }}
      //     onClick={() => openModalDoctor(record)}
      //   >
      //     {record.nama}
      //   </span>
      // ),
    },
    {
      title: "Spesialis",
      dataIndex: "posisi",
      width: 400,
    },
    {
      title: "Jadwal Praktek",
      dataIndex: "hari",
      defaultSortOrder: "ascend",
      // sorter: (a, b) => a.hari.localeCompare(b.hari),
      width: 300,
    },
    {
      title: "Jam Praktek",
      dataIndex: "jam_praktek",
      defaultSortOrder: "ascend",
      render: (_, record) => (
        record.jam_mulai + (record.jam_selesai != null ? (' - ' + record.jam_selesai) : '')
      ),
      // sorter: (a, b) => a.name.localeCompare(b.name),
      width: 200,
    },
  ];

  return (
    <>
      <Wrapper className="container-fluid">
        <div className="row">
          <div className="col-md-2 col-12">
            <StyledTitle>
              {moment(today).format("MMMM YYYY")}
            </StyledTitle>
          </div>
          <div className="col-md-4 col-12 align-self-center">
            {/* <button
              onClick={() => setbtnTab("kalender")}
              className={
                btnTab == "kalender" ? "buttonTabSelected" : "buttonTab"
              }
            >
              Kalender
            </button>
            <button
              onClick={() => setbtnTab("tabel")}
              className={btnTab == "tabel" ? "buttonTabSelected" : "buttonTab"}
            >
              Tabel
            </button> */}
          </div>
          {
            isAdmin &&
            <div className="col-md-6 col-12 text-end align-self-center">
              <button className="button" onClick={() => openModalAddJadwal()}>
                + Tambah Jadwal Baru
              </button>
            </div>
          }
        </div>
        {
          !loading ?
            <div className="row">
              <BigCard className="col m-2 p-0">
                <Table
                  columns={columns}
                  dataSource={DataDokter}
                  // onChange={onChange}
                  pagination={false}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => {
                        openModalDoctor(record)
                      },
                    };
                  }}
                />

              </BigCard>
            </div>
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
      {/* tambah jadwal dokter */}
      <Modal
        centered
        open={modalOpen}
        footer={null}
        width={650}
        // onOk={() => closeModal()}
        onCancel={() => closeModal()}
      >
        <div className="p-3">
          <h5 className="pb-3 modalDoctorTitle">Jadwal Dokter</h5>

          <div
            className="p-3 my-4"
            style={{ border: "1px solid #ccc", borderRadius: "10px" }}
          >
            <div className="row py-2">
              <div className="col-lg-3 col-12 modalSubtitle align-self-center">
                Dokter Praktek
              </div>
              <div className="col-lg-9 col-12 modalSubtitleData align-self-center">
                <Select
                  placeholder="Nama Dokter"
                  style={{ width: '100%' }}
                  onChange={(e) => setdokterSelected(e)}
                  value={dokterSelected}
                >
                  {DataDokterMaster && DataDokterMaster.map((item, i) => (
                    <Option key={i} value={item.id_dokter}>{item.nama}</Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-lg-3 col-12 modalSubtitle align-self-center">
                Tanggal Praktek
              </div>
              <div className="col-lg-9 col-12 modalSubtitleData align-self-center">
                <DatePicker
                  className="datepickerDaily"
                  placeholder="Pilih Tanggal"
                  format="DD-MM-YY"
                  value={date}
                  onChange={onChangeDate}
                  disabledDate={disabledDate}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-lg-3 col-12 modalSubtitle align-self-start mt-1">
                Jam Praktek
              </div>
              <div className="col-lg-9 col-12 modalSubtitle align-self-center">
                <div className="row">
                  {
                    DataAddJadwalDokter?.map((item, i) => (
                      <>
                        <div className="col-lg-7 col-12 py-1 modalSubtitleData align-self-center">
                          <div className="d-flex">
                            <TimePicker value={item.jamMulai} format={'HH:mm'} />
                            <span className="mx-3 align-self-center"> - </span>
                            <TimePicker value={item.jamSelesai} format={'HH:mm'} />
                          </div>
                        </div>
                        <div className="col-lg-5 col-12 py-1 modalSubtitleData align-self-center">
                          <Select
                            placeholder="Setiap..."
                            style={{ width: '100%' }}
                            value={item.recurring == 1 ?
                              'Setiap Hari ' + moment(date).format('dddd')
                              :
                              item.recurring == 2 ?
                                'Tidak Diulang'
                                :
                                item.recurring == 3 ?
                                  "Setiap Hari"
                                  :
                                  item.recurring == 4 ?
                                    "Senin sampai Jumat"
                                    :
                                    "Preferensi"
                            }
                          >
                          </Select>
                        </div>
                      </>
                    ))
                  }
                  <div className="col-7 modalSubtitleData py-1 align-self-center">
                    <div className="d-flex">
                      <TimePicker value={jamMulai} format={'HH:mm'} placeholder="Mulai"  onChange={(event) => setjamMulai(event)}/>
                      <span className="mx-3 align-self-center"> - </span>
                      <TimePicker value={jamSelesai} format={'HH:mm'} placeholder="Selesai" onChange={(event) => setjamSelesai(event)}/>
                    </div>
                    {/* <div className="d-flex">
                      <Input
                        placeholder="Mulai"
                        value={jamMulai}
                        onChange={(event) => setjamMulai(event.target.value)}
                      />
                      <span className="mx-3 align-self-center"> - </span>
                      <Input
                        placeholder="Selesai"
                        value={jamSelesai}
                        onChange={(event) => setjamSelesai(event.target.value)}
                      />
                    </div> */}
                  </div>
                  <div className="col-5 modalSubtitleData py-1 align-self-center">
                    <Select
                      placeholder="Setiap..."
                      style={{ width: '100%' }}
                      onChange={(e) => setrecurring(e)}
                      value={recurring}
                    >
                      <Option value={1}>Setiap Hari {moment(date).format('dddd')}</Option>
                      <Option value={2}>Tidak diulang</Option>
                      <Option value={3}>Setiap Hari</Option>
                      <Option value={4}>Senin sampai Jumat</Option>
                      {/* <Option value={5}>Preferensi</Option> */}
                    </Select>
                  </div>
                  <span className="tambahjam py-2" style={{ cursor: 'pointer' }} onClick={() => isiArrayJadwal()}>+ Tambahkan jam praktek</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-end">
            <button className="button px-3 py-1" onClick={() => addJadwalDokter()}>Simpan</button>
          </div>
        </div>
      </Modal>
      {/* Preferensi */}
      <Modal
        centered
        open={modalPreferensiOpen}
        footer={null}
        width={450}
        // onOk={() => closeModal()}
        onCancel={() => cancelModalPreferensi()}>
        <div className="p-3">
          <h5 className="pb-3 modalDoctorTitle">Preferensi</h5>
          <div className="row my-3">
            <div className="col-lg-4 col-12 modalSubtitle align-self-center">
              Ulangi Setiap
            </div>
            <div className="col-lg-3 col-12 modalSubtitle">
              <Input
                placeholder="3"
                type="number"
                value={angkaUlang}
                max={3}
                onChange={(event) => setAngkaUlang(event.target.value)}
              />
            </div>
            <div className="col-lg-4 col-12 modalSubtitle">
              <Select
                placeholder="Setiap..."
                style={{ width: '100%' }}
                onChange={(e) => setTextUlang(e)}
                value={textUlang}
              >
                <Option value="Minggu">Minggu</Option>
                <Option value="Bulan">Bulan</Option>
              </Select>
            </div>
          </div>
          <div className="row my-3 mt-4">
            <div className="col-12 modalSubtitle">
              Ulangi Pada Hari
            </div>
            <div className="col-12 my-3 modalSubtitle">
              <span className={ulangHari == 0 ? "buletSelected" : "bulet"} onClick={() => setulangHari(0)}>M</span>
              <span className={ulangHari == 1 ? "buletSelected" : "bulet"} onClick={() => setulangHari(1)}>S</span>
              <span className={ulangHari == 2 ? "buletSelected" : "bulet"} onClick={() => setulangHari(2)}>S</span>
              <span className={ulangHari == 3 ? "buletSelected" : "bulet"} onClick={() => setulangHari(3)}>R</span>
              <span className={ulangHari == 4 ? "buletSelected" : "bulet"} onClick={() => setulangHari(4)}>K</span>
              <span className={ulangHari == 5 ? "buletSelected" : "bulet"} onClick={() => setulangHari(5)}>J</span>
              <span className={ulangHari == 6 ? "buletSelected" : "bulet"} onClick={() => setulangHari(6)}>S</span>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12 modalSubtitle">
              Berakhir Pada
            </div>
            <div className="col-12 modalSubtitle">
              <Radio.Group
                onChange={(e) => setberakhirpada(e.target.value)}
                value={berakhirpada}>
                <Space direction="vertical">
                  <Radio className="my-1" value={1}>Tidak Pernah</Radio>
                  <Radio className="my-1" value={2}>
                    <div className="d-flex align-self-center">
                      Pada Tanggal
                      <DatePicker
                        className="ms-3"
                        placeholder="Pilih Tanggal"
                        format="DD-MM-YY"
                        value={onDate}
                        onChange={onChangeOnDate}
                        disabledDate={disabledDate}
                      />
                    </div>
                  </Radio>
                  <Radio className="my-1" value={3}>
                    <div className="d-flex align-self-center">
                      Setelah Tanggal
                      <DatePicker
                        className="ms-3"
                        placeholder="Pilih Tanggal"
                        format="DD-MM-YY"
                        value={afterDate}
                        onChange={onChangeAfterDate}
                        disabledDate={disabledDate}
                      />
                      {/* <Input
                      placeholder="3"
                      type="number"
                      className="ms-3"
                      style={{width:'50%'}}
                      value={tglPref}
                      onChange={(event) => settglPref(event.target.value)}
                    /> */}
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
          <div className="text-end mt-5">
            <ModalButtonCancel className="batalkan me-3" onClick={() => cancelModalPreferensi()}>
              Batalkan
            </ModalButtonCancel>
            <ModalButtonOk className="ok" onClick={() => setModalPreferensiOpen(false)}>
              Ok
            </ModalButtonOk>
          </div>
        </div>
      </Modal>

      {/* keterangan per dokter */}
      <Modal
        centered
        open={modalOpen2}
        footer={null}
        width={650}
        // onOk={() => closeModal()}
        onCancel={() => (setModalOpen2(false))}
      >
        <div className="p-3">
          <h5 className="pb-3 modalDoctorTitle">Jadwal Dokter</h5>

          <div
            className="p-3 my-4"
            style={{ border: "1px solid #ccc", borderRadius: "10px" }}
          >
            <div className="row py-3">
              <div className="col-lg-4 col-12 modalSubtitle">
                Dokter Praktek
              </div>
              <div className="col-lg-8 col-12 modalSubtitleData">
                {namaDokter}
              </div>
            </div>
            <div className="row py-3">
              <div className="col-lg-4 col-12 modalSubtitle">
                Tanggal Praktek
              </div>
              <div className="col-lg-8 col-12 modalSubtitleData">
                {
                  tanggalpraktek == "Senin" ?
                    generateDate(1, false)
                    :
                    tanggalpraktek == "Selasa" ?
                      generateDate(2, false)
                      :
                      tanggalpraktek == "Rabu" ?
                        generateDate(3, false)
                        :
                        tanggalpraktek == "Kamis" ?
                          generateDate(4, false)
                          :
                          tanggalpraktek == "Jumat" ?
                            generateDate(5, false)
                            :
                            generateDate(6, false)
                }
              </div>
            </div>
            <div className="row pt-0 pb-3">
              <div className="col-lg-4 col-12 modalSubtitle">Jam Praktek</div>
              <div className="col-lg-8 col-12 modalSubtitleData">
                {jampraktek}
              </div>
            </div>
          </div>
          {
            isAdmin &&
            <div className="text-end">
              <button className="buttonAlt py-1 px-3" onClick={() => setModalOpen3(true)}>
                Hapus Jadwal
              </button>
            </div>
          }
        </div>
      </Modal>
      {/* konfirmasi hapus dokter */}
      <Modal
        centered
        open={modalOpen3}
        footer={null}
        width={350}
        closable={false}
      >
        <div className="p-3">
          <h5 className="pb-3 modalDoctorTitle">Hapus Jadwal</h5>
          <div className="">
            <Radio.Group onChange={(e) => sethapusJadwal(e.target.value)} value={hapusJadwal}>
              <Space direction="vertical">
                <Radio value={0}>Semua Jadwal</Radio>
                {
                  tanggalpraktek == "Senin" ?
                    generateDate(1, true)
                    :
                    tanggalpraktek == "Selasa" ?
                      generateDate(2, true)
                      :
                      tanggalpraktek == "Rabu" ?
                        generateDate(3, true)
                        :
                        tanggalpraktek == "Kamis" ?
                          generateDate(4, true)
                          :
                          tanggalpraktek == "Jumat" ?
                            generateDate(5, true)
                            :
                            generateDate(6, true)
                }
              </Space>
            </Radio.Group>
          </div>
          <div className="text-end">
            <ModalButtonCancel className="batalkan me-3" onClick={() => setModalOpen3(false)}>
              Batalkan
            </ModalButtonCancel>
            <ModalButtonOk className="ok" onClick={() => onChangeHapus()}>
              Ok
            </ModalButtonOk>
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

const ModalButtonOk = styled.a`
  color: #09a53e;
  font-family: Poppins;
  font-size: var(--fs-16);
  font-style: normal;
  font-weight: 600;
`;

const ModalButtonCancel = styled.a`
  color: #262626;
  font-family: Poppins;
  font-size: var(--fs-16);
  font-style: normal;
  font-weight: 500;
`;

export default DoctorSchedule;
