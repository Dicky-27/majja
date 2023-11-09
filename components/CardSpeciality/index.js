import React from "react";

function CardSpeciality({ caption, title, image }) {
  return (
    <div className="cardSpeciality d-flex flex-column justify-content-center align-items-center px-3 py-4 text-center">
      <div className="col-3 align-self-center">
        <img src={image} width="100%"></img>
      </div>
      <div className="cardLayananTitle align-self-center pt-4">
        {title}
      </div>
      <div className="cardSpecialityCaption pt-2">{caption}</div>
    </div>
  );
}

export default CardSpeciality;
