import React, { useState, useEffect } from 'react'
import api from '../../../util/api'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CCol,
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTableBody,
    CBadge,
    CButton,
} from '@coreui/react'

const Dashboard = () => {
    const [trainings, setTrainings] = useState([])

    // Fetch training data when the component is mounted
    useEffect(() => {
        fetchTrainings()
    }, [])

    const fetchTrainings = async () => {
        try {
            const response = await api.get('/training')
            setTrainings(response.data.data || []) // Ensure the data is an array
        } catch (error) {
            console.error('Error fetching trainings:', error)
            setTrainings([]) // Fallback to an empty array if there's an error
        }
    }

    // Get the training status
    const getTrainingStatus = (scheduleDate, startTime, endTime) => {
        const now = new Date()
        const start = new Date(`${scheduleDate}T${startTime}`)
        const end = new Date(`${scheduleDate}T${endTime}`)

        // Determine the status based on the time comparison
        if (now < start) return 'Pending' // Training hasn't started yet
        if (now <= end) return 'Ongoing' // Training is ongoing
        return 'Complete' // Training is complete
    }

    // Filter out trainings that are pending
    const pendingTrainings = Array.isArray(trainings)
        ? trainings.filter(
              (training) =>
                  getTrainingStatus(training.schedule, training.start_time, training.end_time) ===
                  'Pending',
          )
        : []

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Training Announcement</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Training Class</CTableHeaderCell>
                                    <CTableHeaderCell>Agenda</CTableHeaderCell>
                                    <CTableHeaderCell>Schedule</CTableHeaderCell>
                                    <CTableHeaderCell>Start Time</CTableHeaderCell>
                                    <CTableHeaderCell>End Time</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {pendingTrainings.length > 0 ? (
                                    pendingTrainings.map((training) => (
                                        <CTableRow key={training.id}>
                                            <CTableHeaderCell>
                                                {training.event_title}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {training.delivery_method}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>{training.schedule}</CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {training.start_time}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>{training.end_time}</CTableHeaderCell>
                                            <CTableHeaderCell>
                                                <CBadge color="warning">Pending</CBadge>
                                            </CTableHeaderCell>
                                        </CTableRow>
                                    ))
                                ) : (
                                    <CTableRow>
                                        <CTableHeaderCell colSpan="6">
                                            No pending trainings
                                        </CTableHeaderCell>
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

export default Dashboard
