import React, { useState } from 'react'
import {
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CCol,
    CTable,
    CTableBody,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTableDataCell,
    CForm,
    CFormInput,
    CFormLabel,
} from '@coreui/react'

const TrainingDelivery = () => {
    const [visibleXL, setVisibleXL] = useState(false)
    const [visibleTargetAudience, setVisibleTargetAudience] = useState(false)
    const [visibleCourse, setVisibleCourse] = useState(false)

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Training Program Details</strong>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <CButton color="primary" onClick={() => setVisibleXL(true)}>
                                Add Program
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CAccordion alwaysOpen>
                            <CAccordionItem>
                                <CAccordionHeader>Leadership Development Program</CAccordionHeader>
                                <CAccordionBody>
                                    <CRow>
                                        <CCol xs={12}>
                                            <CTable bordered>
                                                <CTableHead>
                                                    <CTableRow>
                                                        <CTableHeaderCell>
                                                            Description
                                                        </CTableHeaderCell>
                                                    </CTableRow>
                                                </CTableHead>
                                                <CTableBody>
                                                    <CTableRow>
                                                        <CTableDataCell>
                                                            A program designed to enhance leadership
                                                            skills.
                                                        </CTableDataCell>
                                                    </CTableRow>
                                                </CTableBody>
                                                <CTableHead>
                                                    <CTableRow>
                                                        <CTableHeaderCell>
                                                            Program Objectives
                                                        </CTableHeaderCell>
                                                    </CTableRow>
                                                </CTableHead>
                                                <CTableBody>
                                                    <CTableRow>
                                                        <CTableDataCell>
                                                            The goals or outcomes expected from the
                                                            program
                                                        </CTableDataCell>
                                                    </CTableRow>
                                                </CTableBody>
                                            </CTable>
                                        </CCol>
                                    </CRow>
                                    <CAccordion alwaysOpen className="mt-3">
                                        <CAccordionItem>
                                            <CAccordionHeader>Target Audience</CAccordionHeader>
                                            <CAccordionBody>
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
                                                    <CButton
                                                        color="primary"
                                                        size="sm"
                                                        onClick={() =>
                                                            setVisibleTargetAudience(true)
                                                        }
                                                    >
                                                        Add Audience
                                                    </CButton>
                                                </div>
                                                <CTable bordered>
                                                    <CTableHead>
                                                        <CTableRow>
                                                            <CTableHeaderCell>
                                                                Target Audience
                                                            </CTableHeaderCell>
                                                        </CTableRow>
                                                    </CTableHead>
                                                    <CTableBody>
                                                        <CTableRow>
                                                            <CTableDataCell>
                                                                Mid-level Managers
                                                            </CTableDataCell>
                                                        </CTableRow>
                                                    </CTableBody>
                                                </CTable>
                                            </CAccordionBody>
                                        </CAccordionItem>
                                    </CAccordion>
                                    <CAccordion alwaysOpen className="mt-3">
                                        <CAccordionItem>
                                            <CAccordionHeader>Courses</CAccordionHeader>
                                            <CAccordionBody>
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
                                                    <CButton
                                                        color="primary"
                                                        size="sm"
                                                        onClick={() =>
                                                            setVisibleTargetAudience(true)
                                                        }
                                                    >
                                                        Add Course
                                                    </CButton>
                                                </div>
                                                <CAccordion alwaysOpen>
                                                    <CAccordionItem>
                                                        <CAccordionHeader>
                                                            Effective Communication Skills
                                                        </CAccordionHeader>
                                                        <CAccordionBody>
                                                            <CTable bordered>
                                                                <CTableHead>
                                                                    <CTableRow>
                                                                        <CTableHeaderCell>
                                                                            Course Details
                                                                        </CTableHeaderCell>
                                                                    </CTableRow>
                                                                </CTableHead>
                                                                <CTableBody>
                                                                    <CTableRow>
                                                                        <CTableDataCell>
                                                                            <strong>
                                                                                Description:
                                                                            </strong>{' '}
                                                                            A course to enhance
                                                                            verbal and written
                                                                            communication.
                                                                        </CTableDataCell>
                                                                    </CTableRow>
                                                                    <CTableRow>
                                                                        <CTableDataCell>
                                                                            <strong>
                                                                                Objectives:
                                                                            </strong>{' '}
                                                                            Improve communication
                                                                            clarity and
                                                                            effectiveness.
                                                                        </CTableDataCell>
                                                                    </CTableRow>
                                                                    <CTableRow>
                                                                        <CTableDataCell>
                                                                            <strong>
                                                                                Duration:
                                                                            </strong>{' '}
                                                                            3 hours
                                                                        </CTableDataCell>
                                                                    </CTableRow>
                                                                    <CTableRow>
                                                                        <CTableDataCell>
                                                                            <strong>
                                                                                Materials:
                                                                            </strong>{' '}
                                                                            Videos, PDFs, slides
                                                                        </CTableDataCell>
                                                                    </CTableRow>
                                                                </CTableBody>
                                                            </CTable>
                                                        </CAccordionBody>
                                                    </CAccordionItem>
                                                </CAccordion>
                                            </CAccordionBody>
                                        </CAccordionItem>
                                    </CAccordion>
                                </CAccordionBody>
                            </CAccordionItem>
                        </CAccordion>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default TrainingDelivery
