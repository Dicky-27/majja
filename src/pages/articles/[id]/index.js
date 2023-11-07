import React from "react";
import Head from "next/head";
import Navbar from "../../../../components/Navbar";
import FloatingWA from "../../../../components/FloatingWA";
import Footer from "../../../../components/footer";
import { serviceList } from "../../../../components/ServiceData";
import { newsList } from "../../../../components/ArticleData";
import ServiceSlugContent from "../../../../components/ServiceSlugContent";
import ArticleSlugContent from "../../../../components/ArticleSlugContent";
import styled from "styled-components";
import { useRouter } from "next/router";
import { gql } from '@apollo/client';
import { addApolloState, initializeApollo } from "../../../../lib/apolloClient";
import moment from "moment";

const QUERY_BLOG = gql`
query artikel($filterString:String){
  queryArtikelContents(filter:$filterString){
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

const DETAIL_VAR = (params) => {
  return {
      filterString: "id eq '" + params + "'"
  }
}

function Slug({data}) {
  // const router = useRouter();
  // const { slug } = router.query;
  return (
    <>
      <Head>
        <title>Artikel</title>
      </Head>
      <Navbar></Navbar>
      <StyledSection>
        <ArticleSlugContent data={data}/>
      </StyledSection>
      <FloatingWA></FloatingWA>
      <Footer></Footer>
    </>
  );
}
const StyledSection = styled.div`
  background: #f9fcff;
  padding-top: 10%;
`;
export default Slug;

export async function getServerSideProps(context){
  const apolloClient = initializeApollo()

  let {data} = await apolloClient.query({
      query: QUERY_BLOG,
      variables: DETAIL_VAR(context.params.id),
    })

  // let blog = await apolloClient.query({
  //   query: BLOG
  // })

  if(data.queryArtikelContents.length < 0){
    return {
      notFound: true,
    }
  }

  return addApolloState(apolloClient, {
    props: {
      // data:data.queryBlogContents,
      data:data.queryArtikelContents
    }
  })
}
