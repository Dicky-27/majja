import React, { useState } from "react";
import styled from "styled-components";
import { Input, Pagination, Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function NewDoctor({ updateBatal, updateSimpan, callData }) {
  const [nama, setnama] = useState();
  const [phone, setphone] = useState();
  const [spesialis, setspesialis] = useState();
  const [password, setPassword] = useState();
  const [errornama, seterrornama] = useState(false);
  const [errorphone, seterrorphone] = useState(false);
  const [erroremail, seterroremail] = useState(false);
  const [errorPass, seterrorPass] = useState(false);
  const [errorspesialis, seterrorspesialis] = useState(false);
  const [xpNumber, setxpNumber] = useState();
  const [xpText, setxpText] = useState();
  const [status, setstatus] = useState();
  const [email, setemail] = useState();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL ||  "http://localhost:3000";

  function addDokter() {
    setLoading(true)
    if(!nama){
      setLoading(false)
      toast.error('Nama Dokter harus diisi!')
    }
    else if(!phone){
      setLoading(false)
      // seterrorphone(true)
      toast.error('Nomor Telepon harus diisi!')
    }
    else if (!spesialis){
      setLoading(false)
      // seterrorspesialis(true)
      toast.error('Spesialis harus diisi')
    }
    else if (!xpNumber || !xpText){
      setLoading(false)
      // seterrorspesialis(true)
      toast.error('Pengalaman harus diisi')
    }
    else if (!status){
      setLoading(false)
      // seterrorspesialis(true)
      toast.error('Status harus diisi')
    }
    else if(!email){
      setLoading(false)
      // seterroremail(true)
      toast.error('Email harus diisi!')
    }
    else if(!password){
      setLoading(false)
      // seterrorPass(true)
      toast.error('Passsword harus diisi!')
    }
    else if(!isValidEmail){
      setLoading(false)
      toast.error('Email tidak valid')
    }
    else{
      axios.post(`${url}/api/doctors/add`,
        {
          nama,
          posisi: spesialis,
          gambar: "",
          xp: xpNumber + " " + xpText,
          phone: phone.toString(),
          status,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          axios.post(
              `${url}/api/auth/register`,
              { nama, email, password, is_admin: 0 },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              if (res.status == 200) {
                setLoading(false)
                toast.success("Tambah Dokter Berhasil!");
                // localStorage.setItem('halamandash', 4)
                // window.location.reload()
                updateSimpan(false);
                callData(true);
              } else {
                toast.success("Tambah Dokter Gagal!");
              }
            });
        } else {
          setloading(false)
          toast.success("Tambah Dokter Gagal!");
        }
      });
    }
  }

  function batal() {
    setnama("");
    setphone("");
    setspesialis("");
    setPassword("");
    setxpNumber("");
    setxpText("");
    setstatus("");
    setemail("");
    updateBatal(false);
  }

  // email on change
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setemail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <Wrapper className="container-fluid">
      <div className="row">
        <div className="col-6">
          <StyledTitle>Tambah Dokter Baru</StyledTitle>
        </div>
      </div>
      <div className="row">
        <BigCard className="col m-2 p-3">
          <div className="row align-items-center align-self-center">
            <div className="col-md-7 col-12 p-3">
              <span className="bookingInputLabel py-2">
                Nama Dokter<span className="required">*</span>
              </span>
              <Input
                placeholder="Input nama dokter"
                value={nama}
                onChange={(event) => setnama(event.target.value)}
              />
              {/* {errornama && (
                <span className="error mt-4">Nama Dokter harus diisi!</span>
              )} */}
            </div>
            <div className="col-md-5 col-12 p-3">
              <span className="bookingInputLabel py-2">
                Nomor Telepon<span className="required">*</span>
              </span>
              <Input
                placeholder="+628894848429"
                value={phone}
                type="number"
                onChange={(event) => setphone(event.target.value)}
              />
              {/* {errorphone && (
                <span className="error mt-4">Nomor Telepon harus diisi!</span>
              )} */}
            </div>
          </div>
          <div className="row align-items-center align-self-center">
            <div className="col-md-7 col-12 p-3">
              <span className="bookingInputLabel py-2">
                {" "}
                Spesialis<span className="required">*</span>
              </span>
              <br></br>
              <Select
                placeholder="Pilih Spesialisasi"
                style={{ width: "100%" }}
                onChange={(e) => setspesialis(e)}
                value={spesialis}
                options={[
                  {
                    value: "Spesialis Anestesi Konsultan Intensive Care",
                    label: "Spesialis Anestesi Konsultan Intensive Care",
                  },
                  {
                    value: "Spesialis Obstetri dan Ginekologi",
                    label: "Spesialis Obstetri dan Ginekologi",
                  },
                  {
                    value: "Spesialis Penyakit Dalam",
                    label: "Spesialis Penyakit Dalam",
                  },
                  {
                    value: "Spesialis Anak",
                    label: "Spesialis Anak",
                  },
                  {
                    value: "Dokter Umum",
                    label: "Dokter Umum",
                  },
                  {
                    value: "Spesialis Gizi",
                    label: "Spesialis Gizi",
                  },
                  {
                    value: "Psikolog",
                    label: "Psikolog",
                  },
                ]}
              ></Select>
              {/* <Input
                placeholder="Input spesialisasi"
                value={spesialis}
                onChange={(event) => setspesialis(event.target.value)}
                /> */}
              {/* {errorspesialis && (
                <span className="error mt-4">Spesialisasi harus diisi!</span>
              )} */}
            </div>
          </div>
          <div className="row align-items-center align-self-center">
            <div className="col-md-3 col-12 p-3">
              <span className="bookingInputLabel py-2">
                Pengalaman<span className="required">*</span>
              </span>
              <div className="row align-self-center">
                <div className="col-6 py-1">
                  <Input
                    placeholder="3"
                    min={0}
                    type="number"
                    max={xpText == "bulan" ? 12 : ''}
                    style={{ width: "100%" }}
                    value={xpNumber}
                    onChange={(event) => setxpNumber(event.target.value)}
                  />
                </div>
                <div className="col-6 py-1">
                  <Select
                    placeholder="Tahun"
                    style={{ width: "100%" }}
                    onChange={(e) => (setxpText(e), (xpNumber > 12 && setxpNumber(12)))}
                    value={xpText}
                    options={[
                      {
                        value: "tahun",
                        label: "tahun",
                      },
                      {
                        value: "bulan",
                        label: "bulan",
                      },
                    ]}
                  ></Select>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-12 p-3">
              <span className="bookingInputLabel py-2">
                Status<span className="required">*</span>
              </span>
              <br></br>
              <Select
                className="py-1"
                placeholder="Praktek Rutin"
                style={{ width: "100%" }}
                onChange={(e) => setstatus(e)}
                value={status}
                options={[
                  {
                    value: 1,
                    label: "Praktek Rutin",
                  },
                  {
                    value: 2,
                    label: "Dengan Perjanjian",
                  },
                ]}
              ></Select>
            </div>
          </div>
          <div className="row align-items-center align-self-center">
            <div className="col-md-6 col-12 p-3">
              <span className="bookingInputLabel py-2">
                Email<span className="required">*</span>
              </span>
              <Input
                placeholder="emaildokter@mail.com"
                value={email}
                onChange={handleEmailChange}
                className={isValidEmail ? null : 'ant-input-error'}
              />
              {erroremail && (
                <span className="error mt-4">Email harus diisi!</span>
              )}
            </div>
          </div>
          <div className="row align-items-center align-self-center">
            <div className="col-md-6 col-12 p-3">
              <span className="bookingInputLabel py-2">
                Password<span className="required">*</span>
              </span>
              <Input.Password
                className="text-lg"
                placeholder="Input Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></Input.Password>
              {errorPass ? (
                <p className="error pt-2">Fill Your Password!</p>
              ) : (
                <p>{""}</p>
              )}
            </div>
          </div>
          <div className="text-end">
            {
              !loading ?
              <>
              <button className="buttonAlt mx-1" onClick={() => batal()}>
                Batalkan
              </button>
              <button className="button mx-1" onClick={() => addDokter()}>
                Simpan
              </button>
              </>
              :
              <div className='d-flex flex-row' style={{float:'right'}}>
                <div className="loading-spinner"></div> 
                <div className='align-self-center ms-3'>Please Wait</div>
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

export default NewDoctor;
