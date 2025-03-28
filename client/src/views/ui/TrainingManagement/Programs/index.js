import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
    CForm,
    CFormInput,
    CFormLabel,
    CTable,
    CTableBody,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
} from '@coreui/react'

const TrainingDelivery = () => {
    const [visibleProgram, setVisibleProgram] = useState(false)
    const [visibleCourse, setVisibleCourse] = useState(false)
    const [programs, setPrograms] = useState([])
    const [courses, setCourses] = useState([])
    const [selectedProgramId, setSelectedProgramId] = useState(null) // Track selected program for course addition
    const [programTitle, setProgramTitle] = useState('')
    const [programDescription, setProgramDescription] = useState('')
    const [courseTitle, setCourseTitle] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [courseDuration, setCourseDuration] = useState('')

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/programs`)
                setPrograms(response.data.data)
            } catch (error) {
                console.error('Error fetching programs:', error)
            }
        }
        fetchPrograms()
    }, [])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/courses`)
                console.log('Courses fetched:', response.data) // Log response to check structure
                setCourses(response.data.data) // Ensure correct data assignment
            } catch (error) {
                console.error('Error fetching courses:', error)
            }
        }
        fetchCourses()
    }, [])

    const handleSaveProgram = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/programs`, {
                title: programTitle,
                description: programDescription,
            })

            // Extract new program data properly
            const newProgram = response.data.data // Ensure it matches the format in state

            setPrograms((prev) => [...prev, newProgram]) // Update state immediately

            // Clear input fields
            setProgramTitle('')
            setProgramDescription('')

            // Close modal
            setVisibleProgram(false)
        } catch (error) {
            console.error('Error adding program:', error)
        }
    }

    const handleSaveCourse = async () => {
        try {
            const response = await api.post('/courses', {
                title: courseTitle,
                description: courseDescription,
                duration: courseDuration,
                program_id: selectedProgramId, // Associate course with program
            })

            console.log('Course saved:', response.data)
            setCourses([...courses, response.data])
            setVisibleCourse(false)
        } catch (error) {
            console.error('Error saving course:', error)
        }
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>List of Programs</strong>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <CButton color="primary" onClick={() => setVisibleProgram(true)}>
                                Add Program
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CAccordion alwaysOpen>
                            {programs.map((program) => (
                                <CAccordionItem key={program.id}>
                                    <CAccordionHeader
                                        onClick={() => {
                                            setSelectedProgramId(program.id) // Track the opened program
                                        }}
                                    >
                                        {program.title}
                                    </CAccordionHeader>
                                    <CAccordionBody>
                                        <p>
                                            <strong>Description:</strong> {program.description}
                                        </p>
                                        <CButton
                                            color="primary"
                                            onClick={() => {
                                                setSelectedProgramId(program.id)
                                                setVisibleCourse(true)
                                            }}
                                        >
                                            Add Course
                                        </CButton>

                                        {/* Table for Courses under the Program */}
                                        <CTable striped className="mt-3">
                                            <CTableHead>
                                                <CTableRow>
                                                    <CTableHeaderCell>Title</CTableHeaderCell>
                                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                                    <CTableHeaderCell>Duration</CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                {courses
                                                    .filter(
                                                        (course) =>
                                                            course.program_id === program.id,
                                                    )
                                                    .map((course) => (
                                                        <CTableRow key={course.id}>
                                                            <CTableDataCell>
                                                                {course.title}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {course.description}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                {course.duration}
                                                            </CTableDataCell>
                                                        </CTableRow>
                                                    ))}
                                            </CTableBody>
                                        </CTable>
                                    </CAccordionBody>
                                </CAccordionItem>
                            ))}
                        </CAccordion>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Add Program Modal */}
            <CModal size="xl" visible={visibleProgram} onClose={() => setVisibleProgram(false)}>
                <CModalHeader>
                    <CModalTitle>Add Program</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel>Program Title</CFormLabel>
                                <CFormInput
                                    value={programTitle}
                                    onChange={(e) => setProgramTitle(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel>Program Description</CFormLabel>
                                <CFormTextarea
                                    value={programDescription}
                                    onChange={(e) => setProgramDescription(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleProgram(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleSaveProgram}>
                        Save Program
                    </CButton>
                </CModalFooter>
            </CModal>

            {/* Add Course Modal */}
            <CModal size="xl" visible={visibleCourse} onClose={() => setVisibleCourse(false)}>
                <CModalHeader>
                    <CModalTitle>Add Course</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel>Course Title</CFormLabel>
                                <CFormInput
                                    value={courseTitle}
                                    onChange={(e) => setCourseTitle(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel>Course Description</CFormLabel>
                                <CFormTextarea
                                    value={courseDescription}
                                    onChange={(e) => setCourseDescription(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel>Course Duration</CFormLabel>
                                <CFormInput
                                    value={courseDuration}
                                    onChange={(e) => setCourseDuration(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleCourse(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleSaveCourse}>
                        Save Course
                    </CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )
}

export default TrainingDelivery
