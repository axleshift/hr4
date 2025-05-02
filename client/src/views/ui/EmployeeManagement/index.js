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
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CButton,
    CBadge,
    CFormSelect, // Change this line
} from '@coreui/react'
import api from '../../../util/api'
import axios from 'axios'

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([])
    const [newHires, setNewHires] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [status, setStatus] = useState('')

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
            setModalVisible(false) // Close modal after successful status update
        } catch (error) {
            console.error(`Error updating status for ${employeeId}:`, error)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'ongoing':
                return 'warning'
            case 'passed':
                return 'success'
            case 'failed':
                return 'danger'
            default:
                return 'secondary'
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
                            <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
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
                                    <CBadge color={getStatusColor(employee.status)}>
                                        {employee.status}
                                    </CBadge>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => openModal(employee)}
                                    >
                                        Action
                                    </button>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )

    const openModal = (employee) => {
        setSelectedEmployee(employee)
        setStatus(employee.status || 'pending') // Set the status to the current status of the employee
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
        setSelectedEmployee(null)
    }

    return (
        <CRow>
            <CCol xs={12}>
                {renderEmployeeTable(employees, 'Employee Management')}
                {renderEmployeeTable(newHires, 'New Hires')}
            </CCol>

            {/* Modal */}
            {selectedEmployee && (
                <CModal visible={modalVisible} onClose={closeModal}>
                    <CModalHeader>
                        <strong>{getFullName(selectedEmployee)}</strong>{' '}
                        {/* Employee name in the modal title */}
                    </CModalHeader>
                    <CModalBody>
                        {/* Status update inside the modal */}
                        <div>
                            <label>Status</label>
                            <CFormSelect value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="pending">Pending</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="passed">Passed</option>
                                <option value="failed">Failed</option>
                            </CFormSelect>
                        </div>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={closeModal}>
                            Close
                        </CButton>
                        <CButton
                            color="primary"
                            onClick={() =>
                                updateEmployeeStatus(selectedEmployee.employeeId, status)
                            }
                        >
                            Update Status
                        </CButton>
                    </CModalFooter>
                </CModal>
            )}
        </CRow>
    )
}

export default EmployeeManagement
