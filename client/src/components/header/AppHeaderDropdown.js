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

const AppHeaderDropdown = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

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
                <CDropdownItem
                    onClick={() => {
                        localStorage.removeItem('user')
                        navigate('/login')
                    }}
                >
                    Logout
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderDropdown
