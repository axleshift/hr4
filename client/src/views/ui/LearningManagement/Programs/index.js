import React, { useState, useEffect } from 'react'
import api from '../../../../util/api'
import {
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
    CFormTextarea,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
    CTable,
    CTableBody,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
} from '@coreui/react'

const Programs = () => {
    const [programs, setPrograms] = useState([])
    const [courses, setCourses] = useState([])
    const [programTitle, setProgramTitle] = useState('')
    const [programDescription, setProgramDescription] = useState('')
    const [courseTitle, setCourseTitle] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [module, setModule] = useState({ title: '', description: '', file: null })
    const [selectedCourseId, setSelectedCourseId] = useState(null)

    const [visibleProgram, setVisibleProgram] = useState(false)
    const [visibleCourse, setVisibleCourse] = useState(false)
    const [visibleModule, setVisibleModule] = useState(false)
    const [modules, setModules] = useState([])

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

    const fetchCourses = async (programId) => {
        try {
            const response = await api.get(`/api/courses?program_id=${programId}`)
            setCourses(response.data.data)
        } catch (error) {
            console.error('Error fetching courses:', error)
        }
    }

    const fetchModules = async (courseId) => {
        try {
            const response = await api.get(`/api/modules?course_id=${courseId}`)
            setModules(response.data.data)
        } catch (error) {
            console.error('Error fetching modules:', error)
        }
    }

    const handleSaveProgram = async () => {
        try {
            const response = await api.post(`/api/programs`, {
                title: programTitle,
                description: programDescription,
            })

            setPrograms((prev) => [...prev, response.data.data])
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
                program_id: selectedCourseId,
            })

            setCourses((prevCourses) => [...prevCourses, response.data])
            setVisibleCourse(false)
        } catch (error) {
            console.error('Error saving course:', error)
        }
    }

    const handleModuleInputChange = (e) => {
        const { id, value } = e.target
        setModule((prev) => ({ ...prev, [id]: value }))
    }

    const handleModuleFileChange = (e) => {
        setModule((prev) => ({ ...prev, file: e.target.files[0] }))
    }

    const handleAddModule = async () => {
        const formData = new FormData()

        formData.append('title', module.title)
        formData.append('description', module.description)
        formData.append('course_id', selectedCourseId)

        if (module.file) {
            formData.append('file', module.file)
        }

        try {
            const response = await api.post('/api/modules', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            setModules((prevModules) => [...prevModules, response.data.data])
            setModule({ title: '', description: '', file: null })
            setVisibleModule(false)
        } catch (error) {
            console.error('Error uploading module:', error)
        }
    }

    const handleOpenModuleModal = (courseId) => {
        setSelectedCourseId(courseId)
        setVisibleModule(true)
        fetchModules(courseId) // Fetch modules for the selected course
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
                                            fetchCourses(program.id) // Fetch courses when a program is clicked
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
                                                setSelectedCourseId(program.id)
                                                setVisibleCourse(true)
                                            }}
                                        >
                                            Add Course
                                        </CButton>

                                        {/* Table for Courses under the Program */}
                                        <CTable striped className="mt-3">
                                            <CTableHead>
                                                <CTableRow>
                                                    <CTableHeaderCell>
                                                        Course Title
                                                    </CTableHeaderCell>
                                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                                    <CTableHeaderCell>Modules</CTableHeaderCell>
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
                                                                <ul className="mb-0">
                                                                    {modules
                                                                        .filter(
                                                                            (m) =>
                                                                                m.course_id ===
                                                                                course.id,
                                                                        )
                                                                        .map((mod) => (
                                                                            <li key={mod.id}>
                                                                                <strong>
                                                                                    {mod.title}
                                                                                </strong>{' '}
                                                                                - {mod.description}{' '}
                                                                                {mod.file_url && (
                                                                                    <>
                                                                                        [
                                                                                        <a
                                                                                            href={
                                                                                                mod.file_url
                                                                                            }
                                                                                            target="_blank"
                                                                                            rel="noopener noreferrer"
                                                                                        >
                                                                                            {mod.file_name ||
                                                                                                'Download'}
                                                                                        </a>
                                                                                        ]
                                                                                    </>
                                                                                )}
                                                                            </li>
                                                                        ))}
                                                                    {modules.filter(
                                                                        (m) =>
                                                                            m.course_id ===
                                                                            course.id,
                                                                    ).length === 0 && (
                                                                        <li>
                                                                            No modules available
                                                                        </li>
                                                                    )}
                                                                </ul>
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                <CButton
                                                                    color="success"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleOpenModuleModal(
                                                                            course.id,
                                                                        )
                                                                    }
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
                    <CButton
                        color="primary"
                        onClick={handleSaveCourse}
                        disabled={!courseTitle || !courseDescription}
                    >
                        Save Course
                    </CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )
}

export default Programs
