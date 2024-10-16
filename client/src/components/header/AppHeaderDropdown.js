import React from 'react'
import {
    CAvatar,
    CBadge,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import { cilEnvelopeOpen, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import Cookies from 'js-cookie' // Make sure to import the Cookies library

import avatar8 from './../../assets/images/avatars/8.jpg'

const API_URL = 'http://localhost:8000/api/' // Replace with your actual API URL

const logout = async () => {
    try {
        await axios.post(`${API_URL}logout`, {}, { withCredentials: true })
        Cookies.remove('token')
        delete axios.defaults.headers.common['Authorization']
        window.location.href = '/login'
    } catch (error) {
        console.error('Logout error:', error)
    }
}

const AppHeaderDropdown = () => {
    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
                <CAvatar src={avatar8} size="md" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
                    Account
                </CDropdownHeader>
                <CDropdownItem href="#">
                    <CIcon icon={cilUser} className="me-2" />
                    Profile
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilEnvelopeOpen} className="me-2" />
                    Messages
                    <CBadge color="success" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem onClick={logout}>Logout</CDropdownItem>{' '}
                {/* Change onChange to onClick */}
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderDropdown
