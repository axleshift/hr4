import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
    const [slides, setSlides] = useState([])

    // Fetch announcements from the backend
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/announcement') // Adjust URL as necessary

                const formattedSlides = response.data.data.map((announcement) => ({
                    id: announcement.id,
                    imgSrc: ReactImg, // Use a dynamic image source as needed
                    label: announcement.title,
                    description: announcement.content,
                }))

                setSlides(formattedSlides)
            } catch (error) {
                console.error('Error fetching announcements:', error)
            }
        }

        fetchAnnouncements()
    }, [])

    // ADD BUTTON
    const addSlide = async () => {
        const newSlideId = slides.length + 1
        const newSlide = {
            title: `Slide ${newSlideId} label`,
            content: `TITLE ${newSlideId}.`,
        }

        try {
            const response = await axios.post('http://localhost:8000/api/announcement', newSlide, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const createdSlide = {
                id: newSlideId,
                imgSrc: VueImg, // Use a different image or source dynamically
                label: newSlide.title,
                description: newSlide.content,
            }

            setSlides([...slides, createdSlide])
        } catch (error) {
            console.error('Error adding slide:', error)
        }
    }

    // DELETE BUTTON
    const removeLastSlide = async () => {
        if (slides.length > 0) {
            const lastSlideId = slides[slides.length - 1].id

            try {
                await axios.delete(`http://localhost:8000/api/announcement/${lastSlideId}`)

                // Update the state to remove the last slide from the array
                setSlides(slides.slice(0, -1))
            } catch (error) {
                console.error('Error deleting slide:', error)
            }
        }
    }

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
                                    <img
                                        className="d-block w-100"
                                        src={slide.imgSrc}
                                        alt={slide.label}
                                    />
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
                        <CButton color="primary" onClick={removeLastSlide}>
                            DELETE
                        </CButton>
                    </div>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default DashboardTest
