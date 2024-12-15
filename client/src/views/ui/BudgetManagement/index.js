import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CCol,
    CTable,
    CTableBody,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTableDataCell,
    CInputGroup,
    CInputGroupText,
    CFormInput,
    CBadge,
    CButton,
    CToast,
    CToastBody,
    CToastHeader,
} from '@coreui/react'
import axios from 'axios'

const BudgetReports = () => {
    const [trainings, setTrainings] = useState([])
    const [filteredTrainings, setFilteredTrainings] = useState([])
    const [search, setSearch] = useState('')
    const [toastVisible, setToastVisible] = useState(false)
    const [selectedTraining, setSelectedTraining] = useState(null)

    const conversionRate = 0.018 // Example conversion rate (₱1 = $0.018)
    const fixedParticipants = 10 // Fixed number of participants

    useEffect(() => {
        fetchTrainings()
    }, [])

    const fetchTrainings = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/training')
            const completedTrainings = response.data.data
                .filter(
                    (training) =>
                        new Date() > new Date(`${training.schedule}T${training.end_time}`),
                ) // Filter for completed trainings
                .map((training) => ({
                    ...training,
                    cost_per_session:
                        training.cost_per_session || Math.floor(Math.random() * 500) + 100, // Random example cost
                    num_trainees: fixedParticipants, // Fixed number of trainees
                    training_hours: training.training_hours || 10, // Example number of hours
                }))
            setTrainings(completedTrainings)
            setFilteredTrainings(completedTrainings)
        } catch (error) {
            console.error('Error fetching trainings:', error)
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase()
        setSearch(value)
        setFilteredTrainings(
            trainings.filter(
                (training) =>
                    training.training_class.toLowerCase().includes(value) ||
                    training.agenda.toLowerCase().includes(value),
            ),
        )
    }

    const getRecommendation = (cost) => {
        if (cost < 200) return { label: 'Low Priority', color: 'success' }
        if (cost >= 200 && cost <= 400) return { label: 'Review', color: 'warning' }
        return { label: 'High Spend', color: 'danger' }
    }

    const handleViewDetails = (training) => {
        // Compute additional metrics
        const costPerTrainee = (training.cost_per_session / fixedParticipants).toFixed(2)
        const trainingHoursPerCost = (training.training_hours / training.cost_per_session).toFixed(
            2,
        )
        const totalTrainingBudget = training.cost_per_session * fixedParticipants

        setSelectedTraining({
            ...training,
            costPerTrainee,
            trainingHoursPerCost,
            totalTrainingBudget,
        })
        setToastVisible(true)
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardHeader>
                        <strong>Completed Training Budget Reports</strong>
                    </CCardHeader>
                    <CCardBody>
                        {/* Search Bar */}
                        <CInputGroup className="mb-3">
                            <CInputGroupText>Search</CInputGroupText>
                            <CFormInput
                                placeholder="Filter by Training Class or Agenda"
                                value={search}
                                onChange={handleSearch}
                            />
                        </CInputGroup>

                        {/* Table */}
                        <CTable striped hover>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>#</CTableHeaderCell>
                                    <CTableHeaderCell>Training Class</CTableHeaderCell>
                                    <CTableHeaderCell>Agenda</CTableHeaderCell>
                                    <CTableHeaderCell>Recommendation</CTableHeaderCell>
                                    <CTableHeaderCell>Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {filteredTrainings.map((training, index) => {
                                    return (
                                        <CTableRow key={training.id}>
                                            <CTableDataCell>{index + 1}</CTableDataCell>
                                            <CTableDataCell>
                                                {training.training_class}
                                            </CTableDataCell>
                                            <CTableDataCell>{training.agenda}</CTableDataCell>
                                            <CTableDataCell>
                                                <CBadge
                                                    color={
                                                        getRecommendation(training.cost_per_session)
                                                            .color
                                                    }
                                                    className="ms-2"
                                                >
                                                    {
                                                        getRecommendation(training.cost_per_session)
                                                            .label
                                                    }
                                                </CBadge>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <CButton
                                                    color="info"
                                                    onClick={() => handleViewDetails(training)}
                                                >
                                                    View Details
                                                </CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    )
                                })}
                            </CTableBody>
                        </CTable>

                        {/* Toast Component for displaying details */}
                        {selectedTraining && (
                            <CToast
                                visible={toastVisible}
                                onClose={() => setToastVisible(false)}
                                autohide={true}
                                color="light"
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    minWidth: '300px',
                                    maxWidth: '400px',
                                }}
                            >
                                <CToastHeader>
                                    <strong className="me-auto">Training Details</strong>
                                    <small>Just Now</small>
                                </CToastHeader>
                                <CToastBody>
                                    <strong>Training Class:</strong>{' '}
                                    {selectedTraining.training_class} <br />
                                    <strong>Agenda:</strong> {selectedTraining.agenda} <br />
                                    <strong>Cost per Session (₱):</strong>{' '}
                                    {selectedTraining.cost_per_session} <br />
                                    <strong>Cost per Trainee (₱):</strong>{' '}
                                    {selectedTraining.costPerTrainee} <br />
                                    <strong>Training Hours:</strong>{' '}
                                    {selectedTraining.training_hours} <br />
                                    <strong>Training Hours per Cost:</strong>{' '}
                                    {selectedTraining.trainingHoursPerCost} <br />
                                    <strong>Total Training Budget (₱):</strong>{' '}
                                    {selectedTraining.totalTrainingBudget.toLocaleString()} <br />
                                    <strong>Number of Participants:</strong> {fixedParticipants}{' '}
                                    <br />
                                </CToastBody>
                            </CToast>
                        )}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default BudgetReports
