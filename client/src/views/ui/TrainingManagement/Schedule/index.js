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
    const [trainings, setTrainings] = useState([]) // Ensure trainings is an empty array initially
    const [formData, setFormData] = useState({
        program_name: '',
        course_name: '',
        department: '',
        participant: '',
        event_location: '',
        schedule: '',
        start_time: '',
        end_time: '',
    })

    const [programs, setPrograms] = useState([])
    const [courses, setCourses] = useState([])
    const [selectedProgram, setSelectedProgram] = useState('')

    // CRUD
    useEffect(() => {
        fetchTrainings()
        fetchPrograms()
    }, [])

    const fetchTrainings = async () => {
        try {
            const response = await api.get(`/training`)
            setTrainings(response.data.data || []) // Fallback to empty array if data is undefined
        } catch (error) {
            console.error('Error fetching trainings:', error)
        }
    }

    const fetchPrograms = async () => {
        try {
            const response = await api.get('/api/programs')
            setPrograms(response.data.data)
        } catch (error) {
            console.error('Error fetching programs:', error)
        }
    }

    const fetchCourses = async () => {
        if (!selectedProgram) return
        try {
            const response = await api.get(`/api/courses?program_id=${selectedProgram}`)
            setCourses(response.data.data)
        } catch (error) {
            console.error('Error fetching courses:', error)
        }
    }

    useEffect(() => {
        fetchCourses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProgram])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.post(`/training`, formData)
            setVisibleXL(false)
            fetchTrainings()
            setFormData({
                program_name: '',
                course_name: '',
                department: '',
                participant: '',
                event_location: '',
                schedule: '',
                start_time: '',
                end_time: '',
            })
        } catch (error) {
            console.error('Error adding training:', error)
        }
    }

    // DATE TIME
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
                                        <CFormLabel htmlFor="program_name">
                                            Training Program Name
                                        </CFormLabel>
                                        <CFormSelect
                                            id="program_name"
                                            name="program_name"
                                            value={formData.program_name}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Program</option>
                                            {programs.map((program) => (
                                                <option key={program.id} value={program.title}>
                                                    {program.title}
                                                </option>
                                            ))}
                                        </CFormSelect>

                                        <CFormLabel htmlFor="course_name">Course Name</CFormLabel>
                                        <CFormSelect
                                            id="course_name"
                                            name="course_name"
                                            value={formData.course_name}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Course</option>
                                            {courses.map((course) => (
                                                <option key={course.id} value={course.title}>
                                                    {course.title}
                                                </option>
                                            ))}
                                        </CFormSelect>

                                        <CFormLabel htmlFor="department">
                                            Select Department
                                        </CFormLabel>
                                        <CFormSelect
                                            id="department"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Department</option>
                                            <option value="HR">HR</option>
                                            <option value="Finance">Finance</option>
                                        </CFormSelect>

                                        <CFormLabel htmlFor="participant">
                                            Select Participant
                                        </CFormLabel>
                                        <CFormSelect
                                            id="participant"
                                            name="participant"
                                            value={formData.participant}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Participant</option>
                                            <option value="Employee 1">Employee 1</option>
                                            <option value="Employee 2">Employee 2</option>
                                        </CFormSelect>

                                        <CFormLabel htmlFor="event_location">
                                            Event Location / Mode
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
                                                Add Training
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
                                    <CTableHeaderCell>Training Program Name</CTableHeaderCell>
                                    <CTableHeaderCell>Course Name</CTableHeaderCell>
                                    <CTableHeaderCell>Department</CTableHeaderCell>
                                    <CTableHeaderCell>Participant</CTableHeaderCell>
                                    <CTableHeaderCell>Event Location</CTableHeaderCell>
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
                                        <CTableHeaderCell>{training.department}</CTableHeaderCell>
                                        <CTableHeaderCell>{training.participant}</CTableHeaderCell>
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
