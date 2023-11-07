import React, { useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import DokterTerkait from "./DokterTerkait";
import AOS from "aos";
import "moment/locale/id";
moment.locale("id");

function ArticleSlugContent({ data }) {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Wrapper>
      <StyledTitle>{data && data[0] && data[0].data.judul.iv}</StyledTitle>
      <SubTitleWrapper>
        <StyledSubTitle>
          Terakhir diperharui:{" "}
          {
            data && data[0] && data[0].data.date.iv
          // moment(data && data[0] && data[0].data.date.iv).format("DD MMMM YYYY")
          }
        </StyledSubTitle>
        <StyledSubTitle>
          Ditinjau oleh: {(data && data[0] && data[0].data.creator && data[0].data.creator.iv).split("\"")}
        </StyledSubTitle>
      </SubTitleWrapper>
      <ContentWrapper>
        {/* <StyledContentText
          dangerouslySetInnerHTML={{
            __html: data && data[0] && data[0].contentFirst,
          }}
        ></StyledContentText> */}
        <ImgWrapper>
          <img
            src={data && data[0] && data[0].data.photo.iv}
            alt={data && data[0] && data[0].data.judul.iv}
            width="100%"
            height="100%"
          />
        </ImgWrapper>
        <StyledContentText
          dangerouslySetInnerHTML={{
            __html: data && data[0] && data[0].data.content.iv,
          }}
        ></StyledContentText>
      </ContentWrapper>
      {/* <ReferenceWrapper>
        <StyledReference>Referensi</StyledReference>
        <StyledReferenceList
          dangerouslySetInnerHTML={{
            __html: data && data[0] && data[0].referensi,
          }}
        ></StyledReferenceList>
      </ReferenceWrapper> */}
      {/* <RelatedDocWrapper>
        <DokterTerkait />
      </RelatedDocWrapper> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0% 10%;

  @media(max-width:576px){
    padding: 30% 10%;
  }
`;

const SubTitleWrapper = styled.div`
  margin: 1% 0;
`;

const ImgWrapper = styled.div`
  margin: 1% 0;
  padding: 3% 0;
`;

const ContentWrapper = styled.div`
  margin: 5% 0;
`;

const ReferenceWrapper = styled.div`
  margin: 5% 0;
`;

const RelatedDocWrapper = styled.div`
  margin: 5% 0;
`;

const StyledTitle = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-42);
  color: #a5090c;
`;

const StyledSubTitle = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-14);
  color: #8d8d8d;
`;

const StyledContentText = styled.div`
  font-family: "Poppins";
  /* font-style: normal; */
  /* font-weight: 600; */
  font-size: var(--fs-16);

  color: #433b3b;
`;

const StyledReference = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-14);
  color: #8d8d8d;

  margin: 0 0 1% 0;
`;
const StyledReferenceList = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-14);
  color: #8d8d8d;
`;

export default ArticleSlugContent;
