import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CTable,
    CTableBody,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const LMS = () => {
    const navigate = useNavigate()
    const [visibleXL, setVisibleXL] = useState(false)
    const [modules, setModules] = useState([])
    const [newModule, setNewModule] = useState({
        title: '',
        description: '',
        file: null,
    })

    // Fetch modules on component mount
    useEffect(() => {
        fetchModules()
    }, [])

    const fetchModules = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/modules')
            setModules(response.data.data)
        } catch (error) {
            console.error('Error fetching modules:', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', newModule.title)
        formData.append('description', newModule.description)
        if (newModule.file) {
            formData.append('file', newModule.file)
        }

        try {
            const response = await axios.post('http://localhost:8000/api/modules', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            setModules([...modules, response.data.data])
            setVisibleXL(false)
            setNewModule({ title: '', description: '', file: null })
            document.getElementById('file').value = null
        } catch (error) {
            console.error('Error adding module:', error)
        }
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setNewModule((prevModule) => ({
            ...prevModule,
            [id]: value,
        }))
    }

    const handleFileChange = (e) => {
        setNewModule((prevModule) => ({
            ...prevModule,
            file: e.target.files[0],
        }))
    }

    const handleDelete = async (index) => {
        const moduleToDelete = modules[index]
        try {
            await axios.delete(`http://localhost:8000/api/modules/${moduleToDelete.id}`)
            const updatedModules = modules.filter((_, i) => i !== index)
            setModules(updatedModules)
        } catch (error) {
            console.error('Error deleting module:', error)
        }
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>MODULES</strong>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <CButton color="primary" onClick={() => setVisibleXL(!visibleXL)}>
                                Create Module
                            </CButton>
                            <CModal
                                alignment="center"
                                backdrop="static"
                                size="lg"
                                visible={visibleXL}
                                onClose={() => setVisibleXL(false)}
                            >
                                <CModalHeader>
                                    <CModalTitle>Create Module</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <CForm>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="file">Upload File</CFormLabel>
                                            <CFormInput
                                                type="file"
                                                id="file"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="title">Module Title</CFormLabel>
                                            <CFormInput
                                                required
                                                type="text"
                                                id="title"
                                                value={newModule.title}
                                                onChange={handleInputChange}
                                                placeholder="Input title"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="description">
                                                Description
                                            </CFormLabel>
                                            <CFormTextarea
                                                id="description"
                                                rows={3}
                                                value={newModule.description}
                                                onChange={handleInputChange}
                                            ></CFormTextarea>
                                        </div>
                                    </CForm>
                                </CModalBody>
                                <CModalFooter>
                                    <CButton color="secondary" onClick={() => setVisibleXL(false)}>
                                        Cancel
                                    </CButton>
                                    <CButton color="primary" onClick={handleSubmit}>
                                        Add Module
                                    </CButton>
                                </CModalFooter>
                            </CModal>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CTable striped hover>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>#</CTableHeaderCell>
                                    <CTableHeaderCell>Title</CTableHeaderCell>
                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                    <CTableHeaderCell>File</CTableHeaderCell>
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
                                            {module.file_url ? (
                                                <a
                                                    href={module.file_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {module.file_name || 'Download File'}
                                                </a>
                                            ) : (
                                                <span>No File</span>
                                            )}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CButton
                                                color="danger"
                                                size="sm"
                                                onClick={() => handleDelete(index)}
                                            >
                                                Delete
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

export default LMS
