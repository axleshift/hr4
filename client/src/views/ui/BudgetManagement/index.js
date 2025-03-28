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
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CForm,
    CFormLabel,
    CFormSelect,
} from '@coreui/react'

const BudgetReports = () => {
    const [budgets, setBudgets] = useState([])
    const [formId, setFormId] = useState('')
    const [programName, setProgramName] = useState('')
    const [courseName, setCourseName] = useState('')
    const [trainingDate, setTrainingDate] = useState('')
    const [department, setDepartment] = useState('')
    const [participant, setParticipant] = useState('')
    const [cost, setCost] = useState('')
    const [status, setStatus] = useState('Pending')
    const [modalVisible, setModalVisible] = useState(false)

    const handleAddBudget = () => {
        if (programName && cost) {
            setBudgets([
                ...budgets,
                {
                    id: budgets.length + 1,
                    formId,
                    programName,
                    courseName,
                    trainingDate,
                    department,
                    participant,
                    cost,
                    status,
                },
            ])
            setFormId('')
            setProgramName('')
            setCourseName('')
            setTrainingDate('')
            setDepartment('')
            setParticipant('')
            setCost('')
            setModalVisible(false)
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
            <CCol xs={12} className="mb-3 d-flex justify-content-end">
                <CButton color="primary" onClick={() => setModalVisible(true)}>
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
                                    <CTableDataCell>{budget.formId}</CTableDataCell>
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

            {/* Add Budget Modal */}
            <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <CModalHeader>Add Budget</CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormLabel>Training Program Name</CFormLabel>
                        <CFormInput
                            value={programName}
                            onChange={(e) => setProgramName(e.target.value)}
                        />

                        <CFormLabel>Training Course Name</CFormLabel>
                        <CFormInput
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                        />

                        <CFormLabel>Training Date</CFormLabel>
                        <CFormInput
                            type="date"
                            value={trainingDate}
                            onChange={(e) => setTrainingDate(e.target.value)}
                        />

                        <CFormLabel>Department</CFormLabel>
                        <CFormInput
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />

                        <CFormLabel>Participant</CFormLabel>
                        <CFormInput
                            value={participant}
                            onChange={(e) => setParticipant(e.target.value)}
                        />

                        <CFormLabel>Instructor / Trainer Fees</CFormLabel>
                        <CFormInput type="number" />

                        <CFormLabel>Training Materials</CFormLabel>
                        <CFormInput type="number" />

                        <CFormLabel>Venue / Facility Costs</CFormLabel>
                        <CFormInput type="number" />

                        <CFormLabel>Travel & Accommodation</CFormLabel>
                        <CFormInput type="number" />

                        <CFormLabel>Contingency Fund</CFormLabel>
                        <CFormInput type="number" />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalVisible(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={handleAddBudget}>
                        Save
                    </CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )
}

export default BudgetReports
