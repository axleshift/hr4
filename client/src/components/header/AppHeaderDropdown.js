import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import {
    CAvatar,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilEnvelopeOpen } from '@coreui/icons'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
    const navigate = useNavigate() // React Router navigation hook

    const handleLogout = async () => {
        try {
            // Retrieve session token from cookies
            const sessionToken = Cookies.get('session_token')

            // Send logout request to the API with session token in headers
            const response = await axios.post('http://localhost:8000/api/logout', null, {
                withCredentials: true,
                headers: {
                    'X-Session-Token': sessionToken, // Include session token
                },
            })

            if (response.status === 200) {
                console.log('Logout successful:', response.data.message)

                // Remove session token and clear storage
                Cookies.remove('session_token')
                sessionStorage.clear()
                localStorage.clear()

                // Redirect to login page after logout
                navigate('/login')
            }
        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message)
            alert('An error occurred during logout. Please try again.')
        }
    }

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
                </CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem onClick={handleLogout}>Logout</CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderDropdown
