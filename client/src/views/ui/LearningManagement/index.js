import React, { useState, useEffect } from 'react'
import api from '../../../../util/api'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CCol,
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
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
} from '@coreui/react'
import ProgramModals from './Modals/ProgramModals'

const Programs = () => {
    const [programs, setPrograms] = useState([])
    const [courses, setCourses] = useState([])
    const [programTitle, setProgramTitle] = useState('')
    const [programDescription, setProgramDescription] = useState('')
    const [courseTitle, setCourseTitle] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [courseFile, setCourseFile] = useState(null)
    const [selectedProgramId, setSelectedProgramId] = useState(null)

    const [base64Doc, setBase64Doc] = useState('')
    const [mimeType, setMimeType] = useState('')
    const [fileName, setFileName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [visibleProgram, setVisibleProgram] = useState(false)
    const [visibleCourse, setVisibleCourse] = useState(false)

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

    const fetchCourseDocPreview = async (id) => {
        try {
            const response = await api.get(`/api/courses/${id}/preview`)
            setBase64Doc(response.data.base64)
            setMimeType(response.data.mime_type)
            setFileName(response.data.file_name)
            setModalVisible(true)
        } catch (error) {
            console.error('Error fetching course document preview:', error)
            alert('Error fetching preview')
        }
    }

    const handleSaveProgram = async () => {
        if (!programTitle || !programDescription) {
            alert('Please provide both title and description for the program.')
            return
        }

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
            alert('Failed to add program.')
        }
    }

    const handleSaveCourse = async (e) => {
        e.preventDefault()

        if (!courseTitle || !courseDescription) {
            alert('Please provide both title and description for the course.')
            return
        }

        const formData = new FormData()
        formData.append('title', courseTitle)
        formData.append('description', courseDescription)
        formData.append('program_id', selectedProgramId)
        if (courseFile) {
            formData.append('file', courseFile)
        }

        try {
            const response = await api.post('/api/courses', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            setCourses((prevCourses) => [...prevCourses, response.data])
            setVisibleCourse(false)
            setCourseTitle('')
            setCourseDescription('')
            setCourseFile(null)
        } catch (error) {
            console.error('Error saving course:', error)
            alert('Failed to save course.')
        }
    }

    const handleDeleteCourse = async (courseId) => {
        try {
            await api.delete(`/api/courses/${courseId}`)
            setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId))
        } catch (error) {
            console.error('Error deleting course:', error)
            alert('Failed to delete course.')
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
                                    <CAccordionHeader onClick={() => fetchCourses(program.id)}>
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

                                        <CTable striped className="mt-3">
                                            <CTableHead>
                                                <CTableRow>
                                                    <CTableHeaderCell>
                                                        Course Title
                                                    </CTableHeaderCell>
                                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                                    <CTableHeaderCell>File</CTableHeaderCell>
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
                                                                {(course.file_name?.endsWith(
                                                                    '.docx',
                                                                ) ||
                                                                    course.file_name?.endsWith(
                                                                        '.pdf',
                                                                    )) && (
                                                                    <CButton
                                                                        color="info"
                                                                        onClick={() =>
                                                                            fetchCourseDocPreview(
                                                                                course.id,
                                                                            )
                                                                        }
                                                                    >
                                                                        View
                                                                    </CButton>
                                                                )}
                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                <CButton
                                                                    color="danger"
                                                                    onClick={() =>
                                                                        handleDeleteCourse(
                                                                            course.id,
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
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

            {/* Modal for Document Preview */}
            <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <CModalHeader>Document Preview</CModalHeader>
                <CModalBody>
                    {base64Doc ? (
                        mimeType === 'application/pdf' ? (
                            <iframe
                                src={`${base64Doc}`}
                                style={{ width: '100%', height: '500px', border: 'none' }}
                            ></iframe>
                        ) : (
                            <iframe
                                src={`https://view.officeapps.live.com/op/embed.aspx?src=https://hr4.axleshift.com/uploads/${fileName}`}
                                style={{ width: '100%', height: '500px', border: 'none' }}
                            ></iframe>
                        )
                    ) : (
                        <p>No preview available.</p>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalVisible(false)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>

            <ProgramModals
                visibleProgram={visibleProgram}
                setVisibleProgram={setVisibleProgram}
                programTitle={programTitle}
                setProgramTitle={setProgramTitle}
                programDescription={programDescription}
                setProgramDescription={setProgramDescription}
                handleSaveProgram={handleSaveProgram}
                visibleCourse={visibleCourse}
                setVisibleCourse={setVisibleCourse}
                courseTitle={courseTitle}
                setCourseTitle={setCourseTitle}
                courseDescription={courseDescription}
                setCourseDescription={setCourseDescription}
                setCourseFile={setCourseFile}
                handleSaveCourse={handleSaveCourse}
            />
        </CRow>
    )
}

export default Programs
