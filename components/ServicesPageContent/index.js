import React, { useState, useEffect } from "react";
import AOS from "aos";
import styled from "styled-components";
import { serviceList } from "../ServiceData";
import CardLayanan from "../CardLayanan";
import { Input, Pagination } from "antd";
import { sortByCreatedDateDescending } from "../../lib/sortBy";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");

function ServicesPageContent() {
  useEffect(() => {
    AOS.init();
    setDataServices([...slice2(serviceList, 0, 9)]);
  }, []);
  const { Search } = Input;
  const [DataServices, setDataServices] = useState(serviceList);

  const onSearch = (value) => {
    const filteredData = serviceList.filter((entry) =>
      entry.title.toLowerCase().includes(value)
    );
    setDataServices(filteredData);
  };

  const handlePagination = async (value) => {
    if (value * 9 - 1 > serviceList.length) {
      setDataServices([
        ...slice2(serviceList, (value - 1) * 9, serviceList.length),
      ]);
    } else {
      setDataServices([...slice2(serviceList, (value - 1) * 9, value * 9)]);
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
      <StyledTitle>Pilihan Layanan Terbaik Untuk Anda</StyledTitle>
      <SearchWrapper className="py-2">
        <Search
          className="py-2"
          placeholder="Cari Artikel Disini"
          allowClear
          onSearch={onSearch}
        />
      </SearchWrapper>
      <div className="row pt-2">
        {DataServices.map((item, i) => (
          <div
            className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4"
            key={i}
            data-aos="fade-up"
          >
            <CardLayanan
              image={item.icon}
              title={item.title}
              text={item.text}
              link={"/services/" + item.id}
            ></CardLayanan>
          </div>
        ))}
      </div>
      <div className="col-12 text-center py-4">
        <Pagination
          onChange={(value) => handlePagination(value)}
          defaultCurrent={1}
          total={serviceList.length}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 5%;

  @media (max-width: 576px) {
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

export default ServicesPageContent;
