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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilUser, cilUserFemale } from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const TalentManagement = () => {
    const tableExample = [
        {
            avatar: { src: avatar1, status: 'success' },
            user: { name: 'Cristy', new: true, registered: 'Jan 1, 2023' },
            role: 'Driver',
            usage: { value: 50, period: '', color: 'success' },
            activity: '10 sec ago',
        },
        {
            avatar: { src: avatar5, status: 'success' },
            user: { name: 'Malabad ', new: true, registered: 'Jan 1, 2023' },
            role: 'Shipping Coordinator',
            usage: { value: 12, period: '', color: 'primary' },
            activity: 'Last week',
        },
        {
            avatar: { src: avatar3, status: 'warning' },
            user: { name: 'Bench', new: true, registered: 'Jan 1, 2023' },
            role: 'Logistics Coordinator',
            usage: { value: 74, period: '', color: 'warning' },
            activity: '1 hour ago',
        },
        {
            avatar: { src: avatar4, status: 'secondary' },
            user: { name: 'Tidoso', new: true, registered: 'Jan 1, 2023' },
            role: 'Forklift Operator',
            usage: { value: 98, period: '', color: 'danger' },
            activity: 'Last month',
        },
        {
            avatar: { src: avatar5, status: 'success' },
            user: { name: 'Guma ', new: true, registered: 'Jan 1, 2023' },
            role: 'Shipping Coordinator',
            usage: { value: 22, period: '', color: 'primary' },
            activity: 'Last week',
        },
    ]

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody>
                        {/* Table */}
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead className="text-nowrap">
                                <CTableRow>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        <CIcon icon={cilPeople} />
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">
                                        User
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        Role
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">
                                        Usage
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">
                                        Activity
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {tableExample.map((item, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell className="text-center">
                                            <CAvatar
                                                size="md"
                                                src={item.avatar.src}
                                                status={item.avatar.status}
                                            />
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.user.name}</div>
                                            <div className="small text-body-secondary text-nowrap">
                                                <span>{item.user.new ? 'New' : 'Recurring'}</span> |
                                                Registered: {item.user.registered}
                                            </div>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            {item.role}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div className="d-flex justify-content-between text-nowrap">
                                                <div className="fw-semibold">
                                                    {item.usage.value}%
                                                </div>
                                                <div className="ms-3">
                                                    <small className="text-body-secondary">
                                                        {item.usage.period}
                                                    </small>
                                                </div>
                                            </div>
                                            <CProgress
                                                thin
                                                color={item.usage.color}
                                                value={item.usage.value}
                                            />
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div className="small text-body-secondary text-nowrap">
                                                Last login
                                            </div>
                                            <div className="fw-semibold text-nowrap">
                                                {item.activity}
                                            </div>
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

export default TalentManagement
