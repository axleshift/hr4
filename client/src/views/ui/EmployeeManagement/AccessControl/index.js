import React, { useState, useEffect } from 'react'
import api from '../../../../util/api'
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
    CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUserPlus, cilOptions } from '@coreui/icons'

const mockEmployees = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: { name: 'Admin' } },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: { name: 'Manager' } },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', role: { name: 'Employee' } },
]

const AccessControl = () => {
    const [employees, setEmployees] = useState([])

    const fetchEmployees = async () => {
        try {
            const response = await api.get(`/api/users`)
            setEmployees(response.data)
        } catch (error) {
            console.error('Error fetching employees:', error)
            setEmployees(mockEmployees) // Use mock data if API call fails
        }
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader className="d-flex justify-content-between align-items-center">
                        <strong>Access Control</strong>
                        <CButton color="primary">
                            <CIcon icon={cilUserPlus} className="me-2" /> Add User
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell className="bg-body-tertiary">
                                        Name
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">
                                        Email
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        Role
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        More
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {employees.map((emp) => (
                                    <CTableRow key={emp.id}>
                                        <CTableDataCell>{emp.name}</CTableDataCell>
                                        <CTableDataCell>{emp.email}</CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            {emp.role?.name || 'No Role'}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CButton color="secondary" size="sm">
                                                <CIcon icon={cilOptions} /> More
                                            </CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AccessControl
