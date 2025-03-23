import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
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
    CSpinner,
    CAlert,
} from '@coreui/react'

const ModuleList = () => {
    const [modules, setModules] = useState([])
    const [files, setFiles] = useState([])
    const [docContent, setDocContent] = useState(null)

    useEffect(() => {
        fetchModules()
        fetchFiles()
    }, [])

    const fetchModules = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/modules')
            setModules(response.data.data)
        } catch (error) {
            console.error('Error fetching modules:', error)
        }
    }

    const fetchFiles = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/modules') // Use 'modules' instead of 'files'
            setFiles(response.data.data) // Ensure this matches the API response structure
        } catch (error) {
            console.error(
                'Error fetching files:',
                error.response ? error.response.data : error.message,
            )
        }
    }

    // Function to display DOCX using React-Doc-Viewer
    const fetchDocxContent = (fileUrl) => {
        if (!fileUrl) {
            console.error('File URL is missing.')
            return
        }

        setDocContent([{ uri: `${window.location.origin}${fileUrl}` }])
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
                                            {module.file_url?.endsWith('.docx') && (
                                                <CButton
                                                    color="info"
                                                    onClick={() =>
                                                        fetchDocxContent(module.file_url)
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

                        {docContent && (
                            <CCard className="mt-4">
                                <CCardHeader>
                                    <h3>Document Preview</h3>
                                </CCardHeader>
                                <CCardBody>
                                    <DocViewer
                                        documents={docContent}
                                        pluginRenderers={DocViewerRenderers}
                                    />
                                </CCardBody>
                            </CCard>
                        )}
                    </CCardBody>
                </CCard>

                <CCard className="mt-4">
                    <CCardHeader>
                        <strong>STORAGE FILES</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable striped hover>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>#</CTableHeaderCell>
                                    <CTableHeaderCell>File Name</CTableHeaderCell>
                                    <CTableHeaderCell>Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {files.map((file, index) => (
                                    <CTableRow key={index}>
                                        <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                                        <CTableDataCell>{file.file_name}</CTableDataCell>
                                        <CTableDataCell>
                                            <CButton
                                                color="primary"
                                                href={file.file_url}
                                                target="_blank"
                                            >
                                                Download
                                            </CButton>
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
