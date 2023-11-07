import React from "react";
import { dokter } from "../../DokterData";
import { Icon } from "@iconify/react";
import BacaSelengkapnya from "../../BacaSelengkapnya";
import styled from "styled-components";

function DokterTerkait() {
  return (
    <>
    <div className="col-xl-9 col-12 ps-md-5">
                <div className="row justify-content-center">
      {dokter.map((item, i) => (
        <div
          className="col-xl-5 col-md-5 col-9 m-md-4 ms-4 me-0 my-3"
          key={i}
          // data-aos="fade-up"
        >
          <img
            className="doctorImg align-self-center"
            src={"/" + item.image}
          ></img>
          {/* <Link href={`/booking/`+item.id} style={{textDecoration:'none'}}> */}
          <div className="cardDokter">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-10">
                <p className="cardDokterTitle">{item.name}</p>
                <p className="cardDokterText">{item.position}</p>
                <div className="d-flex">
                  <Icon
                    icon="fa6-solid:briefcase-medical"
                    className="me-2"
                    style={{
                      cursor: "pointer",
                      fontSize: "18px",
                      color: "#8D8D8D",
                    }}
                  />
                  <p className="cardDokterText">{item.xp}</p>
                </div>
                <BacaSelengkapnya
                  link={`/booking/` + item.id}
                  text="Booking Jadwal"
                ></BacaSelengkapnya>
              </div>
            </div>
          </div>
          {/* </Link> */}
        </div>
      ))}
      </div>
      </div>
    </>
  );
}

export default DokterTerkait;
