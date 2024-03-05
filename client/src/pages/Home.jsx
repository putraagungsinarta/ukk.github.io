import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
  <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 carimg"
          src="library.jpg"
          alt="First slide"
        />
        <Carousel.Caption className='text-white mb-6'>
          <h3>First slide label</h3>
          <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae diam eget felis consectetur interdum vel cursus turpis.</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carimg"
          src="perpus.jpg"
          alt="Second slide"
        />
        <Carousel.Caption className='text-white mb-6'>
          <h3>Second slide label</h3>
          <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae diam eget felis consectetur interdum vel cursus turpis.</h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <h2 className='text-center tnr mt-5'>Browse Our Collection</h2> <br />
    <div className='half'>
    <h5 className='mt-4 tmr tnr1'>
    Each Collection of our Global Digital Library represents a domain of human development wisdom that influences—or is influenced by—coaching. Connecting these fields of inquiry is our commitment to investigate how coaching contributes to the United Nations Action Plan for societal well-being. As a holistic system, these four pillars inform our research focus, which in turn generates our body of knowledge.
    </h5> </div> <br />

  <div className='section1 mt-5'>
    <h3>Get To Know More About Our Library</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae diam eget felis consectetur interdum vel cursus turpis. Fusce vitae odio vulputate, congue lectus a, eleifend tellus. Aenean in magna. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
  </div>

  <div className='section2 mt-5'>
    <h3>Growing More Passion About Reading Digitally</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae diam eget felis consectetur <br />interdum vel cursus turpis. Fusce vitae odio vulputate, congue lectus a, eleifend tellus. <br /> Aenean in magna. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
  </div>

    <Footer />
    </div>
  )
}