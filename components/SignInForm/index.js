import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import { LockOutlined } from '@ant-design/icons';
import { Input, Checkbox } from 'antd';

export default function SignInForm({loading, setLoading}) {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmail2, setErrorEmail2] = useState(false);
  const [errorEmail3, setErrorEmail3] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorPass, setErrorPass] = useState(false);
  const [errorPass2, setErrorPass2] = useState(false);
  const router = useRouter();

  const onChangeRemember = () => {
    console.log(`checked = ${e.target.checked}`);
  }

  const onSubmit = async () => {
    setLoading(true)
    setErrorEmail(false)
    setErrorPass(false)
    setErrorEmail2(false)
    setErrorPass2(false)
    setErrorEmail3(false) 
    const data = {
      email,
      password,
    };

    if (!email) {
      setLoading(false)
      setErrorEmail(true)
    } 
    else if(!isValidEmail) {
      setLoading(false)
      setErrorEmail3(true)
    }
    else if(!password){
      setLoading(false)
      setErrorPass(true)
    }
    else {
      setErrorEmail(false)
      setErrorPass(false)
      axios.post(`${url}/api/auth/login`,data,{
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if(res.status == 200){
          toast.success("Login Berhasil");
          const { token } = res.data.token;
          Cookies.set('token', token, { expires: 1 })
          Cookies.set('username', JSON.stringify(res.data.username), { expires: 1 })
          Cookies.set('is_admin', JSON.stringify(res.data.is_admin), { expires: 1 })
          Cookies.set('email', JSON.stringify(res.data.email), { expires: 1 })
          router.push('/dashboard');
        }
      })
      .catch(function (error) {
        setLoading(true);
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if(error.response.status == 400){
              setLoading(false);
              setErrorPass2(true)
            }
            else if(error.response.status == 404){
              setLoading(false);
              setErrorEmail2(true)
            }
            else if(error.response.status == 405){
              setLoading(false);
              toast.error(error.response.data.message)
            }
          } else if (error.request) {
            console.log(error.request);
            setLoading(false);
          } else {
            console.log('Error', error.message);
            setLoading(false);
          }})
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <div className='text-center mx-auto'>
      <div className="col-12">
        <Input 
          type="email"
          className="text-lg"
          placeholder="youremail@mail.com"
          value={email}
          onChange={handleEmailChange}
          prefix={<UserOutlined className='iconOutline' />} 
          />
        {
          errorEmail ?  <p className='error pt-2'>Fill Your Email!</p> : <p>{''}</p>
        }
        { errorEmail3 ? <p className='error pt-2'>Invalid Email</p> : <p>{''}</p> }
        {
          errorEmail2 ?  <p className='error'>User Doesn&apos;t Exist!</p> : <p>{''}</p>
        }
      </div>
      <div className="col-12 pt-2">
        <div className="d-flex flex-row">
        <Input.Password 
          className="text-lg"
          placeholder="Password"
          value={password}
          prefix={<LockOutlined className='iconOutline'/>}
          onChange={(event) => setPassword(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ? onSubmit() : null}
          ></Input.Password>
        </div>
        {
          errorPass ? <p className='error pt-2'>Fill Your Password!</p> : <p>{''}</p>
        }   
        {
          errorPass2 ? <p className='error'>Wrong Password!</p> : <p>{''}</p>
        }        
      </div>
      <div className="col-12 pt-2">
        <div className='row'>
          {/* <div className="col-6 text-start">
            <Checkbox className="forgot-password" onChange={onChangeRemember}>Remember me</Checkbox>
          </div> */}
          {/* <div className="col-6 text-end">
            <a className="forgot-password" href="/email-password">Forgot Password?</a>
          </div> */}
        </div>
      </div>
      <div className="col-12 pt-5">
        {
          !loading ? 
          <button type="button" className="col-12 py-3 btn-loginPage my-1" onClick={onSubmit}>
            Sign In
          </button>
          :
          <div className='d-flex flex-row'>
            <div className="loading-spinner"></div> <div className='align-self-center ms-3'>Please Wait</div>
          </div>
        }
      </div>
    </div>
  );
}
