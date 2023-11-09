import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Table, Tag, Modal, Select } from "antd";
import moment from "moment";
import "moment/locale/id";
import { Input, Pagination, DatePicker } from "antd";
import { useQuery, gql, useMutation } from '@apollo/client';
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs, { recur } from "dayjs";
// import dynamic from 'next/dynamic'
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from '@tinymce/tinymce-react';
moment.locale("id");
import { useRouter } from 'next/router';
import Image from "next/image";
import Cookies from "js-cookie";

// const Editor = dynamic(
//   () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
//   { ssr: false }
// )

const ADD_CONTENT = gql`
mutation add(
  $judul:String,
  $photo:String
  $date:String,
  $content:String
  $creator:String){
  createArtikelContent(
    data:{
      judul:{
        iv:$judul
      }
      photo:{
        iv:$photo
      }
      date:{
        iv:$date
      }
      content:{
        iv:$content
      }
      creator:{
        iv:$creator
      }
    },
    status:"Published"
  ){
    id
    flatData{
      judul
      photo
      date
      content
    }
  }
  }
  `

const GET_ARTICLES = gql`
{
  queryArtikelContents{
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
    }
  }
}`

function ArticleDashboard({ updateRes }) {
  // const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [addTodo, test] = useMutation(ADD_CONTENT);
  const { data, error, refetch } = useQuery(GET_ARTICLES)
  const [editArticle, setEditArticle] = useState()
  const [editorState, setEditorState] = useState()
  const [contentState, setcontentState] = useState()
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [date, setDate] = useState(new Date())
  const [judul, setjudul] = useState()
  const [link, setlink] = useState()
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const urlsquidex = "https://cloud.squidex.io/api/apps/artikel/assets";
  const editorRef = useRef(null);
  const creator = Cookies.get('username');

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };

  const onChangeDate = (dateChosen, dateString) => {
    setDate(dateChosen);
  };

  const onSubmit = () => {
    const uploadimg = new FormData();
    uploadimg.append('file', image);

    fetch(urlsquidex, {
      method: 'POST',
      body: uploadimg
    }).then(response => response.json()).then(dataRes => {
      addTodo({
        variables: {
          judul: judul,
          // link: link,
          photo: "https://cloud.squidex.io/api/assets/artikel/" + dataRes.id,
          date: moment(date).format('DD MMMM YYYY HH:mm'),
          content: editorRef.current.getContent(),
          creator: creator
        }
      }).then(dataRes => {
        if (dataRes.data.createArtikelContent.id) {
          toast.success('Upload Artikel Sukses'),
            setjudul(),
            setDate(),
            setlink(),
            setImage(),
            setImagePreview()
            setEditArticle(false),
            // localStorage.setItem('halamandash', 6)
            // window.location.reload()
            refetch()
            updateRes(6)
        }
        else {
          toast.error("Gagal Menambahkan Artikel")
        }
      }
      )
    })
  }

  useEffect(() => {
    setLoading(true)
    if (!Cookies.get('token')) {
      router.push('/login')
    }
    else {
      setLoading(false)
    }
  }, [])


  const deleteArticle = (id) => {
    axios.delete(`https://cloud.squidex.io/api/content/artikel/artikel/` + id, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status == 204) {
          toast.success('Hapus Artikel Berhasil!')
          // localStorage.setItem('halamandash', 6)
          // window.location.reload()
          refetch()
          updateRes(6)
        }
        else {
          toast.success('Gagal Hapus Artikel')
        }
      })
  }

  return (
    <Wrapper className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-12"><StyledTitle>Articles</StyledTitle></div>
        <div className="col-md-6 col-12 text-end align-self-center">
          {!editArticle ? <button className="button py-2 px-4" onClick={() => setEditArticle(true)}>
            + Artikel Baru
          </button> : ''}
        </div>
      </div>
      <div className="row">
        <div>
          {
            !loading ?
              !editArticle ?
                <div className="row my-3">
                  {
                    data?.queryArtikelContents.map((item, i) => (
                      <div className="col-lg-3 col-md-4 col-12 py-2" key={i}>
                        <img src={item.data.photo != null ? item.data.photo.iv : ""} width="100%" style={{aspectRatio:'4/3', objectFit:'cover', borderRadius:'10px 10px 0 0'}}></img>
                        <div className="cardArticle p-4" >
                          <h1 className="cardArticleTitle">{item.data.judul.iv}</h1>
                          {/* <a className="cardDate my-2">{item.data.date != null ? item.data.date.iv : ''}</a> */}
                          <div className="cardArticleText mb-1" style={{maxHeight:'90px'}}>
                            <div dangerouslySetInnerHTML={{ __html: item.data.content.iv }} />
                          </div>
                          <div className="row pt-3">
                            <div className="col-lg-6">
                              {/* <Icon
                                icon="mdi:eye"
                                className="ms-1 align-self-center"
                                style={{
                                  cursor: "pointer",
                                  fontSize: "16px",
                                  color: "#8D8D8D",
                                }}
                              /> */}
                            </div>
                            <div className="col-lg-6 align-self-center text-end" style={{ cursor: "pointer", fontSize: "16px", color: "#8D8D8D" }}
                              onClick={() => deleteArticle(item.id)}>
                              <Icon
                                icon="material-symbols:delete"
                                className="ms-1 align-self-center"
                                style={{
                                  cursor: "pointer",
                                  fontSize: "16px",
                                  color: "#8D8D8D"
                                }}
                              ></Icon>
                              <span className="pt-2">Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                :
                <BigCard className="col my-2">
                  {/* <form className=""> */}
                  <div className="py-2">

                  </div>
                  <div className="row">
                    <div className="col-lg-7 p-2">
                      <label><b>Judul Artikel</b></label>
                      <Input placeholder="Judul Artikel Anda" onChange={(e) => setjudul(e.target.value)} />
                      {/* <label className="mt-3"><b>Link</b></label>
                      <Input placeholder="judul-artikel-yang-anda-tulis" onChange={(e) => setlink(e.target.value)}/> */}
                      {/* <label className="mt-3"><b>Tanggal</b></label><br></br>
                      <DatePicker
                      className=""
                      style={{width:'100%'}}
                      placeholder="Pilih Tanggal"
                      format="DD-MM-YY"
                      onChange={onChangeDate}
                      disabledDate={disabledDate}
                    /> */}
                    </div>
                    <div className="col-lg-5 p-2">
                      <div className="image-upload text-center">
                        <label htmlFor="avatar">
                          {imagePreview ?
                            <img src={imagePreview} width={250} height={125} className="img-upload" alt="uploaRd" style={{ objectFit: 'cover' }} />
                            :
                            <>
                              <Image src="/images/upload.svg" width={250} height={125} alt="upload" />
                              <div className="text-center mt-2 tap">Tap to Upload Photo</div>
                            </>
                          }
                        </label>
                        <input
                          id="avatar"
                          type="file"
                          // name="avatar"
                          accept="image/png, image/jpeg"
                          onChange={(event) => {
                            const img = event.target.files[0];
                            setImagePreview(URL.createObjectURL(img));
                            return setImage(img);
                          }}
                        />
                      </div>

                    </div>
                    <div className="col-12 p-2" >
                      <label><b>Konten</b></label><br></br>
                      {/* <div className="p-2" style={{border:'1px solid #ddd', minHeight:'50vh'}}> */}
                      {/* <Editor
                        // editorState={editorState}
                        initialContentState={contentState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onContentStateChange={setcontentState}
                        // onEditorStateChange={setEditorState}
                      /> */}
                      <Editor
                        apiKey="yb7nbucxamekcoxt82en93nnuzub68521603grazs6vd5pan"
                        onInit={(evt, editor) => editorRef.current = editor}
                        // initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                          height: 300,
                          menubar: false,
                          plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                          ],
                          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments |  align lineheight | checklist numlist bullist indent outdent',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                      />
                      {/* </div> */}
                    </div>
                    <button onClick={onSubmit} className="button my-5">Upload Artikel</button>
                  </div>
                  {/* </form> */}
                </BigCard>
              :
              <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
          }
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const StyledTitle = styled.div`
  color: #433b3b;
  font-size: var(--fs-24);
  font-family: Poppins;
  font-weight: 600;

  margin: 1% 0;
`;

const BigCard = styled.div`
  border-radius: 0.625rem;
  box-shadow: 0px 0.375rem 1.25rem 0px rgba(192, 192, 192, 0.25);
  padding: 1.5rem;
  min-height: 32rem;
  background-color: #ffffff;
`;

export default ArticleDashboard;