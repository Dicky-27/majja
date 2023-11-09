import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { UserOutlined } from '@ant-design/icons';
import { LockOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from "next/image";
import { Icon } from '@iconify/react';

function Setting() {
    const [email, setEmail] = useState(Cookies.get('email') != undefined ? Cookies.get('email').split("\"")[1] : '');
    const [loading, setloading] = useState(false);
    const [password, setPassword] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [errorPass, setErrorPass] = useState(false);
    const [errorOldPass, setErrorOldPass] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imgawal, setimgawal] = useState(null);
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const urlsquidex = "https://cloud.squidex.io/api/apps/artikel/assets";
    const isAdmin = Cookies.get('is_admin');

    useEffect(() => {
      if(isAdmin != "1"){
        axios.post(`${url}/api/doctors/byemail`,{email},{
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          setimgawal(res.data.dokter[0].gambar)
        })
      }
    }, [])
    

    const onSubmit = () => {
        if(!password){
            setErrorPass(true)
        }
        else if(!oldPass){
            setErrorOldPass(true)
        }
        else{
            axios.post(`${url}/api/auth/forgot`,{email, password, oldPass},{
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              .then(res => {
                if(res.status == 200){
                    toast.success("Ubah Password Berhasil");
                    setModalOpen(false)
                    setPassword('')
                    setOldPass('')
                }
            })
            .catch(function (error) {
                  if (error.response) {
                    if(error.response.status == 404){
                        toast.error(error.response.data.msg);
                        setModalOpen(false)
                        setPassword('')
                        setOldPass('')
                    }
                    else if(error.response.status == 405){
                        toast.error(res.data.msg);
                        setModalOpen(false)
                        setPassword('')
                        setOldPass('')
                    }
                }
            })
        }
    }

    const onChangePP = (img) => {
      setloading(true)
      const uploadimg = new FormData();
      uploadimg.append('file',img);
  
      fetch(urlsquidex, {
        method: 'POST',
        body: uploadimg
      }).then(response => response.json()).then(dataRes => {
        axios.post(`${url}/api/doctors/edit`, {email:email, gambar:("https://cloud.squidex.io/api/assets/artikel/"+dataRes.id)}, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if(res.status == 200){
            setloading(false)
            toast.success('Sukses Mengganti Profile Picture!')
          }
        })
      })
    }
    
    return (
        <>
        <Wrapper className="container-fluid">
            <div className="row">
                <div className="col-6"><StyledTitle>Pengaturan</StyledTitle></div>
            </div>  
            <BigCard className="col m-2">
                {
                  isAdmin != "1" &&
                  <div className="col-lg-6 col-12 pb-4">
                    <div className='d-flex'>
                      <div className="">
                        {imagePreview ? 
                        <img src={imagePreview} width={105} height={140} className="img-upload" alt="upload" style={{objectFit:'cover', borderRadius:'5px'}} /> 
                        : 
                        // (imgawal ?
                        <Image src={imgawal ? imgawal : "/images/imgplaceholder.svg"} width={105} height={140} alt="upload" style={{objectFit:'cover', borderRadius:'5px'}}  />
                        // :
                        // <Icon
                        //   icon="svg-spinners:12-dots-scale-rotate"
                        //   className="text-right"
                        //   style={{ fontSize: "38px", color: '#DF3034' }}
                        // />
                        // )
                        }

                        {
                          !loading ?
                          <label class="custom-file-upload ms-3 py-2 px-2">
                            <input
                              type="file"
                              // name="avatar"
                              accept="image/png, image/jpeg"
                              className='changePP'
                              onChange={(event) => {
                                const img = event.target.files[0];
                                setImagePreview(URL.createObjectURL(img));
                                onChangePP(img)
                              }}
                            />
                            Change Profile Picture
                          </label>
                          :
                          <Icon
                            icon="svg-spinners:12-dots-scale-rotate"
                            className="text-right"
                            style={{ fontSize: "38px", color: '#DF3034' }}
                          />
                        }
                        
                      </div>
                    </div>
                  </div>
                }
                <div className="col-6">
                    <label><b>Email</b></label>
                    <Input 
                    type="email"
                    className="text-lg"
                    placeholder="youremail@mail.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled
                    prefix={<UserOutlined className='iconOutline' style={{color:'#DF3034'}}/>} 
                    />
                </div>
                <div className="col-6 pt-4">
                    <label><b>Password</b></label>
                    <Input.Password 
                    className="text-lg"
                    placeholder="Password"
                    value={password}
                    prefix={<LockOutlined className='iconOutline'/>}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? onSubmit() : null}
                    style={{color:'#DF3034'}}
                    ></Input.Password>
                     {
                        errorPass ? 
                        <p className='error pt-2'>Fill Your Password!</p> 
                        : <p>{''}</p>
                    }    
                </div>
                <div className="col-6 pt-4">
                <button type="button" className="py-2 buttonAlt my-1" onClick={() => setModalOpen(true)}>
                    Change Password
                </button>
                </div>
            </BigCard>
        </Wrapper>
        <Modal
        centered
        open={modalOpen}
        footer={null}
        width={600}
        // onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        >
        <div className="p-3">
            <h5 className="pb-3 modalDoctorTitle" style={{fontSize:'16px'}}>Masukkan Password Lama untuk Mengkonfirmasi Perubahan</h5>
        
            <StyledText className='text'>Konfirmasi Password Lama</StyledText>
            <Input.Password placeholder="Masukkan Password Lama Anda" 
              prefix={<LockOutlined className='iconOutline'/>}
              value={oldPass}
              style={{color:'#DF3034'}} onChange={(e) => setOldPass(e.target.value)}/>           
            {
                errorOldPass ? 
                <p className='error pt-2'>Isi Password Lama Anda!</p> 
                : <p>{''}</p>
            }    
            <div className="text-end mt-5">
                <ModalButtonCancel className="batalkan me-3" onClick={() => setModalOpen(false)}>
                  Batalkan
                </ModalButtonCancel>
                <ModalButtonOk className="ok" onClick={onSubmit}>
                  Ok
                </ModalButtonOk>
              </div>
        </div>
        </Modal>
        </>
    )
}

const Wrapper = styled.div``;

const StyledTitle = styled.div`
  color: #433b3b;
  font-size: var(--fs-24);
  font-family: Poppins;
  font-weight: 600;

  margin: 1% 0;
`;

const StyledText = styled.div`
  color: #8D8D8D;
  font-size: var(--fs-14);
  font-family: Poppins;
  font-weight: 500;
`;

const BigCard = styled.div`
  border-radius: 0.625rem;
  box-shadow: 0px 0.375rem 1.25rem 0px rgba(192, 192, 192, 0.25);
  padding: 1.5rem;
//   min-height: 32rem;
  background-color: #ffffff;
`;

const ModalButtonCancel = styled.a`
  color: #262626;
  font-family: Poppins;
  font-size: var(--fs-16);
  font-style: normal;
  font-weight: 500;
`;

const ModalButtonOk = styled.a`
  color: #09a53e;
  font-family: Poppins;
  font-size: var(--fs-16);
  font-style: normal;
  font-weight: 600;
`;

export default Setting