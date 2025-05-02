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
} from '@coreui/react'
import api from '../../../util/api'
import axios from 'axios'

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([])
    const [newHires, setNewHires] = useState([])

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

    const renderEmployeeTable = (data, title) => (
        <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
                <strong>{title}</strong>
            </CCardHeader>
            <CCardBody>
                <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell className="bg-body-tertiary">
                                Employee ID
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary">Name</CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary">
                                Position
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary">
                                Department
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary">
                                Date Hired
                            </CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                            <CTableHeaderCell className="bg-body-tertiary text-center">
                                Actions
                            </CTableHeaderCell>
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
                                <CTableDataCell className="text-center">—</CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )

    return (
        <CRow>
            <CCol xs={12}>
                {renderEmployeeTable(employees, 'Employee Management')}
                {renderEmployeeTable(newHires, 'New Hires')}
            </CCol>
        </CRow>
    )
}

export default EmployeeManagement
