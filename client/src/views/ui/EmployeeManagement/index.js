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
    CBadge,
} from '@coreui/react'
import api from '../../../util/api'
import axios from 'axios'

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([])
    const [newHires, setNewHires] = useState([])
    const [filterText, setFilterText] = useState('')

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

    const allEmployees = [...employees, ...newHires]

    const filteredEmployees = allEmployees.filter((employee) =>
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

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader className="d-flex justify-content-between align-items-center">
                        <strong>Employee Management</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CFormInput
                            className="mb-3"
                            placeholder="Search by ID, name, position, department, etc..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>Employee ID</CTableHeaderCell>
                                        <CTableHeaderCell>Name</CTableHeaderCell>
                                        <CTableHeaderCell>Position</CTableHeaderCell>
                                        <CTableHeaderCell>Department</CTableHeaderCell>
                                        <CTableHeaderCell>Date Hired</CTableHeaderCell>
                                        <CTableHeaderCell>Email</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">
                                            Status
                                        </CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {filteredEmployees.length > 0 ? (
                                        filteredEmployees.map((employee) => (
                                            <CTableRow key={employee.id}>
                                                <CTableDataCell>
                                                    {employee.employeeId}
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    {getFullName(employee)}
                                                </CTableDataCell>
                                                <CTableDataCell>{employee.position}</CTableDataCell>
                                                <CTableDataCell>
                                                    {employee.department}
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    {employee.dateHired}
                                                </CTableDataCell>
                                                <CTableDataCell>{employee.email}</CTableDataCell>
                                                <CTableDataCell className="text-center">
                                                    {getStatusBadge(employee.status)}
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))
                                    ) : (
                                        <CTableRow>
                                            <CTableDataCell colSpan={7} className="text-center">
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
    )
}

export default EmployeeManagement
