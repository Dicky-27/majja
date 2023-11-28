import React from "react";
import BacaSelengkapnya from "../BacaSelengkapnya";

function CardLayanan({ text, title, image, link }) {
  return (
    <div className="cardLayanan p-4">
      <div className="row justify-content-center align-self-center mb-3">
        <div className="col-auto">
          <img src={image} width="48px" height="48px" alt="Layanan Image"></img>
        </div>

        <div className="col cardLayananTitle align-self-center">{title}</div>
      </div>
      <div className="cardLayananArticle py-2">{text}</div>
      <BacaSelengkapnya link={link} color={"#DF3034"}></BacaSelengkapnya>
    </div>
  );
}

export default CardLayanan;
