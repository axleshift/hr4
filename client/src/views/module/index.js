import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CCol,
  CRow,
} from '@coreui/react'
import ReactImg from 'src/assets/images/react.jpg'
import VueImg from 'src/assets/images/vue.jpg'



const DashboardTest = () => {

  //Variable or Placeholder para ma call
  const [slides, setSlides] = useState([
    {
      id: 1,
      imgSrc: ReactImg,
      label: 'First slide label',
      description: 'Some representative placeholder content for the first slide.',
    },
  ]);

  //ADD BUTTON
  const addSlide = () => {
    const newSlideId = slides.length + 1;
    const newSlide = {
      id: newSlideId,
      imgSrc: VueImg,  // Replace this with any dynamic image source or use different images
      label: `Slide ${newSlideId} label`,
      description: `TITE ${newSlideId}.`,
    };
    setSlides([...slides, newSlide]);
  };

  //DELETE BUTTON
  const removeLastSlide = () => {
    if (slides.length > 1) {
      setSlides(slides.slice(0, -1)); // Remove the last slide
    }
  };
  
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Announcement</strong>
            </CCardHeader>
            <CCardBody>
                <CCarousel controls indicators>
                {slides.map((slide) => (
                  <CCarouselItem key={slide.id}>
                    <img className="d-block w-100" src={ReactImg} alt="slide 1" />
                    <CCarouselCaption className="d-none d-md-block">
                      <h5>{slide.label}</h5>
                      <p>{slide.description}</p>
                    </CCarouselCaption>
                  </CCarouselItem>
                  ))}
                </CCarousel>
            </CCardBody>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton color="primary" className="me-md-2" onClick={addSlide}>
                  ADD
                </CButton>
                <CButton color="primary">UPDATE</CButton>
                <CButton color="primary" onClick={removeLastSlide}>DELETE</CButton>
              </div>
          </CCard>
        </CCol>
      </CRow>
    )
  }
  
  export default DashboardTest