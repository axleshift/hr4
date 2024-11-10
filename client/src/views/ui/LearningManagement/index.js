import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardImage,
    CCardText,
    CCardTitle,
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
} from '@coreui/react'
import { useNavigate } from 'react-router-dom' // Import useNavigate hook

import ReactImg from 'src/assets/images/react.jpg'

const LMS = () => {
    const navigate = useNavigate() // Initialize the navigate function
    const [visibleXL, setVisibleXL] = useState(false)
    const [modules, setModules] = useState([]) // Local module list
    const [newModule, setNewModule] = useState({
        title: '',
        description: '',
        image: null,
    })

    // Handle form submission (without axios)
    const handleSubmit = (e) => {
        e.preventDefault()
        setModules([...modules, newModule]) // Add new module to the list
        setVisibleXL(false) // Close modal after submission
        setNewModule({ title: '', description: '', image: null }) // Reset form fields
    }

    // Handle form inputs
    const handleInputChange = (e) => {
        const { id, value } = e.target
        setNewModule((prevModule) => ({
            ...prevModule,
            [id]: value,
        }))
    }

    const handleImageChange = (e) => {
        const { id, files } = e.target
        setNewModule((prevModule) => ({
            ...prevModule,
            [id]: files[0], // Store the file object
        }))
    }

    // Handle click on title
    const handleTitleClick = (module) => {
        navigate(`/learning-management/module/${module.title}`, { state: { module } })
    }

    // Handle deletion of a module
    const handleDelete = (index) => {
        const updatedModules = modules.filter((module, i) => i !== index)
        setModules(updatedModules) // Update the modules state
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
                                    <CForm validated={true}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="image">
                                                Input Image (Optional)
                                            </CFormLabel>
                                            <CFormInput
                                                type="file"
                                                id="image"
                                                onChange={handleImageChange}
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
                        <CRow>
                            {modules.map((module, index) => (
                                <CCol xs={12} md={4} key={index} className="mb-4">
                                    <CCard>
                                        <CCardImage
                                            orientation="top"
                                            src={
                                                module.image
                                                    ? URL.createObjectURL(module.image)
                                                    : ReactImg
                                            }
                                        />
                                        <CCardBody>
                                            {/* Make title clickable */}
                                            <CCardTitle
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleTitleClick(module)} // Navigate to details page
                                            >
                                                {module.title}
                                            </CCardTitle>
                                            <CCardText>{module.description}</CCardText>
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <CButton color="primary" className="me-md-2">
                                                    EDIT
                                                </CButton>
                                                {/* Add Delete button */}
                                                <CButton
                                                    color="danger"
                                                    className="me-md-2"
                                                    onClick={() => handleDelete(index)}
                                                >
                                                    DELETE
                                                </CButton>
                                            </div>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            ))}
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default LMS
