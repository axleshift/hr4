import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
import api from '../../util/api'
import Cookies from 'js-cookie'

const AppHeaderDropdown = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const handleLogout = async () => {
        try {
            await api.post('/api/auth/logout') // Inform backend to destroy session
        } catch (error) {
            console.error('Logout failed:', error)
        } finally {
            localStorage.removeItem('user')
            sessionStorage.clear()
            Cookies.remove('session_id') // Remove auth cookie
            navigate('/login')
        }
    }

    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
                <CAvatar src={avatar8} size="md" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
                    {user ? user.name : 'Guest'}
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
