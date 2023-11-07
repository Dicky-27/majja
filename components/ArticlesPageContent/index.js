import React, { useState, useEffect } from "react";
import AOS from "aos";
import styled from "styled-components";
import { newsList } from "../ArticleData";
import BacaSelengkapnya from "../BacaSelengkapnya";
import { Input, Pagination } from "antd";
import { sortByCreatedDateDescending } from "../../lib/sortBy";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");

function ArticlesPageContent() {
  const { Search } = Input;
  useEffect(() => {
    AOS.init();
    setDataNews([...slice2(newsList, 0, 16)]);
  }, []);
  const [DataNews, setDataNews] = useState(newsList);
  const sortedNewsList = sortByCreatedDateDescending(DataNews);

  const onSearch = (value) => {
    const filteredData = newsList.filter((entry) =>
      entry.title.toLowerCase().includes(value)
    );
    setDataNews(filteredData);
  };

  const handlePagination = async (value) => {
    if (value * 16 - 1 > newsList.length) {
      setDataNews([...slice2(newsList, (value - 1) * 16, newsList.length)]);
    } else {
      setDataNews([...slice2(newsList, (value - 1) * 16, value * 16)]);
    }
  };

  function slice2(array, val, offset) {
    var subarray = [];
    for (var i = val; i < offset; i++) {
      subarray.push(array[i]);
    }

    return subarray;
  }
  return (
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
        {sortedNewsList.map((item, index) => (
          <div className="col-xl-3 col-lg-5 col-md-6 col-12 p-3" key={index}>
            {/* <Link href={item.link} style={{textDecoration:'none'}}> */}
            <>
              <img src={item.image} width="100%"></img>
              <CardWrapper className="p-3">
                <CardTitleWrapper>
                  <CardTitle>{item.title}</CardTitle>
                </CardTitleWrapper>
                <CardBodyText>
                  {moment(item.created).format("DD MMMM YYYY")}
                </CardBodyText>
                <CardBodyWrapper className="my-2">
                  <CardBodyText>{item.text}</CardBodyText>
                </CardBodyWrapper>
                <BacaSelengkapnya link={'/articles/' + item.slug + moment(item.created).format("YYYYMMDD")}></BacaSelengkapnya>
              </CardWrapper>
            </>
            {/* </Link> */}
          </div>
        ))}
      </div>
      <div className="col-12 text-center py-4">
        <Pagination
          onChange={(value) => handlePagination(value)}
          defaultCurrent={1}
          total={newsList.length}
        />
      </div>
    </Wrapper>
  );
}

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
`;

const CardBodyText = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: var(--fs-14);
  color: #8d8d8d;
`;

export default ArticlesPageContent;
