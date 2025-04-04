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

    const [visibleModule, setVisibleModule] = useState(false)
    const [selectedCourseId, setSelectedCourseId] = useState(null)
    const [module, setModule] = useState({ title: '', description: '', file: null })

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
        if (module.file) formData.append('file', module.file)

        try {
            await api.post('/api/modules', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            setModule({ title: '', description: '', file: null })
            setVisibleModule(false)
        } catch (error) {
            console.error('Error uploading module:', error.response?.data || error.message)
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
                                                    <CTableHeaderCell>Module</CTableHeaderCell>
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
                                                                {course.module &&
                                                                course.module.file_url ? (
                                                                    <a
                                                                        href={
                                                                            course.module.file_url
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        {course.module.file_name ||
                                                                            'Download'}
                                                                    </a>
                                                                ) : (
                                                                    <span>No Module</span>
                                                                )}
                                                            </CTableDataCell>

                                                            <CTableDataCell>
                                                                <CButton
                                                                    size="sm"
                                                                    color={
                                                                        course.modules &&
                                                                        course.modules.length > 0
                                                                            ? 'warning'
                                                                            : 'success'
                                                                    }
                                                                    onClick={() => {
                                                                        setSelectedCourseId(
                                                                            course.id,
                                                                        )
                                                                        setVisibleModule(true)
                                                                    }}
                                                                >
                                                                    {course.modules &&
                                                                    course.modules.length > 0
                                                                        ? 'Edit Module'
                                                                        : 'Add Module'}
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
                    <CModalTitle>Add Module</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormLabel>Module Title</CFormLabel>
                        <CFormInput
                            id="title"
                            value={module.title}
                            onChange={handleModuleInputChange}
                        />
                        <CFormLabel className="mt-3">Module Description</CFormLabel>
                        <CFormTextarea
                            id="description"
                            value={module.description}
                            onChange={handleModuleInputChange}
                        />
                        <CFormLabel className="mt-3">Upload File</CFormLabel>
                        <CFormInput type="file" onChange={handleModuleFileChange} />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleModule(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={handleAddModule}>
                        Upload Module
                    </CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )
}

export default Programs
