import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
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

import avatar8 from './../../assets/images/avatars/8.jpg'

// Logout function
const logout = async () => {
    try {
        // Send logout request to the backend
        await axios.post(`${API_URL}logout`, {}, { withCredentials: true })

        // Remove session token from the cookies (if set)
        Cookies.remove('session_token')

        // Clear Authorization header if it's being used
        delete axios.defaults.headers.common['Authorization']

        // Redirect user to the login page (optional)
        window.location.href = '/login' // or use a router method like history.push('/login')
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
                <CDropdownItem onClick={logout}>Logout</CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderDropdown
