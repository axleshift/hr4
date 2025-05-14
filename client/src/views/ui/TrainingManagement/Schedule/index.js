/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
    const [programs, setPrograms] = useState([])
    const [courses, setCourses] = useState([])
    const [departments, setDepartments] = useState([])
    const [selectedProgram, setSelectedProgram] = useState('')

    const [formData, setFormData] = useState({
        delivery_method: '',
        department_id: '',
        event_location: '',
        schedule: '',
        program_id: '',
        course_id: '',
    })

    useEffect(() => {
        fetchPrograms()
        fetchDepartments()
        fetchTrainings()
    }, [])

    useEffect(() => {
        fetchCourses()
    }, [selectedProgram])

    const fetchPrograms = async () => {
        try {
            const response = await api.get('/api/programs')
            setPrograms(response.data.data)
        } catch (error) {
            console.error('Error fetching programs:', error)
        }
    }

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('https://backend-hr1.axleshift.com/api/employees')
            const fetchedEmployees = response.data.data || response.data
            const departmentsList = fetchedEmployees.map((employee) => employee.department)
            const uniqueDepartments = [...new Set(departmentsList)]
            setDepartments(uniqueDepartments)
        } catch (error) {
            console.error('Error fetching departments:', error)
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

    const fetchTrainings = async () => {
        try {
            const response = await api.get('/api/training')
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
            await api.post('/api/training', formData)
            setVisibleXL(false)
            fetchTrainings()
            setFormData({
                delivery_method: '',
                department_id: '',
                event_location: '',
                schedule: '',
                program_id: '',
                course_id: '',
            })
        } catch (error) {
            console.error('Error adding training:', error)
        }
    }

    // Calendar Events derived from training data
    const calendarEvents = trainings.map((training) => ({
        title: `${training.course?.title || 'No Title'} (${training.delivery_method})`,
        date: training.schedule,
    }))

    return (
        <CRow>
            <CCol xs={12}>
                {/* Calendar View */}
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Calendar View</strong>
                    </CCardHeader>
                    <CCardBody>
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            events={calendarEvents}
                            height="auto"
                        />
                    </CCardBody>
                </CCard>

                {/* Training List View */}
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
                        <CTable hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>#</CTableHeaderCell>
                                    <CTableHeaderCell>Program</CTableHeaderCell>
                                    <CTableHeaderCell>Course</CTableHeaderCell>
                                    <CTableHeaderCell>Delivery Method</CTableHeaderCell>
                                    <CTableHeaderCell>Department</CTableHeaderCell>
                                    <CTableHeaderCell>Location</CTableHeaderCell>
                                    <CTableHeaderCell>Schedule</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {trainings.length === 0 ? (
                                    <CTableRow>
                                        <CTableHeaderCell
                                            colSpan="7"
                                            className="text-center text-muted"
                                        >
                                            No training records available.
                                        </CTableHeaderCell>
                                    </CTableRow>
                                ) : (
                                    trainings.map((training, index) => (
                                        <CTableRow key={training.id}>
                                            <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {training.program?.title || 'N/A'}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {training.course?.title || 'N/A'}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {training.delivery_method || 'N/A'}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {training.department_id || 'N/A'}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {training.event_location || 'N/A'}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {training.schedule
                                                    ? new Date(
                                                          training.schedule,
                                                      ).toLocaleDateString()
                                                    : 'N/A'}
                                            </CTableHeaderCell>
                                        </CTableRow>
                                    ))
                                )}
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

                        <CFormLabel htmlFor="department_id">Department</CFormLabel>
                        <CFormSelect
                            id="department_id"
                            name="department_id"
                            value={formData.department_id}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept, index) => (
                                <option key={index} value={dept}>
                                    {dept}
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
