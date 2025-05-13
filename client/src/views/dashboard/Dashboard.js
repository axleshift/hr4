import React from 'react'
import classNames from 'classnames'

import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
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
import {
    cibCcMastercard,
    cibCcStripe,
    cibCcVisa,
    cibGoogle,
    cibFacebook,
    cibLinkedin,
    cibTwitter,
    cilCloudDownload,
    cilPeople,
    cilUser,
    cilUserFemale,
} from '@coreui/icons'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

const Dashboard = () => {
    const progressExample = [
        { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
        { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
        { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
        { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
        { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
    ]

    const progressGroupExample1 = [
        { title: 'Monday', value1: 34, value2: 78 },
        { title: 'Tuesday', value1: 56, value2: 94 },
        { title: 'Wednesday', value1: 12, value2: 67 },
        { title: 'Thursday', value1: 43, value2: 91 },
        { title: 'Friday', value1: 22, value2: 73 },
        { title: 'Saturday', value1: 53, value2: 82 },
        { title: 'Sunday', value1: 9, value2: 69 },
    ]

    const progressGroupExample2 = [
        { title: 'Male', icon: cilUser, value: 53 },
        { title: 'Female', icon: cilUserFemale, value: 43 },
    ]

    const progressGroupExample3 = [
        { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
        { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
        { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
        { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
    ]

    const tableExample = [
        {
            avatar: { status: 'active' }, // active → green dot
            user: {
                name: 'Yiorgos Avraamu',
                new: true,
                registered: 'Jan 1, 2023',
            },
            activity: '10 sec ago',
        },
        {
            avatar: { status: 'busy' }, // busy → red dot
            user: {
                name: 'Avram Tarasios',
                new: false,
                registered: 'Jan 1, 2023',
            },
            activity: '5 minutes ago',
        },
        {
            avatar: { status: 'offline' }, // offline → gray dot
            user: {
                name: 'Quintin Ed',
                new: true,
                registered: 'Jan 1, 2023',
            },
            activity: '1 hour ago',
        },
    ]
    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-success'
            case 'busy':
                return 'bg-danger'
            case 'offline':
                return 'bg-secondary'
            default:
                return 'bg-secondary'
        }
    }

    return (
        <>
            <WidgetsBrand className="mb-4" withCharts />
            <CCard className="mb-4">
                <CCardBody>
                    <CTable>
                        <CTableHead className="text-nowrap">
                            <CTableRow>
                                <CTableHeaderCell className="bg-body-tertiary text-center">
                                    <CIcon icon={cilPeople} />
                                </CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary">
                                    User
                                </CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary">
                                    Activity
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {tableExample.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell className="text-center position-relative">
                                        <CAvatar
                                            size="md"
                                            color="primary"
                                            className="position-relative"
                                        >
                                            <CIcon icon={cilUser} className="text-white" />
                                            <span
                                                className={`position-absolute bottom-0 end-0 translate-middle p-1 border border-light rounded-circle ${getStatusColor(item.avatar.status)}`}
                                                style={{ width: '10px', height: '10px' }}
                                            ></span>
                                        </CAvatar>
                                    </CTableDataCell>

                                    <CTableDataCell>
                                        <div>{item.user.name}</div>
                                        <div className="small text-body-secondary text-nowrap">
                                            <span>{item.user.new ? 'New' : 'Recurring'}</span> |
                                            Registered: {item.user.registered}
                                        </div>
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
                <CCardFooter>
                    <CRow
                        xs={{ cols: 1, gutter: 4 }}
                        sm={{ cols: 2 }}
                        lg={{ cols: 4 }}
                        xl={{ cols: 5 }}
                        className="mb-2 text-center"
                    >
                        {progressExample.map((item, index, items) => (
                            <CCol
                                className={classNames({
                                    'd-none d-xl-block': index + 1 === items.length,
                                })}
                                key={index}
                            >
                                <div className="text-body-secondary">{item.title}</div>
                                <div className="fw-semibold text-truncate">
                                    {item.value} ({item.percent}%)
                                </div>
                                <CProgress
                                    thin
                                    className="mt-2"
                                    color={item.color}
                                    value={item.percent}
                                />
                            </CCol>
                        ))}
                    </CRow>
                </CCardFooter>
            </CCard>
        </>
    )
}

export default Dashboard
