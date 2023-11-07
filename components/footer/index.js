import React from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Icon } from '@iconify/react';
// import i18n from '../../i18n';
import Link2 from "react-scroll/modules/components/Link";

function Footer() {
  const router = useRouter();
  var year = moment().format('YYYY');

  return (
    <footer>
        <div className="container footerContainer pt-5">
            <div className='row justify-content-center'>
                <div className='col-xl-11 col-12'>
                <div className='row justify-content-center pt-4'>
                    <div className="col-lg-5 col-md-3 col-12 p-md-2 px-4 py-2">
                        <img className='footer-img' src='/images/logoputih.png'></img>
                    </div>
                    <div className="col-lg-2 col-md-3 col-12 p-md-2 px-4 py-2">
                        <h3 className='footer-title'>
                            {/* {i18n.t('product')} */} Information
                            </h3>
                        <p className='footer-text'>
                        <Link2 to="hero">Home</Link2>
                        </p>
                        <p className='footer-text'>
                        <Link2 to="offering">
                            About
                        </Link2>
                        </p>
                        <p className='footer-text' style={{cursor: 'pointer'}} onClick={() => router.push('/doctor')}>Doctors</p>
                        <p className='footer-text' style={{cursor: 'pointer'}} onClick={() => router.push('/services')}>Services</p>
                    </div>
                    <div className="col-lg-2 col-md-3 col-12 p-md-2 px-4 py-2">
                        <h3 className='footer-title'>
                            {/* {i18n.t('product')} */} Supports
                            </h3>
                        <p className='footer-text'><Link2 to="findUs">Location</Link2></p>
                        <p className='footer-text'><Link2 to="findUs">Contacts</Link2></p>
                        <p className='footer-text' style={{cursor: 'pointer'}} onClick={() => router.push('/articles')}>Articles</p>
                    </div>
                    <div className="col-lg-3 col-md-5 col-12 p-md-2 px-4 py-2">
                        <h3 className='footer-title'>Connect With Us</h3>
                        <a className="social" target="_blank" href='https://www.facebook.com/petanetra' rel="noreferrer">
                            <Icon icon="ic:baseline-facebook" className='' style={{cursor:'pointer', marginTop:'-20px'}}/>
                        </a>
                        <a className="social" target="_blank" href='https://www.instagram.com/petanetra/' rel="noreferrer">
                            <Icon icon="ph:instagram-logo-fill" className='' style={{cursor:'pointer', marginTop:'-20px'}}/>
                        </a>
                        <a className="social" target="_blank" href='https://www.youtube.com/@petanetra' rel="noreferrer">
                        <Icon icon="ph:youtube-logo-fill" className='' style={{cursor:'pointer', marginTop:'-20px'}}/>
                        </a>     
                    </div>
                    
                </div>
                <div className='row justify-content-center'>
                    <div className="col-12 text-left pb-5">
                        <span className="copyright">© Copyright {year} Majja Klinik</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer;