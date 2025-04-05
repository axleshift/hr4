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
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchModules()
    }, [])

    const fetchModules = async () => {
        try {
            const response = await api.get(`/api/modules`)
            setModules(response.data.data)
        } catch (error) {
            console.error('Error fetching modules:', error)
            setError('Failed to load modules.')
        }
    }

    const fetchDocPreview = async (id) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.get(`/api/modules/${id}/preview`)
            setBase64Doc(response.data.base64)
            setMimeType(response.data.mime_type)
            setFileName(response.data.file_name)
            setModalVisible(true)
        } catch (error) {
            console.error('Error fetching document preview:', error)
            setError('Failed to load document preview.')
        } finally {
            setLoading(false)
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
                        {error && <div className="alert alert-danger">{error}</div>}
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
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Loading...' : 'View'}
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
            <CModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                size="xl" // Makes the modal extra large
                fullscreen // Optionally make it fullscreen
            >
                <CModalHeader>Document Preview</CModalHeader>
                <CModalBody style={{ padding: 0 }}>
                    {base64Doc ? (
                        mimeType === 'application/pdf' ? (
                            <iframe
                                src={`data:${mimeType};base64,${base64Doc}`}
                                style={{ width: '100%', height: '90vh', border: 'none' }}
                                title="PDF Preview"
                            ></iframe>
                        ) : (
                            <iframe
                                src={`https://view.officeapps.live.com/op/embed.aspx?src=https://hr4.axleshift.com/uploads/${fileName}`}
                                style={{ width: '100%', height: '90vh', border: 'none' }}
                                title="Office Document Preview"
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
        </CRow>
    )
}

export default ModuleList
