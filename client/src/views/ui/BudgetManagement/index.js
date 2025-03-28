import React, { useState } from 'react'
import api from '../../../util/api'
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
    CButton,
    CWidgetStatsA,
} from '@coreui/react'

const BudgetReports = () => {
    const [budgets, setBudgets] = useState([])
    const [setformId, setFormId] = useState('')
    const [programName, setProgramName] = useState('')
    const [cost, setCost] = useState('')
    const [status, setStatus] = useState('Pending')

    const handleAddBudget = () => {
        if (programName && cost) {
            setBudgets([
                ...budgets,
                { id: budgets.length + 1, setformId, programName, cost, status },
            ])
            setFormId('')
            setProgramName('')
            setCost('')
        }
    }

    return (
        <CRow>
            {/* Dashboard Widgets */}
            <CCol xs={12} md={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="primary"
                    value="₱0"
                    title="Total Training Budget"
                />
            </CCol>
            <CCol xs={12} md={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="danger"
                    value="₱0"
                    title="Total Actual Cost"
                />
            </CCol>
            <CCol xs={12} md={6} lg={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="success"
                    value="0%"
                    title="Average Training ROI"
                />
            </CCol>

            {/* Button and Table */}
            <CCol xs={12} className="mb-3 d-flex justify-content-between">
                <CButton color="primary" onClick={handleAddBudget}>
                    Add Budget
                </CButton>
            </CCol>
            <CCol xs={12}>
                <CTable striped hover>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>ID</CTableHeaderCell>
                            <CTableHeaderCell>Form ID</CTableHeaderCell>
                            <CTableHeaderCell>Training Program</CTableHeaderCell>
                            <CTableHeaderCell>Status</CTableHeaderCell>
                            <CTableHeaderCell>Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {budgets.length > 0 ? (
                            budgets.map((budget) => (
                                <CTableRow key={budget.id}>
                                    <CTableDataCell>{budget.id}</CTableDataCell>
                                    <CTableDataCell>{Form.id}</CTableDataCell>
                                    <CTableDataCell>{budget.programName}</CTableDataCell>
                                    <CTableDataCell>{budget.status}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton color="info" variant="outline">
                                            More Info
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))
                        ) : (
                            <CTableRow>
                                <CTableDataCell colSpan="5" className="text-center">
                                    No Budget Reports Available
                                </CTableDataCell>
                            </CTableRow>
                        )}
                    </CTableBody>
                </CTable>
            </CCol>
        </CRow>
    )
}

export default BudgetReports
