import React, {useEffect} from 'react'
import AOS from 'aos';

function VideoSection() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className='container py-5 my-5'>
      <div className='row justify-content-center text-center'>
        <div className='col-xl-10 col-12'>
          <h1 className='video-title mb-4'>Tonton Sekarang</h1>
          <iframe className='video' data-aos="fade-up" src="https://www.youtube.com/embed/U3WYS2pgUVI?si=q4UQs_kEMx1UMXte" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  )
}

export default VideoSection
