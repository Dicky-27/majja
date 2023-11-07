import Head from 'next/head';
import '../styles/globals.css'
import '../styles/hero.css'
import '../styles/footer.css'
import '../styles/navbar.css'
import '../styles/video.css'
import '../styles/testimonies.css'
import '../styles/card.css'
import '../styles/offering.css'
import '../styles/floatingWA.css'
import '../styles/article.css'
import '../styles/layanan.css'
import '../styles/doctor.css'
import '../styles/doctorHome.css'
import '../styles/chooseBooking.css'
import '../styles/renderJam.css'
import '../styles/dashboard.css'
import '../styles/login.css'
import '../styles/modal.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "swiper/swiper.min.css";
import 'antd/dist/antd.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../../lib/apolloClient'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  return(
    <>
    <ApolloProvider client={apolloClient}>
    <Head>
      {/* Google Font */}
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap" rel="stylesheet"></link>

      {/* AOS Animation */}
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />

      {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}

      <link rel="shortcut icon" type="image/x-icon" href="/images/LogoRounded.png"></link>
    </Head>
    <Component {...pageProps} />
    <ToastContainer />
    </ApolloProvider>
    </>
  )
}
