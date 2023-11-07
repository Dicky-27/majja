import Head from 'next/head'
import Footer from '../../components/footer';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Offering from '../../components/Offering';
import VideoSection from '../../components/video-section';
import Testimonies from '../../components/Testimonies';
import FindUs from '../../components/FindUs';
import FloatingWA from '../../components/FloatingWA';
import ArticleGridHome from '../../components/articlegrid';
import LayananHome from '../../components/LayananHome';
import DoctorHome from '../../components/DoctorHome';
import { useQuery, gql, ApolloClient, InMemoryCache, useMutation } from '@apollo/client';
import { addApolloState, initializeApollo } from "../../lib/apolloClient";

const QUERY_BLOG = gql`
{
  queryArtikelContents(top:4){
    id
    data{
      judul{
        iv
      }
      slug{
        iv
      }
      photo{
        iv
      }
      date{
        iv
      }
      content{
        iv
      }
      creator{
        iv
      }
    }
  }
}`

export default function Home({data}) {
  return (
    <>
    <Head>
       <title>Majja</title>
       <meta name="description" content="majja" />
       <meta property="og:title" content="Majja" />
       <meta property="og:description" content="majja" />
       <meta property="og:image" content="/images/LogoRounded.png" />
       <meta property="og:url" content="https://majja.com" />
     </Head>
     <Navbar></Navbar>
     <Hero></Hero>
     <Offering></Offering>
     <LayananHome></LayananHome> 
     <Testimonies></Testimonies>
     <DoctorHome></DoctorHome> 
     <VideoSection></VideoSection>
     <ArticleGridHome newsList={data}></ArticleGridHome> 
     <FindUs></FindUs>
     <FloatingWA></FloatingWA>
     <Footer></Footer>
   </>
  )
}

export async function getServerSideProps(){
  const apolloClient = initializeApollo()
  
  let {data} = await apolloClient.query({
      query: QUERY_BLOG
  })

  if(data.queryArtikelContents.length < 0){
    return {
      notFound: true,
    }
  }

  return addApolloState(apolloClient, {
    props: {
      data:data.queryArtikelContents
    }
  })
}