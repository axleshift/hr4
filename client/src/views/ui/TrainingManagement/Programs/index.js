import React, { useState } from 'react'
import {
    CFormTextarea,
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
    const [visibleProgram, setVisibleProgram] = useState(false)
    const [visibleTargetAudience, setVisibleTargetAudience] = useState(false)
    const [visibleCourse, setVisibleCourse] = useState(false)

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>List of Program</strong>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <CButton color="primary" onClick={() => setVisibleProgram(true)}>
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
                                                            Program Description
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
                                                <strong>List of Courses</strong>
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
                                                    <CButton
                                                        color="primary"
                                                        size="sm"
                                                        onClick={() => setVisibleCourse(true)}
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

            {/*ADD PROGRAM FORM*/}

            <CModal size="xl" visible={visibleProgram} onClose={() => setVisibleProgram(false)}>
                <CModalHeader onClose={() => setVisibleProgram(false)}>
                    <CModalTitle>Add Program</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel htmlFor="programTitle">Program Title</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="programTitle"
                                    placeholder="Enter program title"
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel htmlFor="programDescription">
                                    Program Description
                                </CFormLabel>
                                <CFormTextarea
                                    id="programDescription"
                                    rows="3"
                                    placeholder="Enter program description"
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel htmlFor="programGoal">Program Goal</CFormLabel>
                                <CFormTextarea
                                    id="programGoal"
                                    rows="3"
                                    placeholder="Enter program goal"
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleProgram(false)}>
                        Close
                    </CButton>
                    <CButton color="primary">Save Program</CButton>
                </CModalFooter>
            </CModal>

            {/*ADD COURSE FORM*/}

            <CModal size="xl" visible={visibleCourse} onClose={() => setVisibleCourse(false)}>
                <CModalHeader onClose={() => setVisibleCourse(false)}>
                    <CModalTitle>Add Course</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel htmlFor="programTitle">Course Title</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="programTitle"
                                    placeholder="Enter course title"
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel htmlFor="programDescription">
                                    Course Description
                                </CFormLabel>
                                <CFormTextarea
                                    id="programDescription"
                                    rows="3"
                                    placeholder="Enter course description"
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel htmlFor="programGoal">Course Goal</CFormLabel>
                                <CFormTextarea
                                    id="programGoal"
                                    rows="3"
                                    placeholder="Enter course goal"
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel htmlFor="programGoal">Course Goal</CFormLabel>
                                <CFormTextarea
                                    id="programGoal"
                                    rows="3"
                                    placeholder="Enter course goal"
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleCourse(false)}>
                        Close
                    </CButton>
                    <CButton color="primary">Save Program</CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )
}

export default TrainingDelivery
