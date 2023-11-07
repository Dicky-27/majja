import React from 'react'
import CardLayanan from '../CardLayanan'
import ButtonAlt from '../ButtonAlt'

function LayananHome() {
    const layanan = [
        {
            image:'/images/services_icon/andrologi.png',
            title:'Andrologi',
            text:'Sindrom polikistik ovarium atau polycystic ovarian syndrome (PCOS) adalah gangguan hormon yang terjadi pada wanita di usia su..'
        },
        {
            image: '/images/services_icon/endometriosis.png',
            title:'Endometriosis',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
        },
        {
            image: '/images/services_icon/implantasi.png',
            title:'Implantasi & Kehamilan Dini',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
        },
        {
            image: '/images/services_icon/reproduksi_genetik.png',
            title:'Reproduksi Genetik',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
        },
        {
            image: '/images/services_icon/masalah_kesuburan.png',
            title:'Masalah Kesuburan',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
        },
        {
            image: '/images/services_icon/prakonsepsi.png',
            title:'Prakonsepsi ECS',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
        },
        {
            image: '/images/services_icon/operasi.png',
            title:'Operasi Endometriosis',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
        },
        {
            image: '/images/services_icon/stimulasi.png',
            title:'Stimulasi Ovarium',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
        },
        {
            image: '/images/services_icon/anomali.png',
            title:'Anomali Genital Wanita',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis, lorem at finibus imperdiet, erat erat tincidunt nunc'
        },
        // {
        //     title:'Endometriosis',
        //     text:'Sebuah prosedur inseminasi buatan untuk meningkatkan peluang kehamilan.'
        // },
        // {
        //     title:'Liquid Based Cytology',
        //     text:'Sebuah metode pemeriksaan untuk mendeteksi perubahan sel-sel yang bisa menjadi tanda awal kanker serviks.'
        // },
        // {
        //     title:'Kesuburan',
        //     text:'Sebuah metode pemeriksaan untuk mendeteksi perubahan sel-sel yang bisa menjadi tanda awal kanker serviks.'
        // },
        // {
        //     title:'Deteksi HPV',
        //     text:'Human Papillomavirus (HPV) dapat menyebabkan kanker pada area genital pria dan wanita.'
        // },
        // {
        //     title:'USG Transvaginal',
        //     text:'Sebuah prosedur pemeriksaan gambaran organ reproduksi wanita dengan probe kecil melalui vagina.'
        // },
    ]
  return (
    <section className='layananWrapper py-5' id='layanan'>
        <div className="container my-5">
            <h1 className='ArticleTitleHome'>Layanan Terbaik Untuk Kamu</h1>
            <div className="row">
                {
                    layanan.map((item, i) => (
                        <div className='col-xl-4 col-lg-4 col-md-6 col-12 p-4' key={i} data-aos="fade-up">
                            <CardLayanan image={item.image} title={item.title} text={item.text}></CardLayanan>
                        </div>
                    ))
                }
            </div>
            <div className="row justify-content-center my-4">
                <div className='col-12 text-center'>
                <ButtonAlt link="/services" text="Lihat Semua Layanan"></ButtonAlt>
                </div>
            </div>
        </div>
    </section>
  )
}

export default LayananHome