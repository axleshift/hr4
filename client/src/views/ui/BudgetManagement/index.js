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
    const [step, setStep] = useState(1)
    const [programs, setPrograms] = useState([])
    const [courses, setCourses] = useState([])

    const handleNextStep = () => setStep(2)
    const handlePreviousStep = () => setStep(1)

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await api.get(`/api/programs`)
                setPrograms(response.data.data)
            } catch (error) {
                console.error('Error fetching programs:', error)
            }
        }
        fetchPrograms()
    }, [])

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
            setStep(1)
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
                <CModalHeader>Budger Form</CModalHeader>
                <CModalBody>
                    <CForm>
                        {step === 1 && (
                            <>
                                <CRow className="mb-3">
                                    <CCol>
                                        <h5 className="fw-bold">TRAINING PROJECT</h5>
                                    </CCol>
                                </CRow>

                                <CFormLabel>Training Program Name</CFormLabel>
                                <CFormSelect
                                    value={programName}
                                    onChange={(e) => setProgramName(e.target.value)}
                                >
                                    <option value="">Select Program</option>
                                    {programs.map((program) => (
                                        <option key={program.id} value={program.id}>
                                            {program.title}
                                        </option>
                                    ))}
                                </CFormSelect>

                                <CFormLabel>Training Course Name</CFormLabel>
                                <CFormSelect
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                >
                                    <option value="">Select Course</option>
                                    <option value="Course A">Course A</option>
                                    <option value="Course B">Course B</option>
                                </CFormSelect>

                                <CFormLabel>Department</CFormLabel>
                                <CFormSelect
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                >
                                    <option value="">Select Department</option>
                                    <option value="HR">HR</option>
                                    <option value="Finance">Finance</option>
                                </CFormSelect>

                                <CFormLabel>Participant</CFormLabel>
                                <CFormSelect
                                    value={participant}
                                    onChange={(e) => setParticipant(e.target.value)}
                                >
                                    <option value="">Select Participant</option>
                                    <option value="Employee 1">Employee 1</option>
                                    <option value="Employee 2">Employee 2</option>
                                </CFormSelect>

                                <CButton
                                    color="primary"
                                    onClick={() => setStep(2)}
                                    className="mt-3"
                                >
                                    Next
                                </CButton>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                {/* Project Budget Section */}
                                <CRow className="mb-3">
                                    <CCol>
                                        <h5 className="fw-bold">PROJECT BUDGET</h5>
                                    </CCol>
                                </CRow>
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

                                <CButton
                                    color="secondary"
                                    onClick={handlePreviousStep}
                                    className="mt-3"
                                >
                                    Back
                                </CButton>
                                <CButton
                                    color="primary"
                                    onClick={handleAddBudget}
                                    className="mt-3 ms-2"
                                >
                                    Save
                                </CButton>
                            </>
                        )}
                    </CForm>
                </CModalBody>
            </CModal>
        </CRow>
    )
}

export default BudgetReports
