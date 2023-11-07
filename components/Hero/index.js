import Link from 'next/link'
import React from 'react'
import Button from '../Button'
// import i18n from '../../i18n';

function Hero() {
  return (
    <section className='hero-wrapper' id='hero'>
      <div className='container-fluid'>
        <div className='row justify-content-between'>
          <div className='col-lg-7 col-md-6 col-12 align-self-center hero-left' id='about'>
            <h3 className='hero-title'>Keharmonisan Keluarga Dimulai dari Kehamilan yang Sehat</h3>
            <p className='hero-text my-4'>
              Percayakan kehamilanmu hingga kelahiran buah hati kepada ahlinya sekarang juga!
            </p>
            <div className="hero-btn-wrapper">
              <Button link="/doctor" text="Booking Sekarang"></Button>
            </div>
          </div>
          <div className='col-lg-5 col-md-6 col-12 align-self-center hero-right'>
            <img src='/images/hero.png' width="100%"></img>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
