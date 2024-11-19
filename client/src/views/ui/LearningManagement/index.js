import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
import { useNavigate } from 'react-router-dom'
import ReactImg from 'src/assets/images/react.jpg'

const LMS = () => {
    const navigate = useNavigate()
    const [visibleXL, setVisibleXL] = useState(false)
    const [modules, setModules] = useState([])
    const [newModule, setNewModule] = useState({
        title: '',
        description: '',
        image: null,
    })

    // Fetch modules on component mount
    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/modules')
                setModules(response.data.data) // Load modules from backend
            } catch (error) {
                console.error('Error fetching modules:', error)
            }
        }

        fetchModules()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', newModule.title)
        formData.append('description', newModule.description)
        if (newModule.image) {
            formData.append('image', newModule.image) // Attach the image
        }

        try {
            const response = await axios.post('http://localhost:8000/api/modules', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            // Add the new module to the state
            setModules([...modules, response.data.data])

            // Reset the form fields
            setVisibleXL(false)
            setNewModule({ title: '', description: '', image: null })
            document.getElementById('image').value = null // Clear the file input field
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

    const handleImageChange = (e) => {
        const { id, files } = e.target
        setNewModule((prevModule) => ({
            ...prevModule,
            [id]: files[0],
        }))
    }

    // Fetch module details when clicking on a module title
    const handleTitleClick = async (module) => {
        try {
            // Fetch the module details including its files
            const response = await axios.get(`http://localhost:8000/api/modules/${module.id}`)
            const fetchedModule = response.data.data

            console.log('Module Details:', fetchedModule) // Debug
            console.log('Associated Files:', fetchedModule.files) // Debug

            // Navigate to the module page with fetched module details
            navigate(`/learning-management/module/${module.id}`, {
                state: { module: fetchedModule },
            })
        } catch (error) {
            console.error('Error fetching module details:', error)
        }
    }

    const handleDelete = async (index) => {
        const moduleToDelete = modules[index]
        try {
            // Send DELETE request
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
                                                    ? `data:image/jpeg;base64,${module.image}` // Display Base64 image
                                                    : ReactImg
                                            }
                                        />

                                        <CCardBody>
                                            <CCardTitle
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleTitleClick(module)}
                                            >
                                                {module.title}
                                            </CCardTitle>
                                            <CCardText>{module.description}</CCardText>
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <CButton color="primary" className="me-md-2">
                                                    EDIT
                                                </CButton>
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
