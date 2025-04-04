import React, { useState, useEffect } from 'react'
import api from '../../../../util/api'
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

const Programs = () => {
    const [visibleProgram, setVisibleProgram] = useState(false)
    const [visibleCourse, setVisibleCourse] = useState(false)
    const [visibleModule, setVisibleModule] = useState(false)
    const [programs, setPrograms] = useState([])
    const [courses, setCourses] = useState([])
    const [modules, setModules] = useState([])
    const [selectedProgramId, setSelectedProgramId] = useState(null)
    const [programTitle, setProgramTitle] = useState('')
    const [programDescription, setProgramDescription] = useState('')
    const [courseTitle, setCourseTitle] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [moduleTitle, setModuleTitle] = useState('')
    const [moduleDescription, setModuleDescription] = useState('')
    const [selectedCourseId, setSelectedCourseId] = useState(null)

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await api.get(`/api/programs`)
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
                const response = await api.get(`/api/courses`)
                setCourses(response.data.data)
            } catch (error) {
                console.error('Error fetching courses:', error)
            }
        }
        fetchCourses()
    }, [])

    const handleSaveProgram = async () => {
        try {
            const response = await api.post(`/api/programs`, {
                title: programTitle,
                description: programDescription,
            })

            const newProgram = response.data.data
            setPrograms((prev) => [...prev, newProgram])

            setProgramTitle('')
            setProgramDescription('')
            setVisibleProgram(false)
        } catch (error) {
            console.error('Error adding program:', error)
        }
    }

    const handleSaveCourse = async () => {
        try {
            const response = await api.post('/api/courses', {
                title: courseTitle,
                description: courseDescription,
                program_id: selectedProgramId,
            })

            console.log('Course saved:', response.data)
            setCourses([...courses, response.data])
            setVisibleCourse(false)
        } catch (error) {
            console.error('Error saving course:', error)
        }
    }

    const handleSaveModule = async () => {
        try {
            const response = await api.post('/api/modules', {
                title: moduleTitle,
                description: moduleDescription,
                course_id: selectedCourseId,
            })
            console.log('Module saved:', response.data)
            setModules([...modules, response.data])
            setVisibleModule(false)
        } catch (error) {
            console.error('Error saving module:', error)
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
                                                    <CTableHeaderCell>Actions</CTableHeaderCell>
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
                                                                <CButton
                                                                    color="success"
                                                                    onClick={() => {
                                                                        setSelectedCourseId(
                                                                            course.id,
                                                                        )
                                                                        setVisibleModule(true)
                                                                    }}
                                                                >
                                                                    Add Module
                                                                </CButton>
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

            {/* Add Module Modal */}
            <CModal size="xl" visible={visibleModule} onClose={() => setVisibleModule(false)}>
                <CModalHeader>
                    <CModalTitle>Add Module to Course</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel>Module Title</CFormLabel>
                                <CFormInput
                                    value={moduleTitle}
                                    onChange={(e) => setModuleTitle(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel>Module Description</CFormLabel>
                                <CFormTextarea
                                    value={moduleDescription}
                                    onChange={(e) => setModuleDescription(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleModule(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleSaveModule}>
                        Save Module
                    </CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )
}

export default Programs
