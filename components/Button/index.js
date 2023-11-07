import Link from 'next/link'
import React from 'react'

function Button({link, text}) {
  return (
    <Link href={link}>
    <button className='button'>{text}</button>
    </Link>
  )
}

export default Button