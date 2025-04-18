import React, { useState, useEffect } from 'react'
import api from '../../../../util/api'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
} from '@coreui/react'

const ModuleList = () => {
    const [modules, setModules] = useState([])
    const [courses, setCourses] = useState([])

    const [base64Doc, setBase64Doc] = useState('')
    const [mimeType, setMimeType] = useState('')
    const [fileName, setFileName] = useState('')
    const [isPreviewing, setIsPreviewing] = useState(false)

    useEffect(() => {
        fetchModules()
        fetchCourses()
    }, [])

    const fetchModules = async () => {
        try {
            const response = await api.get('/api/modules')
            setModules(response.data.data)
        } catch (error) {
            console.error('Error fetching modules:', error)
        }
    }

    const fetchCourses = async () => {
        try {
            const response = await api.get('/api/courses')
            setCourses(response.data.data)
        } catch (error) {
            console.error('Error fetching courses:', error)
        }
    }

    const fetchDocPreview = async (id, type = 'module') => {
        try {
            const endpoint =
                type === 'course' ? `/api/courses/${id}/preview` : `/api/modules/${id}/preview`
            const response = await api.get(endpoint)
            setBase64Doc(response.data.base64)
            setMimeType(response.data.mime_type)
            setFileName(response.data.file_name)
            setIsPreviewing(true)
        } catch (error) {
            console.error('Error fetching document preview:', error)
        }
    }

    // === RENDER DOCUMENT PREVIEW FULL SCREEN ===
    if (isPreviewing) {
        return (
            <div style={{ padding: '20px' }}>
                <CButton color="secondary" onClick={() => setIsPreviewing(false)}>
                    ← Back to List
                </CButton>

                <h2 style={{ marginTop: '1rem' }}>Document Preview</h2>

                {base64Doc || fileName ? (
                    mimeType === 'application/pdf' ? (
                        <iframe
                            src={base64Doc}
                            style={{ width: '100%', height: '90vh', border: 'none' }}
                            title="PDF Preview"
                        ></iframe>
                    ) : (
                        <iframe
                            src={`https://view.officeapps.live.com/op/embed.aspx?src=https://hr4.axleshift.com/uploads/${fileName}`}
                            style={{ width: '100%', height: '90vh', border: 'none' }}
                            title="DOCX Preview"
                        ></iframe>
                    )
                ) : (
                    <p>No preview available.</p>
                )}
            </div>
        )
    }

    // === RENDER MODULE & COURSE LIST ===
    return (
        <CRow>
            {/* MODULES TABLE */}
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>MODULES</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable striped hover>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>#</CTableHeaderCell>
                                    <CTableHeaderCell>Title</CTableHeaderCell>
                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                    <CTableHeaderCell>Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {modules.map((module, index) => (
                                    <CTableRow key={index}>
                                        <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                                        <CTableDataCell>{module.title}</CTableDataCell>
                                        <CTableDataCell>{module.description}</CTableDataCell>
                                        <CTableDataCell>
                                            {(module.file_name?.endsWith('.pdf') ||
                                                module.file_name?.endsWith('.docx')) && (
                                                <CButton
                                                    color="info"
                                                    onClick={() =>
                                                        fetchDocPreview(module.id, 'module')
                                                    }
                                                >
                                                    View
                                                </CButton>
                                            )}
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* COURSES TABLE */}
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>COURSES</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable striped hover>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>#</CTableHeaderCell>
                                    <CTableHeaderCell>Title</CTableHeaderCell>
                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                    <CTableHeaderCell>Program</CTableHeaderCell>
                                    <CTableHeaderCell>Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {courses.map((course, index) => (
                                    <CTableRow key={index}>
                                        <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                                        <CTableDataCell>{course.title}</CTableDataCell>
                                        <CTableDataCell>{course.description}</CTableDataCell>
                                        <CTableDataCell>
                                            {course.program?.title || 'N/A'}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {(course.file_name?.endsWith('.pdf') ||
                                                course.file_name?.endsWith('.docx')) && (
                                                <CButton
                                                    color="info"
                                                    onClick={() =>
                                                        fetchDocPreview(course.id, 'course')
                                                    }
                                                >
                                                    View
                                                </CButton>
                                            )}
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ModuleList
