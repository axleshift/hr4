import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardTitle,
    CCardText,
    CCardImage,
    CCol,
    CContainer,
    CRow,
    CNavbar,
    CNavbarBrand,
    CNavbarNav,
    CNavLink,
    CHeader,
    CHeaderNav,
    CFooter,
} from '@coreui/react'
import AirImg from 'src/assets/images/Air.jpg'
import LandImg from 'src/assets/images/Land.jpg'
import SeaImg from 'src/assets/images/Sea.jpg'
import BgImg from 'src/assets/images/FreightBG.png'

const LandingPage1 = () => {
    return (
        <>
            {/* Header */}
            <CCard>
                <CHeader position="sticky" className="justify-content-end" color="dark">
                    <CButton className="me-2" color="light" shape="rounded-pill">
                        Login
                    </CButton>
                    <CButton color="light" shape="rounded-pill">
                        Register
                    </CButton>
                </CHeader>
                {/* Hero Section */}
                <section
                    className="hero-section text-center text-white py-5"
                    style={{
                        backgroundImage: `url(${BgImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <CContainer>
                        <h1>GGP Logistics Services</h1>
                        <p className="lead">
                            With GGP Logistics, you will get what you really deserve, as we handle
                            your cargo with Honesty, Professionalism, and Transparency.
                        </p>
                    </CContainer>

                    {/* Features Section */}
                    <CContainer id="features" className="my-5">
                        <h2 className="text-center">Freight</h2>
                        <CRow className="text-center">
                            <CCol md={4}>
                                <CCard>
                                    <CCardImage orientation="top" src={AirImg} />
                                    <CCardBody>
                                        <CCardTitle>Air</CCardTitle>
                                        <CCardText>Description</CCardText>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol md={4}>
                                <CCard>
                                    <CCardImage orientation="top" src={LandImg} />
                                    <CCardBody>
                                        <CCardTitle>Land</CCardTitle>
                                        <CCardText>Description</CCardText>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol md={4}>
                                <CCard>
                                    <CCardImage orientation="top" src={SeaImg} />
                                    <CCardBody>
                                        <CCardTitle>Sea</CCardTitle>
                                        <CCardText>Description</CCardText>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CContainer>

                    {/* Call to Action */}
                    <section className="text-center py-5">
                        <CContainer>
                            <CButton color="light" size="lg">
                                Learn More
                            </CButton>
                        </CContainer>
                    </section>
                </section>
                {/* Footer */}
                <CFooter color="dark">
                    <CContainer>
                        <h1>About</h1>
                    </CContainer>
                </CFooter>
            </CCard>
        </>
    )
}

export default LandingPage1
