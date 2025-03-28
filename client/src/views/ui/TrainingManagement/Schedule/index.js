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

const TrainingSchedule = () => {
    const [visibleXL, setVisibleXL] = useState(false)
    const [trainings, setTrainings] = useState([])
    const [formData, setFormData] = useState({
        event_title: '',
        delivery_method: '',
        event_location: '',
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
            const response = await api.get('/training')
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
            await api.post('/training', formData)
            setVisibleXL(false)
            fetchTrainings()
            setFormData({
                event_title: '',
                delivery_method: '',
                event_location: '',
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
            index === self.findIndex((t) => t.event_title === training.event_title),
    )

    const uniqueDelivery_method = trainings.filter(
        (delivery_method, index, self) =>
            index === self.findIndex((a) => a.delivery_method === delivery_method.delivery_method),
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
                                        <CFormLabel htmlFor="event_title">
                                            Training Class
                                        </CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="event_title"
                                            name="event_title"
                                            value={formData.event_title}
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
                                                            event_title: training.event_title,
                                                        })
                                                    }
                                                >
                                                    {training.event_title}
                                                </CButton>
                                            ))}
                                        </div>
                                        <CFormLabel htmlFor="delivery_method">
                                            Type of Delivery Method
                                        </CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="delivery_method"
                                            name="delivery_method"
                                            value={formData.delivery_method}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <div>
                                            {uniqueDelivery_method.map((delivery_method) => (
                                                <CButton
                                                    key={delivery_method.id}
                                                    color="secondary"
                                                    variant="outline"
                                                    className="me-2"
                                                    onClick={() =>
                                                        setFormData({
                                                            ...formData,
                                                            delivery_method:
                                                                delivery_method.delivery_method,
                                                        })
                                                    }
                                                >
                                                    {delivery_method.delivery_method}
                                                </CButton>
                                            ))}
                                        </div>
                                        <CFormLabel htmlFor="event_location">
                                            event_location / Mode
                                        </CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="event_location"
                                            name="event_location"
                                            value={formData.event_location}
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
                                    <CTableHeaderCell>Delivery Method</CTableHeaderCell>
                                    <CTableHeaderCell>Event Location</CTableHeaderCell>
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
                                        <CTableHeaderCell>{training.event_title}</CTableHeaderCell>
                                        <CTableHeaderCell>
                                            {training.delivery_method}
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>
                                            {training.event_location}
                                        </CTableHeaderCell>
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

export default TrainingSchedule
