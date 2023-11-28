import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Table, Tag, Modal, Select } from "antd";
import moment from "moment";
import "moment/locale/id";
import { Input, Pagination, DatePicker } from "antd";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs, { recur } from "dayjs";
import { Editor } from "@tinymce/tinymce-react";
moment.locale("id");
import { useRouter } from "next/router";
import Image from "next/image";
import Cookies from "js-cookie";

const ADD_CONTENT = gql`
  mutation add(
    $judul: String
    $photo: String
    $date: String
    $content: String
    $creator: String
  ) {
    createArtikelContent(
      data: {
        judul: { iv: $judul }
        photo: { iv: $photo }
        date: { iv: $date }
        content: { iv: $content }
        creator: { iv: $creator }
      }
      status: "Published"
    ) {
      id
      flatData {
        judul
        photo
        date
        content
      }
    }
  }
`;

const GET_ARTICLES = gql`
  {
    queryArtikelContents {
      id
      data {
        judul {
          iv
        }
        slug {
          iv
        }
        photo {
          iv
        }
        date {
          iv
        }
        content {
          iv
        }
      }
    }
  }
`;

function ArticleDashboard({ updateRes }) {
  const [addTodo, test] = useMutation(ADD_CONTENT);
  const { data, error, refetch } = useQuery(GET_ARTICLES);
  const [editArticle, setEditArticle] = useState();
  const [editorState, setEditorState] = useState();
  const [contentState, setcontentState] = useState();
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [date, setDate] = useState(new Date());
  const [judul, setjudul] = useState();
  const [link, setlink] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const urlsquidex = "https://cloud.squidex.io/api/apps/artikel/assets";
  const editorRef = useRef(null);
  const creator = Cookies.get("username");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [isUpdateArticle, setIsUpdateArticle] = useState(false);
  const [currentContent, setCurrentContent] = useState();
  const [articleId, setArticleId] = useState();
  const [currentImage, setCurrentImage] = useState();

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };

  const onChangeDate = (dateChosen, dateString) => {
    setDate(dateChosen);
  };

  const onSubmit = () => {
    const uploadimg = new FormData();
    uploadimg.append("file", image);

    fetch(urlsquidex, {
      method: "POST",
      body: uploadimg,
    })
      .then((response) => response.json())
      .then((dataRes) => {
        addTodo({
          variables: {
            judul: judul,
            photo: "https://cloud.squidex.io/api/assets/artikel/" + dataRes.id,
            date: moment(date).format("DD MMMM YYYY HH:mm"),
            content: editorRef.current.getContent(),
            creator: creator,
          },
        }).then((dataRes) => {
          if (dataRes.data.createArtikelContent.id) {
            toast.success("Article Uploaded Successfully"),
              setjudul(),
              setDate(),
              setlink(),
              setImage(),
              setImagePreview();
            setEditArticle(false), refetch();
            updateRes(6);
          } else {
            toast.error("Article Upload Failed");
          }
        });
      });
  };

  const updateArticle = (image) => {
    fetch(`https://cloud.squidex.io/api/content/artikel/artikel/${articleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        judul: { iv: judul },
        photo: {
          iv: image,
        },
        date: { iv: moment(date).format("DD MMMM YYYY HH:mm") },
        content: { iv: editorRef.current.getContent() },
        creator: { iv: creator },
      }),
    }).then((dataRes) => {
      if (dataRes.status === 200) {
        toast.success("Article Updated Successfully"),
          setjudul(),
          setDate(),
          setlink(),
          setImage(),
          setImagePreview();
        setEditArticle(false), refetch();
        updateRes(6);
      } else {
        toast.error("Article Update Failed");
      }
    });
  };

  const onUpdate = () => {
    if (currentImage !== imagePreview) {
      const uploadimg = new FormData();
      uploadimg.append("file", image);

      console.log(uploadimg);

      fetch(urlsquidex, {
        method: "POST",
        body: uploadimg,
      })
        .then((response) => response.json())
        .then((dataRes) => {
          updateArticle(
            "https://cloud.squidex.io/api/assets/artikel/" + dataRes.id
          );
        });
    } else {
      updateArticle(currentImage);
    }
  };

  const handleUpdateArticle = (judul, image, content, id) => {
    setEditArticle(true);
    setjudul(judul);
    setImagePreview(image);
    setCurrentImage(image);
    setCurrentContent(content);
    setIsUpdateArticle(true);
    setArticleId(id);
  };

  useEffect(() => {
    setLoading(true);
    if (!Cookies.get("token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  const deleteArticle = (id) => {
    axios
      .delete(`https://cloud.squidex.io/api/content/artikel/artikel/` + id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status == 204) {
          toast.success("Delete Article Successful!");
          refetch();
          updateRes(6);
        } else {
          toast.success("Failed to Delete Article");
        }
      });
  };

  const openDeleteModal = (articleId) => {
    setSelectedArticleId(articleId);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedArticleId(null);
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteArticle(selectedArticleId);
    setModalOpen(false);
  };

  return (
    <>
      <Wrapper className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-12">
            <StyledTitle>Articles</StyledTitle>
          </div>
          <div className="col-md-6 col-12 text-end align-self-center">
            {!editArticle ? (
              <button
                className="button py-2 px-4"
                onClick={() => setEditArticle(true)}
              >
                + Artikel Baru
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row">
          <div>
            {!loading ? (
              !editArticle ? (
                <div className="row my-3">
                  {data?.queryArtikelContents.map((item, i) => (
                    <div className="col-lg-3 col-md-4 col-12 py-2" key={i}>
                      <img
                        src={item.data.photo != null ? item.data.photo.iv : ""}
                        width="100%"
                        style={{
                          aspectRatio: "4/3",
                          objectFit: "cover",
                          borderRadius: "10px 10px 0 0",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleUpdateArticle(
                            item.data.judul.iv,
                            item.data.photo != null ? item.data.photo.iv : "",
                            item.data.content.iv,
                            item.id
                          )
                        }
                      ></img>
                      <div className="cardArticle d-flex flex-column justify-content-between p-4">
                        <div>
                          <h1
                            className="cardArticleTitle"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleUpdateArticle(
                                item.data.judul.iv,
                                item.data.photo != null
                                  ? item.data.photo.iv
                                  : "",
                                item.data.content.iv,
                                item.id
                              )
                            }
                          >
                            {item.data.judul.iv}
                          </h1>
                          <div
                            className="cardArticleText mb-1"
                            style={{ maxHeight: "90px", cursor: "pointer" }}
                            onClick={() =>
                              handleUpdateArticle(
                                item.data.judul.iv,
                                item.data.photo != null
                                  ? item.data.photo.iv
                                  : "",
                                item.data.content.iv,
                                item.id
                              )
                            }
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.data.content.iv,
                              }}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between pt-3">
                          <div>
                            {/* TODO: hide after views api is ready
                            <Icon
                                icon="mdi:eye"
                                className="ms-1 align-self-center"
                                style={{
                                  cursor: "pointer",
                                  fontSize: "16px",
                                  color: "#8D8D8D",
                                }}
                              /> */}
                          </div>
                          <div
                            className="align-self-center text-end"
                            style={{
                              cursor: "pointer",
                              fontSize: "16px",
                              color: "#8D8D8D",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onClick={() => openDeleteModal(item.id)}
                          >
                            <Icon
                              icon="material-symbols:delete"
                              className="align-self-center"
                              style={{
                                cursor: "pointer",
                                fontSize: "16px",
                                color: "#8D8D8D",
                              }}
                            ></Icon>
                            <span style={{ lineHeight: "16px" }}>Delete</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <BigCard className="col my-2">
                  <div className="py-2"></div>
                  <div className="row">
                    <div className="col-lg-7 p-2">
                      <label>
                        <b>Judul Artikel</b>
                      </label>
                      <Input
                        placeholder="Judul Artikel Anda"
                        value={judul}
                        onChange={(e) => setjudul(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-5 p-2">
                      <div className="image-upload text-center">
                        <label htmlFor="avatar">
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              width={250}
                              height={125}
                              className="img-upload"
                              alt="uploaRd"
                              style={{ objectFit: "cover" }}
                            />
                          ) : (
                            <>
                              <Image
                                src="/images/upload.svg"
                                width={250}
                                height={125}
                                alt="upload"
                              />
                              <div className="text-center mt-2 tap">
                                Tap to Upload Photo
                              </div>
                            </>
                          )}
                        </label>
                        <input
                          id="avatar"
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={(event) => {
                            const img = event.target.files[0];
                            setImagePreview(URL.createObjectURL(img));
                            return setImage(img);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-12 p-2">
                      <label>
                        <b>Konten</b>
                      </label>
                      <br></br>
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
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={currentContent}
                        init={{
                          height: 300,
                          menubar: false,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments |  align lineheight | checklist numlist bullist indent outdent",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                      />
                      {/* </div> */}
                    </div>
                    <button
                      onClick={isUpdateArticle ? onUpdate : onSubmit}
                      className="button my-5"
                    >
                      {isUpdateArticle ? "Update Article" : "Upload Article"}
                    </button>
                  </div>
                  {/* </form> */}
                </BigCard>
              )
            ) : (
              <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
        </div>
      </Wrapper>
      <Modal
        centered
        open={modalOpen}
        footer={null}
        closable={false}
        bodyStyle={{ borderRadius: "10px" }}
      >
        <div className="col">
          <h5 className="modalConfirmTitle">
            Anda yakin ingin menghapus artikel ini secara permanen?
          </h5>
          <div className="text-end pt-5">
            <ModalButtonCancel
              className="batalkan me-3"
              onClick={() => closeDeleteModal()}
            >
              Batalkan
            </ModalButtonCancel>
            <ModalButtonDelete
              className="ok"
              onClick={() => handleDeleteConfirm()}
            >
              Hapus
            </ModalButtonDelete>
          </div>
        </div>
      </Modal>
    </>
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

const ModalButtonDelete = styled.a`
  color: #df3034;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
`;

const ModalButtonCancel = styled.a`
  color: #262626;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`;

export default ArticleDashboard;
