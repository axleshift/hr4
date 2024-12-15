import React, { useState, useEffect } from 'react'
import {
    CBadge,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CCol,
    CTable,
    CTableBody,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CForm,
    CFormInput,
    CFormLabel,
} from '@coreui/react'
import axios from 'axios'

const TrainingDelivery = () => {
    const [visibleXL, setVisibleXL] = useState(false)
    const [trainings, setTrainings] = useState([])
    const [formData, setFormData] = useState({
        training_class: '',
        agenda: '',
        location: '',
        schedule: '',
        start_time: '',
        end_time: '',
    })

    // CRUD
    useEffect(() => {
        fetchTrainings()
    }, [])

    const fetchTrainings = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/training')
            setTrainings(response.data.data)
        } catch (error) {
            console.error('Error fetching trainings:', error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8000/api/training', formData)
            setVisibleXL(false)
            fetchTrainings()
            setFormData({
                training_class: '',
                agenda: '',
                location: '',
                schedule: '',
                start_time: '',
                end_time: '',
            })
        } catch (error) {
            console.error('Error adding training:', error)
        }
    }
    // FILTER
    const uniqueTrainingClasses = trainings.filter(
        (training, index, self) =>
            index === self.findIndex((t) => t.training_class === training.training_class),
    )

    const uniqueAgenda = trainings.filter(
        (agenda, index, self) => index === self.findIndex((a) => a.agenda === agenda.agenda),
    )
    // DATE TIME
    const getTrainingStatus = (scheduleDate, startTime, endTime) => {
        const now = new Date()
        const start = new Date(`${scheduleDate}T${startTime}`)
        const end = new Date(`${scheduleDate}T${endTime}`)

        // Determine the status based on the time comparison
        if (now < start) return 'Pending' // Training hasn't started yet
        if (now <= end) return 'Ongoing' // Training is ongoing
        return 'Complete' // Training is complete
    }

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':')
        const hours24 = parseInt(hours, 10)
        const suffix = hours24 >= 12 ? 'PM' : 'AM'
        const hours12 = hours24 % 12 || 12
        return `${hours12}:${minutes} ${suffix}`
    }

    const [currentTime, setCurrentTime] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date()) // Updates the state every second
        }, 1000)

        return () => clearInterval(interval) // Clean up interval on component unmount
    }, [])

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Training Schedule</strong>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <CButton color="primary" onClick={() => setVisibleXL(true)}>
                                Add Stuff
                            </CButton>
                            <CModal
                                alignment="center"
                                backdrop="static"
                                size="lg"
                                visible={visibleXL}
                                onClose={() => setVisibleXL(false)}
                            >
                                <CModalHeader>
                                    <CModalTitle>Add Stuff</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <CForm onSubmit={handleSubmit}>
                                        <CFormLabel htmlFor="training_class">
                                            Training Class
                                        </CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="training_class"
                                            name="training_class"
                                            value={formData.training_class}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <div>
                                            {uniqueTrainingClasses.map((training) => (
                                                <CButton
                                                    key={training.id}
                                                    color="secondary"
                                                    variant="outline"
                                                    className="me-2"
                                                    onClick={() =>
                                                        setFormData({
                                                            ...formData,
                                                            training_class: training.training_class,
                                                        })
                                                    }
                                                >
                                                    {training.training_class}
                                                </CButton>
                                            ))}
                                        </div>
                                        <CFormLabel htmlFor="agenda">Type of Agenda</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="agenda"
                                            name="agenda"
                                            value={formData.agenda}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <div>
                                            {uniqueAgenda.map((agenda) => (
                                                <CButton
                                                    key={agenda.id}
                                                    color="secondary"
                                                    variant="outline"
                                                    className="me-2"
                                                    onClick={() =>
                                                        setFormData({
                                                            ...formData,
                                                            agenda: agenda.agenda,
                                                        })
                                                    }
                                                >
                                                    {agenda.agenda}
                                                </CButton>
                                            ))}
                                        </div>
                                        <CFormLabel htmlFor="location">Location / Mode</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <CFormLabel htmlFor="schedule">Schedule</CFormLabel>
                                        <CFormInput
                                            type="date"
                                            id="schedule"
                                            name="schedule"
                                            value={formData.schedule}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <CFormLabel htmlFor="start_time">Start Time</CFormLabel>
                                        <CFormInput
                                            type="time"
                                            id="start_time"
                                            name="start_time"
                                            value={formData.start_time}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <CFormLabel htmlFor="end_time">End Time</CFormLabel>
                                        <CFormInput
                                            type="time"
                                            id="end_time"
                                            name="end_time"
                                            value={formData.end_time}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <CModalFooter>
                                            <CButton
                                                color="secondary"
                                                onClick={() => setVisibleXL(false)}
                                            >
                                                Cancel
                                            </CButton>
                                            <CButton color="primary" type="submit">
                                                Add Module
                                            </CButton>
                                        </CModalFooter>
                                    </CForm>
                                </CModalBody>
                            </CModal>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Training Class</CTableHeaderCell>
                                    <CTableHeaderCell>Agenda</CTableHeaderCell>
                                    <CTableHeaderCell>Location</CTableHeaderCell>
                                    <CTableHeaderCell>Schedule</CTableHeaderCell>
                                    <CTableHeaderCell>Start Time</CTableHeaderCell>
                                    <CTableHeaderCell>End Time</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                    <CTableHeaderCell>Participants</CTableHeaderCell>
                                    {/* New Column */}
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {trainings.map((training) => (
                                    <CTableRow key={training.id}>
                                        <CTableHeaderCell>
                                            {training.training_class}
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>{training.agenda}</CTableHeaderCell>
                                        <CTableHeaderCell>{training.location}</CTableHeaderCell>
                                        <CTableHeaderCell>{training.schedule}</CTableHeaderCell>
                                        <CTableHeaderCell>
                                            {formatTime(training.start_time)}
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>
                                            {formatTime(training.end_time)}
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>
                                            <CBadge
                                                color={
                                                    getTrainingStatus(
                                                        training.schedule,
                                                        training.start_time,
                                                        training.end_time,
                                                    ) === 'Pending'
                                                        ? 'warning'
                                                        : getTrainingStatus(
                                                                training.schedule,
                                                                training.start_time,
                                                                training.end_time,
                                                            ) === 'Ongoing'
                                                          ? 'info'
                                                          : 'success'
                                                }
                                                className="ms-2"
                                            >
                                                {getTrainingStatus(
                                                    training.schedule,
                                                    training.start_time,
                                                    training.end_time,
                                                )}
                                            </CBadge>
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>
                                            {/* Button to view participants */}
                                            <CButton color="primary" variant="outline">
                                                View Participants
                                            </CButton>
                                        </CTableHeaderCell>
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

export default TrainingDelivery
