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
    CFormInput,
    CFormSelect,
    CBadge,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react'
import api from '../../../util/api'
import axios from 'axios'

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([])
    const [newHires, setNewHires] = useState([])
    const [filterText, setFilterText] = useState('')
    const [employeeTypeFilter, setEmployeeTypeFilter] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [statusUpdate, setStatusUpdate] = useState('pending')

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

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return <CBadge color="success">Completed</CBadge>
            case 'in progress':
                return <CBadge color="warning">In Progress</CBadge>
            case 'pending':
            default:
                return <CBadge color="secondary">Pending</CBadge>
        }
    }

    const handleEditStatus = (employee) => {
        setSelectedEmployee(employee)
        setStatusUpdate(employee.status || 'pending')
        setShowModal(true)
    }

    const handleUpdateStatus = async () => {
        if (!selectedEmployee) return
        try {
            await api.put(`/api/employee-training-status/${selectedEmployee.id}`, {
                status: statusUpdate,
            })
            const updateStatusInList = (list) =>
                list.map((emp) =>
                    emp.id === selectedEmployee.id ? { ...emp, status: statusUpdate } : emp,
                )
            setEmployees((prev) => updateStatusInList(prev))
            setNewHires((prev) => updateStatusInList(prev))
            setShowModal(false)
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    const allEmployees = [
        ...employees.map((e) => ({ ...e, source: 'regular' })),
        ...newHires.map((n) => ({ ...n, source: 'new' })),
    ]

    const filteredByType = allEmployees.filter((employee) => {
        if (employeeTypeFilter === 'new') return employee.source === 'new'
        if (employeeTypeFilter === 'regular') return employee.source === 'regular'
        return true
    })

    const filteredEmployees = filteredByType.filter((employee) =>
        [
            employee.employeeId,
            employee.firstName,
            employee.middleName,
            employee.lastName,
            employee.position,
            employee.department,
            employee.email,
            employee.dateHired,
        ]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(filterText.toLowerCase())),
    )

    const handleSaveToDatabase = async () => {
        try {
            const localEmployees = await api.get('/api/employee')
            const existingEmployeeIds = localEmployees.data.data.map((e) => e.employeeId)
            const existingEmails = localEmployees.data.data.map((e) => e.email)

            const employeesToSave = allEmployees.filter(
                (emp) =>
                    !existingEmployeeIds.includes(emp.employeeId) &&
                    !existingEmails.includes(emp.email),
            )

            for (const employee of employeesToSave) {
                try {
                    const employeeData = {
                        employeeId: employee.employeeId,
                        lastName: employee.lastName,
                        firstName: employee.firstName,
                        middleName: employee.middleName,
                        position: employee.position,
                        department: employee.department,
                        dateHired: employee.dateHired,
                        email: employee.email,
                    }
                    await api.post('/api/employee', employeeData)
                } catch (err) {
                    console.error(
                        `Failed to save employee ${employee.employeeId}:`,
                        err.response?.data || err.message,
                    )
                }
            }

            alert('Save completed.')
        } catch (err) {
            console.error('Failed to save employees:', err)
        }
    }

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader className="d-flex justify-content-between align-items-center">
                            <strong>Employee Management</strong>
                            <CButton size="sm" color="success" onClick={handleSaveToDatabase}>
                                Save to Database
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="mb-3">
                                <CCol md={6}>
                                    <CFormInput
                                        placeholder="Search by ID, name, position, department, etc..."
                                        value={filterText}
                                        onChange={(e) => setFilterText(e.target.value)}
                                    />
                                </CCol>
                                <CCol md={3}>
                                    <CFormSelect
                                        value={employeeTypeFilter}
                                        onChange={(e) => setEmployeeTypeFilter(e.target.value)}
                                    >
                                        <option value="all">All Employees</option>
                                        <option value="new">New Hires Only</option>
                                        <option value="regular">Regular Employees Only</option>
                                    </CFormSelect>
                                </CCol>
                            </CRow>

                            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <CTable align="middle" className="mb-0 border" hover responsive>
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell>#</CTableHeaderCell>
                                            <CTableHeaderCell>EmployeeID</CTableHeaderCell>
                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                            <CTableHeaderCell>Position</CTableHeaderCell>
                                            <CTableHeaderCell>Department</CTableHeaderCell>
                                            <CTableHeaderCell>Date Hired</CTableHeaderCell>
                                            <CTableHeaderCell>Email</CTableHeaderCell>
                                            <CTableHeaderCell className="text-center">
                                                Status
                                            </CTableHeaderCell>
                                            <CTableHeaderCell className="text-center">
                                                Action
                                            </CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {filteredEmployees.length > 0 ? (
                                            filteredEmployees.map((employee) => (
                                                <CTableRow key={employee.employeeId}>
                                                    <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                                                    <CTableDataCell>
                                                        {employee.employeeId}
                                                    </CTableDataCell>
                                                    <CTableDataCell>
                                                        {getFullName(employee)}
                                                    </CTableDataCell>
                                                    <CTableDataCell>
                                                        {employee.position}
                                                    </CTableDataCell>
                                                    <CTableDataCell>
                                                        {employee.department}
                                                    </CTableDataCell>
                                                    <CTableDataCell>
                                                        {employee.dateHired}
                                                    </CTableDataCell>
                                                    <CTableDataCell>
                                                        {employee.email}
                                                    </CTableDataCell>
                                                    <CTableDataCell className="text-center">
                                                        {getStatusBadge(employee.status)}
                                                    </CTableDataCell>
                                                    <CTableDataCell className="text-center">
                                                        <CButton
                                                            color="primary"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleEditStatus(employee)
                                                            }
                                                        >
                                                            Edit Status
                                                        </CButton>
                                                    </CTableDataCell>
                                                </CTableRow>
                                            ))
                                        ) : (
                                            <CTableRow>
                                                <CTableDataCell colSpan={9} className="text-center">
                                                    No employees found.
                                                </CTableDataCell>
                                            </CTableRow>
                                        )}
                                    </CTableBody>
                                </CTable>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CModal visible={showModal} onClose={() => setShowModal(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Edit Training Status</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormSelect
                        value={statusUpdate}
                        onChange={(e) => setStatusUpdate(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </CFormSelect>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={handleUpdateStatus}>
                        Save
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default EmployeeManagement
