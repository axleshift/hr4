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
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
} from '@coreui/react'

const ModuleList = () => {
    const [modules, setModules] = useState([])
    const [base64Doc, setBase64Doc] = useState('')
    const [mimeType, setMimeType] = useState('')
    const [fileName, setFileName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        fetchModules()
    }, [])

    const fetchModules = async () => {
        try {
            const response = await api.get(`/api/modules`)
            setModules(response.data.data)
        } catch (error) {
            console.error('Error fetching modules:', error)
        }
    }

    // Fetch Base64 preview for PDF & DOCX
    const fetchDocPreview = async (id) => {
        try {
            const response = await api.get(`/api/modules/${id}/preview`)
            setBase64Doc(response.data.base64)
            setMimeType(response.data.mime_type)
            setFileName(response.data.file_name)
            setModalVisible(true)
        } catch (error) {
            console.error('Error fetching document preview:', error)
        }
    }

    return (
        <CRow>
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
                                            {(module.file_name?.endsWith('.docx') ||
                                                module.file_name?.endsWith('.pdf')) && (
                                                <CButton
                                                    color="info"
                                                    onClick={() => fetchDocPreview(module.id)}
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

            {/* Modal for Previewing DOCX & PDF Files */}
            <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <CModalHeader>Document Preview</CModalHeader>
                <CModalBody>
                    {base64Doc ? (
                        mimeType === 'application/pdf' ? (
                            <embed
                                src={base64Doc}
                                type="application/pdf"
                                width="100%"
                                height="500px"
                            />
                        ) : (
                            <p>
                                DOCX preview is not supported inline. Please{' '}
                                <a
                                    href={`https://hr4.axleshift.com/uploads/${fileName}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    click here to view the file
                                </a>{' '}
                                in a new tab.
                            </p>
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
        </CRow>
    )
}

export default ModuleList
