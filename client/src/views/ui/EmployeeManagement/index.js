import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CBadge,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
} from '@coreui/react'
import api from '../../../util/api'
import axios from 'axios'

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([])
    const [newHires, setNewHires] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [newStatus, setNewStatus] = useState('')

    useEffect(() => {
        fetchEmployees()
        fetchNewHires()
    }, [])

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('https://backend-hr1.axleshift.com/api/employees')
            setEmployees(response.data.data || response.data)
        } catch (error) {
            console.error('Error fetching external employees:', error)
            try {
                const localResponse = await api.get('/api/employee')
                setEmployees(localResponse.data.data)
            } catch (localError) {
                console.error('Error fetching local employees:', localError)
            }
        }
    }

    const fetchNewHires = async () => {
        try {
            const response = await axios.get('https://backend-hr1.axleshift.com/api/newhires')
            setNewHires(response.data.data || response.data)
        } catch (error) {
            console.error('Error fetching new hires:', error)
        }
    }

    const getFullName = (employee) => {
        const middle = employee.middleName ? ` ${employee.middleName}` : ''
        return `${employee.firstName}${middle} ${employee.lastName}`
    }

    const updateEmployeeStatus = async (employeeId, status) => {
        try {
            await api.put(`/api/employee-status/${employeeId}`, { status })
            fetchEmployees()
            setModalVisible(false)
        } catch (error) {
            console.error(`Error updating status for ${employeeId}:`, error)
        }
    }

    const openModal = (employee) => {
        setSelectedEmployee(employee)
        setNewStatus(employee.status || 'pending') // Default to current status
        setModalVisible(true)
    }

    const handleSave = () => {
        if (selectedEmployee) {
            updateEmployeeStatus(selectedEmployee.employeeId, newStatus)
        }
    }

    const renderEmployeeTable = (data, title) => (
        <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
                <strong>{title}</strong>
            </CCardHeader>
            <CCardBody>
                <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Employee ID</CTableHeaderCell>
                            <CTableHeaderCell>Name</CTableHeaderCell>
                            <CTableHeaderCell>Position</CTableHeaderCell>
                            <CTableHeaderCell>Department</CTableHeaderCell>
                            <CTableHeaderCell>Date Hired</CTableHeaderCell>
                            <CTableHeaderCell>Email</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {data.map((employee) => (
                            <CTableRow key={employee.id}>
                                <CTableDataCell>{employee.employeeId}</CTableDataCell>
                                <CTableDataCell>{getFullName(employee)}</CTableDataCell>
                                <CTableDataCell>{employee.position}</CTableDataCell>
                                <CTableDataCell>{employee.department}</CTableDataCell>
                                <CTableDataCell>{employee.dateHired}</CTableDataCell>
                                <CTableDataCell>{employee.email}</CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <CBadge color={getStatusBadge(employee.status)}>
                                        {employee.status
                                            ? employee.status.charAt(0).toUpperCase() +
                                              employee.status.slice(1)
                                            : 'Pending'}
                                    </CBadge>
                                    <CButton
                                        color="primary"
                                        onClick={() => openModal(employee)}
                                        className="ms-2"
                                    >
                                        Change Status
                                    </CButton>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )

    const getStatusBadge = (status) => {
        switch ((status || '').toLowerCase()) {
            case 'passed':
                return 'success'
            case 'ongoing':
                return 'warning'
            case 'failed':
                return 'danger'
            case 'pending':
            default:
                return 'secondary'
        }
    }

    return (
        <CRow>
            <CCol xs={12}>
                {renderEmployeeTable(employees, 'Employee Management')}
                {renderEmployeeTable(newHires, 'New Hires')}
            </CCol>

            {/* Modal for changing status */}
            <CModal show={modalVisible} onClose={() => setModalVisible(false)} size="lg">
                <CModalHeader closeButton>
                    <CModalTitle>
                        Change Status for {selectedEmployee && getFullName(selectedEmployee)}
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <select
                        className="form-select"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="passed">Passed</option>
                        <option value="failed">Failed</option>
                    </select>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalVisible(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={handleSave}>
                        Save Changes
                    </CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )
}

export default EmployeeManagement
