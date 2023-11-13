import React from "react";
import styled from "styled-components";

function Card({ title, text, starCount }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(
        <img key={i} src="/images/ic-star.svg" alt={`star-${i + 1}`} />
      );
    }
    return stars;
  };

  return (
    <Wrapper>
      <div data-aos="fade-up">
        <h3 className="cardTitle">{title}</h3>
        <div className="flex pb-3">
          <div className="star-container">{renderStars()}</div>
          <p className="cardText star-count">{starCount}</p>
        </div>
        <p className="cardText">{text}</p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .flex {
    display: flex;
    align-items: center;
  }

  .star-container {
    display: flex;
    align-items: start;
    margin-right: 8px;
  }

  .star-icon {
    margin-right: 2px;
  }

  .star-count {
    margin: 0px;
  }

  .cardReview {
    min-height: 300px;
  }
`;

export default Card;
