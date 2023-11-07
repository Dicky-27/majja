import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../../../components/Navbar";
import FloatingWA from "../../../components/FloatingWA";
import Footer from "../../../components/footer";
// import ArticlesPageContent from "../../../components/ArticlesPageContent";
import styled from "styled-components";
import AOS from "aos";
import { Input, Pagination } from "antd";
import BacaSelengkapnya from "../../../components/BacaSelengkapnya";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/router";
import axios from "axios";
moment.locale("id");

function Articles({data}) {
  const { Search } = Input;
  const [newsList, setNewsList] = useState([]);
  const [newsListMaster, setNewsListMaster] = useState([]);
  const router = useRouter();

  useEffect(() => {
    AOS.init();

    axios.get(`https://cloud.squidex.io/api/content/artikel/artikel`,{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      setNewsList(res.data.items.length >= 12 ? [...slice2(res.data.items, 0, 12)] : res.data.items)
      setNewsListMaster(res.data.items)
    })
  }, []);

  const handlePagination = async (value) => {
    if (value * 12- 1 > newsList.length) {
      setNewsList([...slice2(newsListMaster, (value - 1) * 12, newsListMaster.length)]);
    } else {
      setNewsList([...slice2(newsListMaster, (value - 1) * 12, value * 12)]);
    }
  };

  function slice2(array, val, offset) {
    var subarray = [];
    for (var i = val; i<offset; i++) {
        subarray.push(array[i]);
    }

    return subarray;
}

  const onSearch = (value) => {
    const filteredData = newsListMaster.filter((entry) =>
      entry.data.judul.iv.toLowerCase().includes(value)
    );
    setNewsList(filteredData);
  };

  return (
    <>
      <Head>
        <title>Artikel</title>
      </Head>
      <Navbar></Navbar>
      <StyledSection>
        <Wrapper>
          <StyledTitle>Artikel Kesehatan Terkini Untuk Anda</StyledTitle>
          <SearchWrapper className="py-2">
            <Search
              className="py-2"
              placeholder="Cari Artikel Disini"
              allowClear
              onSearch={onSearch}
            />
          </SearchWrapper>
          <div className="row" data-aos="fade-up">
            {newsList?.map((item, index) => (
              <div className="col-xl-3 col-lg-5 col-md-6 col-12 p-3" key={index} onClick={()=> router.push('/articles/' + item?.id)}>
                <>
                  <img src={item?.data?.photo?.iv} width="100%" style={{aspectRatio:'4/3', objectFit:'cover', borderRadius:'10px 10px 0 0'}}></img>
                  <CardWrapper className="p-3">
                    <CardTitleWrapper>
                      <CardTitle>{item?.data?.judul?.iv}</CardTitle>
                    </CardTitleWrapper>
                    <CardBodyText>
                      {item?.data?.date?.iv
                      // moment(item?.data?.date?.iv).format("DD MMMM YYYY")
                      }
                    </CardBodyText>
                    <CardBodyWrapper className="my-2">
                      <CardBodyText><div dangerouslySetInnerHTML={{__html: item?.data?.content?.iv}}></div> </CardBodyText>
                    </CardBodyWrapper>
                    <BacaSelengkapnya link={'/articles/' + item?.id}></BacaSelengkapnya>
                  </CardWrapper>
                </>
              </div>
            ))}
          </div>
          <div className="col-12 text-center py-4">
            <Pagination
              onChange={(value) => handlePagination(value)}
              defaultCurrent={1}
              total={newsListMaster.length}
            />
          </div>
        </Wrapper>
      </StyledSection>
      <FloatingWA></FloatingWA>
      <Footer></Footer>
    </>
  );
}

const StyledSection = styled.section`
  background: #f9fcff;
  padding-top: 10%;
`;


const Wrapper = styled.div`
  padding: 0% 5%;

  @media(max-width:576px){
    padding: 30% 5%;
  }
`;


const SearchWrapper = styled.div`
  /* font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-16); */

  width: 65%;
  margin: 1% 0;
`;

const StyledTitle = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-32);
  color: #a5090c;
  
  margin-bottom: 2%;
`;

const CardWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 50px rgba(192, 192, 192, 0.3);
  border-radius: 0 0 10px 10px;
  height: 17rem;
`;

const CardTitleWrapper = styled.div`
  text-decoration: none;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const CardTitle = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-18);
  color: #262626;
`;

const CardBodyWrapper = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  max-height:100px;
`;

const CardBodyText = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: var(--fs-14);
  color: #8d8d8d;
`;

export default Articles;