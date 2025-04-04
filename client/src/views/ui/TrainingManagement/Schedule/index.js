import React, { useState, useEffect } from 'react'
import api from '../../../../util/api'
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
    CFormSelect,
} from '@coreui/react'

const TrainingSchedule = () => {
    const [visibleXL, setVisibleXL] = useState(false)
    const [trainings, setTrainings] = useState([])
    const [programs, setPrograms] = useState([])
    const [courses, setCourses] = useState([])
    const [formData, setFormData] = useState({
        event_title: '',
        event_location: '',
        schedule: '',
        start_time: '',
        end_time: '',
        program_id: '',
        course_id: '',
    })

    useEffect(() => {
        fetchPrograms()
        fetchTrainings()
    }, [])

    const fetchPrograms = async () => {
        try {
            const response = await api.get('/api/programs')
            setPrograms(response.data.data)
        } catch (error) {
            console.error('Error fetching programs:', error)
        }
    }

    const fetchCourses = async (programId) => {
        if (!programId) {
            setCourses([])
            return
        }
        try {
            const response = await api.get(`/api/courses?program_id=${programId}`)
            setCourses(response.data.data)
        } catch (error) {
            console.error('Error fetching courses:', error)
        }
    }

    const fetchTrainings = async () => {
        try {
            const response = await api.get('/training')
            setTrainings(response.data.data || [])
        } catch (error) {
            console.error('Error fetching trainings:', error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target

        // If program is changed, reset course and fetch courses
        if (name === 'program_id') {
            setFormData({
                ...formData,
                program_id: value,
                course_id: '', // Reset selected course
            })
            fetchCourses(value)
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.post('/training', formData)
            setVisibleXL(false)
            fetchTrainings()
            setFormData({
                event_title: '',
                event_location: '',
                schedule: '',
                start_time: '',
                end_time: '',
                program_id: '',
                course_id: '',
            })
            setCourses([])
        } catch (error) {
            console.error('Error adding training:', error)
        }
    }

    const getTrainingStatus = (scheduleDate, startTime, endTime) => {
        const now = new Date()
        const start = new Date(`${scheduleDate}T${startTime}`)
        const end = new Date(`${scheduleDate}T${endTime}`)

        if (now < start) return 'Pending'
        if (now <= end) return 'Ongoing'
        return 'Complete'
    }

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':')
        const hours24 = parseInt(hours, 10)
        const suffix = hours24 >= 12 ? 'PM' : 'AM'
        const hours12 = hours24 % 12 || 12
        return `${hours12}:${minutes} ${suffix}`
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader className="d-flex justify-content-between align-items-center">
                        <strong>Training Schedule</strong>
                        <CButton color="primary" onClick={() => setVisibleXL(true)}>
                            Add Training
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Program</CTableHeaderCell>
                                    <CTableHeaderCell>Course</CTableHeaderCell>
                                    <CTableHeaderCell>Location</CTableHeaderCell>
                                    <CTableHeaderCell>Schedule</CTableHeaderCell>
                                    <CTableHeaderCell>Start Time</CTableHeaderCell>
                                    <CTableHeaderCell>End Time</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {trainings.map((training) => (
                                    <CTableRow key={training.id}>
                                        <CTableHeaderCell>{training.program_name}</CTableHeaderCell>
                                        <CTableHeaderCell>{training.course_name}</CTableHeaderCell>
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
                                            >
                                                {getTrainingStatus(
                                                    training.schedule,
                                                    training.start_time,
                                                    training.end_time,
                                                )}
                                            </CBadge>
                                        </CTableHeaderCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Add Training Modal */}
            <CModal
                alignment="center"
                backdrop="static"
                size="lg"
                visible={visibleXL}
                onClose={() => setVisibleXL(false)}
            >
                <CModalHeader>
                    <CModalTitle>Add Training</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm onSubmit={handleSubmit}>
                        <CFormLabel htmlFor="program_id">Training Program</CFormLabel>
                        <CFormSelect
                            id="program_id"
                            name="program_id"
                            value={formData.program_id}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Program</option>
                            {programs.map((program) => (
                                <option key={program.id} value={program.id}>
                                    {program.title}
                                </option>
                            ))}
                        </CFormSelect>

                        <CFormLabel htmlFor="course_id">Course</CFormLabel>
                        <CFormSelect
                            id="course_id"
                            name="course_id"
                            value={formData.course_id}
                            onChange={handleInputChange}
                            required
                            disabled={!formData.program_id}
                        >
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </CFormSelect>

                        <CFormLabel htmlFor="event_location">Event Location / Mode</CFormLabel>
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
                            <CButton color="secondary" onClick={() => setVisibleXL(false)}>
                                Cancel
                            </CButton>
                            <CButton color="primary" type="submit">
                                Add Training
                            </CButton>
                        </CModalFooter>
                    </CForm>
                </CModalBody>
            </CModal>
        </CRow>
    )
}

export default TrainingSchedule
