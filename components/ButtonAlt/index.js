import Link from 'next/link'
import React from 'react'

function ButtonAlt({link, text}) {
  return (
    <Link href={link}>
    <button className='buttonAlt'>{text}</button>
    </Link>
  )
}

export default ButtonAlt