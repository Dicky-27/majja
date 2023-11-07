import React, { useEffect, useState } from "react";
import Head from 'next/head'
import Link from 'next/link'
import SignInForm from '../../../components/SignInForm'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function Index() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if(token){
      router.push('/dashboard')
    }
  }, [])

  return (
    <>
    <Head><title>Login</title></Head>
      <section className="sign-in">
      <div className="container-fluid">
        <div className="row">
            <div className="col-lg-7 px-lg-5 px-4 mt-lg-0 mt-4 ">
            <img src="/images/Logo.png" width="30%" className='p-3'/>
                <div className='row justify-content-center' style={{marginTop:'15%'}}>
                    <div className='col-lg-5 col-12'>
                        <h1 className='loginTitle py-1'>Login to Your Account</h1>
                        <p className='loginText py-1'>Admin Account</p>
                        <form action="">
                            <SignInForm 
                            loading={loading}
                            setLoading={setLoading}
                            />
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-lg-5 p-0 text-end">
              <img src="/images/login.png" width="90%"/>
            </div>
            
        </div>
      </div>
      </section>
    </>
  )
}

export default Index;