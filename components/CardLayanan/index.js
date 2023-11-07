import React from 'react'
import BacaSelengkapnya from '../BacaSelengkapnya'
import Link from 'next/link'

function CardLayanan({text, title, image}) {
  return (
    // <Link href="/" style={{textDecoration:'none'}}>
    <div className='cardLayanan p-3'>
        <div className='row justify-content-center'>
            <div className='col-2 align-self-center'>
                <img src={image} width="100%"></img>
            </div>
            <div className='cardLayananTitle col-10 align-self-center py-2'>
                {title}
            </div>
        </div>
        <div className='cardLayananArticle py-2'>
            {text}
        </div>
        <BacaSelengkapnya link="/services"></BacaSelengkapnya>
    </div>
    // </Link>
  )
}

export default CardLayanan