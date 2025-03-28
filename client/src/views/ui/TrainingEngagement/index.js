import React, { useState, useEffect } from 'react'
import api from '../../../util/api'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CForm,
    CFormInput,
    CFormTextarea,
    CFormLabel,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
} from '@coreui/react'
import ReactImg from 'src/assets/images/react.jpg'

const EmployeeEngagement = () => {
    const [modules, setModules] = useState([])
    const [trainings, setTrainings] = useState([]) // New state for training schedules
    const [enrolledModule, setEnrolledModule] = useState(null)
    const [enrolledTraining, setEnrolledTraining] = useState(null) // New state for enrolled training
    const [feedback, setFeedback] = useState({ rating: '', comments: '' })
    const [request, setRequest] = useState({
        moduleName: '',
        moduleDescription: '',
        suggestions: '',
    })
    const [visibleFeedbackModal, setVisibleFeedbackModal] = useState(false)

    // Fetch modules and training schedules when the page loads
    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await api.get('/api/modules')
                setModules(response.data.data)
            } catch (error) {
                console.error('Error fetching modules:', error)
            }
        }

        const fetchTrainings = async () => {
            try {
                const response = await api.get('api/training')
                setTrainings(response.data.data)
            } catch (error) {
                console.error('Error fetching training schedules:', error)
            }
        }

        fetchModules()
        fetchTrainings()
    }, [])

    // Handle module enrollment
    const handleEnrollModule = (module) => {
        setEnrolledModule(module)
    }

    // Handle training schedule enrollment
    const handleEnrollTraining = (training) => {
        setEnrolledTraining(training)
    }

    // Handle feedback change
    const handleFeedbackChange = (e) => {
        const { id, value } = e.target
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [id]: value,
        }))
    }

    // Submit feedback
    const handleSubmitFeedback = async () => {
        if (!enrolledModule) return
        try {
            await api.post(`/modules/${enrolledModule.id}/feedback`, {
                ...feedback,
                moduleId: enrolledModule.id,
            })
            setVisibleFeedbackModal(false)
            alert('Feedback submitted successfully!')
            setEnrolledModule(null)
            setFeedback({ rating: '', comments: '' })
        } catch (error) {
            console.error('Error submitting feedback:', error)
        }
    }

    // Handle module request form input change
    const handleRequestChange = (e) => {
        const { id, value } = e.target
        setRequest((prevRequest) => ({
            ...prevRequest,
            [id]: value,
        }))
    }

    // Handle module request form submission
    const handleSubmitRequest = async () => {
        try {
            await api.post('/modules/request', {
                ...request,
            })
            alert('Module request submitted successfully!')
            setRequest({ moduleName: '', moduleDescription: '', suggestions: '' })
        } catch (error) {
            console.error('Error submitting module request:', error)
        }
    }

    return (
        <CRow>
            {/* Modules Table */}
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Employee Engagement - Modules</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable striped bordered hover>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Module</CTableHeaderCell>
                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                    <CTableHeaderCell>Enrollment</CTableHeaderCell>
                                    <CTableHeaderCell>Feedback</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {modules.map((module, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell>
                                            <img
                                                src={
                                                    module.image
                                                        ? `data:image/jpeg;base64,${module.image}`
                                                        : ReactImg
                                                }
                                                alt={module.title}
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            {module.title}
                                        </CTableDataCell>
                                        <CTableDataCell>{module.description}</CTableDataCell>
                                        <CTableDataCell>
                                            {/* Enroll Button */}
                                            {!enrolledModule || enrolledModule.id !== module.id ? (
                                                <CButton
                                                    color="primary"
                                                    onClick={() => handleEnrollModule(module)}
                                                >
                                                    Enroll
                                                </CButton>
                                            ) : (
                                                <CButton color="secondary" disabled>
                                                    Enrolled
                                                </CButton>
                                            )}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {/* Feedback Button */}
                                            <CButton
                                                color={
                                                    enrolledModule &&
                                                    enrolledModule.id === module.id
                                                        ? 'success'
                                                        : 'secondary'
                                                }
                                                onClick={() =>
                                                    enrolledModule &&
                                                    enrolledModule.id === module.id &&
                                                    setVisibleFeedbackModal(true)
                                                }
                                                disabled={
                                                    enrolledModule &&
                                                    enrolledModule.id !== module.id
                                                }
                                            >
                                                Provide Feedback
                                            </CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Training Schedule Table */}
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Training Schedule Enrollment</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable striped bordered hover>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Training Class</CTableHeaderCell>
                                    <CTableHeaderCell>Agenda</CTableHeaderCell>
                                    <CTableHeaderCell>Location</CTableHeaderCell>
                                    <CTableHeaderCell>Schedule</CTableHeaderCell>
                                    <CTableHeaderCell>Start Time</CTableHeaderCell>
                                    <CTableHeaderCell>End Time</CTableHeaderCell>
                                    <CTableHeaderCell>Enrollment</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {trainings.map((training, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{training.training_class}</CTableDataCell>
                                        <CTableDataCell>{training.agenda}</CTableDataCell>
                                        <CTableDataCell>{training.location}</CTableDataCell>
                                        <CTableDataCell>{training.schedule}</CTableDataCell>
                                        <CTableDataCell>{training.start_time}</CTableDataCell>
                                        <CTableDataCell>{training.end_time}</CTableDataCell>
                                        <CTableDataCell>
                                            {/* Enroll Button for Training */}
                                            {!enrolledTraining ||
                                            enrolledTraining.id !== training.id ? (
                                                <CButton
                                                    color="primary"
                                                    onClick={() => handleEnrollTraining(training)}
                                                >
                                                    Enroll
                                                </CButton>
                                            ) : (
                                                <CButton color="secondary" disabled>
                                                    Enrolled
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

            {/* Feedback Modal for Module */}
            <CModal
                alignment="center"
                size="lg"
                visible={visibleFeedbackModal}
                onClose={() => setVisibleFeedbackModal(false)}
            >
                <CModalHeader>
                    <CModalTitle>Provide Feedback</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <div className="mb-3">
                            <CFormLabel htmlFor="rating">Rating (1-5)</CFormLabel>
                            <CFormInput
                                type="number"
                                id="rating"
                                value={feedback.rating}
                                onChange={handleFeedbackChange}
                                max={5}
                                min={1}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="comments">Comments</CFormLabel>
                            <CFormTextarea
                                id="comments"
                                rows={3}
                                value={feedback.comments}
                                onChange={handleFeedbackChange}
                                required
                            />
                        </div>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleFeedbackModal(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={handleSubmitFeedback}>
                        Submit Feedback
                    </CButton>
                </CModalFooter>
            </CModal>

            {/* Request a Module Form */}
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Request a Module or Provide Suggestions</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm>
                            <div className="mb-3">
                                <CFormLabel htmlFor="suggestions">
                                    Suggestions or What You Want to Know
                                </CFormLabel>
                                <CFormTextarea
                                    id="suggestions"
                                    rows={3}
                                    value={request.suggestions}
                                    onChange={handleRequestChange}
                                    required
                                />
                            </div>
                            <CButton color="primary" onClick={handleSubmitRequest}>
                                Submit Request
                            </CButton>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EmployeeEngagement
