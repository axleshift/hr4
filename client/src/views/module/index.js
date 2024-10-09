import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardGroup,
    CCardHeader,
    CCardImage,
    CCardLink,
    CCardSubtitle,
    CCardText,
    CCardTitle,
    CListGroup,
    CListGroupItem,
    CNav,
    CNavItem,
    CNavLink,
    CCol,
    CRow,
} from '@coreui/react'

import ReactImg from 'src/assets/images/react.jpg'

const DashboardTest = () => {
    //Variable or Placeholder para ma call
    const [slides, setSlides] = useState([
        {
            id: 1,
            imgSrc: ReactImg,
            label: 'First slide label',
            description: 'Some representative placeholder content for the first slide.',
        },
    ])

    //ADD BUTTON
    const addSlide = () => {
        const newSlideId = slides.length + 1
        const newSlide = {
            id: newSlideId,
            imgSrc: VueImg, // Replace this with any dynamic image source or use different images
            label: `Slide ${newSlideId} label`,
            description: `TITE ${newSlideId}.`,
        }
        setSlides([...slides, newSlide])
    }

    //DELETE BUTTON
    const removeLastSlide = () => {
        if (slides.length > 1) {
            setSlides(slides.slice(0, -1)) // Remove the last slide
        }
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>MODULES</strong>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <CButton color="primary" className="me-md-2" onClick={addSlide}>
                                ADD MODULE
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CCard style={{ width: '18rem' }}>
                            <CCardImage orientation="top" src={ReactImg} />
                            <CCardBody>
                                <CCardTitle>Card title</CCardTitle>
                                <CCardText>
                                    Some quick example text to build on the card title and make up
                                    the bulk of the card&#39;s content.
                                </CCardText>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <CButton color="primary" className="me-md-2" onClick={addSlide}>
                                        EDIT
                                    </CButton>
                                    <CButton color="primary" className="me-md-2" onClick={addSlide}>
                                        DELETE
                                    </CButton>
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default DashboardTest
