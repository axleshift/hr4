/* eslint-disable react-hooks/exhaustive-deps */
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

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const TrainingSchedule = () => {
    const [visibleXL, setVisibleXL] = useState(false)
    const [trainings, setTrainings] = useState([])
    const [formData, setFormData] = useState({
        event_title: '',
        delivery_method: '',
        event_location: '',
        schedule: '',
        program_id: '',
        course_id: '',
    })

    const [programs, setPrograms] = useState([])
    const [courses, setCourses] = useState([])
    const [selectedProgram, setSelectedProgram] = useState('')

    useEffect(() => {
        fetchPrograms()
    }, [])

    useEffect(() => {
        fetchCourses()
    }, [selectedProgram])

    const fetchPrograms = async () => {
        try {
            const res = await api.get('/programs')
            setPrograms(res.data)
        } catch (error) {
            console.error('Error fetching programs:', error)
        }
    }

    const fetchCourses = async () => {
        try {
            const res = await api.get(`/courses?program_id=${selectedProgram}`)
            setCourses(res.data)
        } catch (error) {
            console.error('Error fetching courses:', error)
        }
    }

    const fetchTrainings = async () => {
        try {
            const res = await api.get('/trainings')
            setTrainings(res.data)
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
            await api.post(`/trainings`, formData)
            setVisibleXL(false)
            fetchTrainings()
            setFormData({
                event_title: '',
                delivery_method: '',
                event_location: '',
                schedule: '',
                program_id: '',
                course_id: '',
            })
        } catch (error) {
            console.error('Error adding training:', error)
        }
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Calendar View</strong>
                    </CCardHeader>
                    <CCardBody>
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            events={[]} // Leave it empty for now
                            height="auto"
                        />
                    </CCardBody>
                </CCard>

                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Training Schedule</strong>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <CButton color="primary" onClick={() => setVisibleXL(true)}>
                                Add Training
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Program</CTableHeaderCell>
                                    <CTableHeaderCell>Course</CTableHeaderCell>
                                    <CTableHeaderCell>Location</CTableHeaderCell>
                                    <CTableHeaderCell>Schedule</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {trainings.map((training) => (
                                    <CTableRow key={training.id}>
                                        <CTableHeaderCell>
                                            {training.program?.title}
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>
                                            {training.course?.title}
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>
                                            {training.event_location}
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>{training.schedule}</CTableHeaderCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Modal */}
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
                            onChange={(e) => {
                                setFormData({ ...formData, program_id: e.target.value })
                                setSelectedProgram(e.target.value)
                            }}
                            required
                        >
                            <option value="">Select Program</option>
                            {programs.map((program) => (
                                <option key={program.id} value={program.id}>
                                    {program.title}
                                </option>
                            ))}
                        </CFormSelect>

                        <CFormLabel htmlFor="course_id">Course Name</CFormLabel>
                        <CFormSelect
                            id="course_id"
                            name="course_id"
                            value={formData.course_id}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </CFormSelect>

                        <CFormLabel htmlFor="delivery_method">Delivery Method</CFormLabel>
                        <CFormSelect
                            id="delivery_method"
                            name="delivery_method"
                            value={formData.delivery_method}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Delivery Method</option>
                            <option value="In-Person">In-Person</option>
                            <option value="Online">Online</option>
                            <option value="Blended">Blended</option>
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
