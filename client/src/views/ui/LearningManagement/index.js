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

const LMS = () => {
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
            const response = await axios.get(`${API_BASE_URL}/modules`)
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
            const response = await axios.post(`${API_BASE_URL}/modules`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            setModules((prevModules) => [...prevModules, response.data.data])
            setVisibleXL(false)
            setNewModule({ title: '', description: '', file: null })
        } catch (error) {
            console.error('Error adding module:', error.response?.data || error.message)
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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/modules/${id}`)
            setModules((prevModules) => prevModules.filter((module) => module.id !== id))
        } catch (error) {
            console.error('Error deleting module:', error.response?.data || error.message)
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
                                {modules.length > 0 ? (
                                    modules.map((module, index) => (
                                        <CTableRow key={module.id}>
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
                                                        {module.file_name || 'Download'}
                                                    </a>
                                                ) : (
                                                    <span>No File</span>
                                                )}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <CButton
                                                    color="danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(module.id)}
                                                >
                                                    Delete
                                                </CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))
                                ) : (
                                    <CTableRow>
                                        <CTableDataCell colSpan={5} className="text-center">
                                            No modules available.
                                        </CTableDataCell>
                                    </CTableRow>
                                )}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default LMS
