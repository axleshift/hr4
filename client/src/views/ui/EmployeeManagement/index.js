/* eslint-disable react-hooks/exhaustive-deps */
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
    CFormSelect, // For the filter dropdown
} from '@coreui/react'
import api from '../../../../util/api'
import axios from 'axios'

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([])
    const [newHires, setNewHires] = useState([])
    const [filteredEmployees, setFilteredEmployees] = useState([])
    const [sortOrder, setSortOrder] = useState({ column: 'employeeId', direction: 'asc' })
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        fetchEmployees()
        fetchNewHires()
    }, [])

    useEffect(() => {
        filterAndSortEmployees()
    }, [employees, newHires, filter, sortOrder])

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

    const filterAndSortEmployees = () => {
        let filtered = filter === 'newHires' ? newHires : employees
        // Sorting
        filtered = filtered.sort((a, b) => {
            if (a[sortOrder.column] < b[sortOrder.column]) {
                return sortOrder.direction === 'asc' ? -1 : 1
            }
            if (a[sortOrder.column] > b[sortOrder.column]) {
                return sortOrder.direction === 'asc' ? 1 : -1
            }
            return 0
        })
        setFilteredEmployees(filtered)
    }

    const getFullName = (employee) => {
        const middle = employee.middleName ? ` ${employee.middleName}` : ''
        return `${employee.firstName}${middle} ${employee.lastName}`
    }

    const updateEmployeeStatus = async (employeeId, status) => {
        try {
            await api.put(`/api/employee-status/${employeeId}`, { status })
            fetchEmployees()
        } catch (error) {
            console.error(`Error updating status for ${employeeId}:`, error)
        }
    }

    const renderStatusBadge = (status) => {
        let color = 'secondary'

        if (status === 'pending') {
            color = 'warning'
        } else if (status === 'completed') {
            color = 'success'
        } else if (status === 'in-progress') {
            color = 'info'
        }

        return <CBadge color={color}>{status}</CBadge>
    }

    const handleSort = (column) => {
        const direction = sortOrder.direction === 'asc' ? 'desc' : 'asc'
        setSortOrder({ column, direction })
    }

    const renderEmployeeTable = (data) => (
        <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
                <strong>Employee Management</strong>
                <CFormSelect
                    aria-label="Filter by"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ width: '200px' }}
                >
                    <option value="all">All Employees</option>
                    <option value="newHires">New Hires</option>
                </CFormSelect>
            </CCardHeader>
            <CCardBody>
                <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell onClick={() => handleSort('employeeId')}>
                                Employee ID
                            </CTableHeaderCell>
                            <CTableHeaderCell onClick={() => handleSort('firstName')}>
                                Name
                            </CTableHeaderCell>
                            <CTableHeaderCell onClick={() => handleSort('position')}>
                                Position
                            </CTableHeaderCell>
                            <CTableHeaderCell onClick={() => handleSort('department')}>
                                Department
                            </CTableHeaderCell>
                            <CTableHeaderCell onClick={() => handleSort('dateHired')}>
                                Date Hired
                            </CTableHeaderCell>
                            <CTableHeaderCell onClick={() => handleSort('email')}>
                                Email
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                className="text-center"
                                onClick={() => handleSort('status')}
                            >
                                Status
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                        {data.slice(0, 5).map(
                            (
                                employee, // Only display the first 5 employees
                            ) => (
                                <CTableRow key={employee.id}>
                                    <CTableDataCell>{employee.employeeId}</CTableDataCell>
                                    <CTableDataCell>{getFullName(employee)}</CTableDataCell>
                                    <CTableDataCell>{employee.position}</CTableDataCell>
                                    <CTableDataCell>{employee.department}</CTableDataCell>
                                    <CTableDataCell>{employee.dateHired}</CTableDataCell>
                                    <CTableDataCell>{employee.email}</CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        {employee.trainingStatus
                                            ? renderStatusBadge(employee.trainingStatus.status)
                                            : renderStatusBadge('pending')}
                                    </CTableDataCell>
                                </CTableRow>
                            ),
                        )}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )

    return (
        <CRow>
            <CCol xs={12}>{renderEmployeeTable(filteredEmployees)}</CCol>
        </CRow>
    )
}

export default EmployeeManagement
