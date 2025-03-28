import React from 'react'
import {
    CAvatar,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CProgress,
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
import { cilPeople, cilPencil, cilTrash, cilUserPlus } from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const EmployeeManagement = () => {
    const employees = [
        {
            avatar: { src: avatar1, status: 'success' },
            name: 'Cristy',
            registered: 'Jan 1, 2023',
            role: 'Driver',
            usage: { value: 50, color: 'success' },
            lastActivity: '10 sec ago',
        },
        {
            avatar: { src: avatar5, status: 'success' },
            name: 'Malabad',
            registered: 'Jan 1, 2023',
            role: 'Shipping Coordinator',
            usage: { value: 12, color: 'primary' },
            lastActivity: 'Last week',
        },
    ]

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader className="d-flex justify-content-between align-items-center">
                        <strong>Employee Management</strong>
                        <CButton color="primary">
                            <CIcon icon={cilUserPlus} className="me-2" /> Add Employee
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        <CIcon icon={cilPeople} />
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">
                                        Name
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        Role
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">
                                        Usage
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">
                                        Last Activity
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        Actions
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {employees.map((emp, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell className="text-center">
                                            <CAvatar
                                                size="md"
                                                src={emp.avatar.src}
                                                status={emp.avatar.status}
                                            />
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{emp.name}</div>
                                            <div className="small text-body-secondary text-nowrap">
                                                Registered: {emp.registered}
                                            </div>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            {emp.role}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CProgress
                                                thin
                                                color={emp.usage.color}
                                                value={emp.usage.value}
                                            />
                                        </CTableDataCell>
                                        <CTableDataCell>{emp.lastActivity}</CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CButton color="info" size="sm" className="me-2">
                                                <CIcon icon={cilPencil} />
                                            </CButton>
                                            <CButton color="danger" size="sm">
                                                <CIcon icon={cilTrash} />
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

export default EmployeeManagement
