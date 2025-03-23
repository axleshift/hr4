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
    CProgress,
    CProgressBar,
    CWidgetStatsA,
} from '@coreui/react'
import { CChartBar, CChartPie } from '@coreui/react-chartjs'
import axios from 'axios'

const BudgetReports = () => {
    const [trainings, setTrainings] = useState([])
    const [filteredTrainings, setFilteredTrainings] = useState([])
    const [search, setSearch] = useState('')

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
                )
                .map((training) => ({
                    ...training,
                    cost_per_session:
                        training.cost_per_session || Math.floor(Math.random() * 500) + 100,
                    actual_cost: training.actual_cost || Math.floor(Math.random() * 700) + 200,
                    budget: training.budget || 1000,
                    roi: ((training.budget - training.actual_cost) / training.budget) * 100,
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

    return (
        <CRow>
            {/* Dashboard Metrics */}
            <CCol xs={12} md={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="primary"
                    value={`₱${trainings.reduce((sum, t) => sum + t.budget, 0).toLocaleString()}`}
                    title="Total Training Budget"
                />
            </CCol>
            <CCol xs={12} md={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="danger"
                    value={`₱${trainings.reduce((sum, t) => sum + t.actual_cost, 0).toLocaleString()}`}
                    title="Total Actual Cost"
                />
            </CCol>
            <CCol xs={12} md={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="success"
                    value={`${(
                        trainings.reduce((sum, t) => sum + t.roi, 0) / trainings.length
                    ).toFixed(2)}%`}
                    title="Average Training ROI"
                />
            </CCol>

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
                                    <CTableHeaderCell>Budget</CTableHeaderCell>
                                    <CTableHeaderCell>Actual Cost</CTableHeaderCell>
                                    <CTableHeaderCell>Budget Utilization</CTableHeaderCell>
                                    <CTableHeaderCell>ROI</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {filteredTrainings.map((training, index) => (
                                    <CTableRow key={training.id}>
                                        <CTableDataCell>{index + 1}</CTableDataCell>
                                        <CTableDataCell>{training.training_class}</CTableDataCell>
                                        <CTableDataCell>{training.agenda}</CTableDataCell>
                                        <CTableDataCell>
                                            ₱{training.budget.toLocaleString()}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            ₱{training.actual_cost.toLocaleString()}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CProgress className="mt-2">
                                                <CProgressBar
                                                    value={
                                                        (training.actual_cost / training.budget) *
                                                        100
                                                    }
                                                    color="info"
                                                >
                                                    {(
                                                        (training.actual_cost / training.budget) *
                                                        100
                                                    ).toFixed(2)}
                                                    %
                                                </CProgressBar>
                                            </CProgress>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CBadge
                                                color={training.roi >= 0 ? 'success' : 'danger'}
                                            >
                                                {training.roi.toFixed(2)}%
                                            </CBadge>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>

                        {/* Charts */}
                        <CRow className="mt-4">
                            <CCol md={6}>
                                <CCard>
                                    <CCardHeader>Budget vs Actual Cost</CCardHeader>
                                    <CCardBody>
                                        <CChartBar
                                            data={{
                                                labels: trainings.map((t) => t.training_class),
                                                datasets: [
                                                    {
                                                        label: 'Budget',
                                                        backgroundColor: '#007bff',
                                                        data: trainings.map((t) => t.budget),
                                                    },
                                                    {
                                                        label: 'Actual Cost',
                                                        backgroundColor: '#dc3545',
                                                        data: trainings.map((t) => t.actual_cost),
                                                    },
                                                ],
                                            }}
                                        />
                                    </CCardBody>
                                </CCard>
                            </CCol>

                            <CCol md={6}>
                                <CCard>
                                    <CCardHeader>Training ROI by Program</CCardHeader>
                                    <CCardBody>
                                        <CChartPie
                                            data={{
                                                labels: trainings.map((t) => t.training_class),
                                                datasets: [
                                                    {
                                                        data: trainings.map((t) => Math.abs(t.roi)),
                                                        backgroundColor: [
                                                            '#28a745',
                                                            '#dc3545',
                                                            '#ffc107',
                                                            '#17a2b8',
                                                        ],
                                                    },
                                                ],
                                            }}
                                        />
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default BudgetReports
