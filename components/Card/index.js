import React from 'react'

function Card({title, text}) {
  return (
    <div className='card' data-aos="fade-up">
        <h3 className='cardTitle'>{title}</h3>
        <div className='col-lg-7'>
        <img className='my-2' src='/images/star.png' width="50%"></img>
        </div>
        <p className='cardText'>{text}</p>
    </div>
  )
}

export default Card