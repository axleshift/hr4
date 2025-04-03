import React, { useState } from 'react'
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
import ProfileModal from '../../views/ui/EmployeeManagement/Profile' // Import ProfileModal

const AppHeaderDropdown = () => {
    const navigate = useNavigate()
    const [modalVisible, setModalVisible] = useState(false) // Local state to control modal visibility

    // Handle profile click to toggle modal visibility
    const handleProfileClick = () => {
        setModalVisible(true)
    }

    // Close the modal
    const handleModalClose = () => {
        setModalVisible(false)
    }

    return (
        <div>
            <CDropdown variant="nav-item">
                <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
                    <CAvatar src={avatar8} size="md" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                    <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
                        Guest
                    </CDropdownHeader>
                    <CDropdownItem onClick={handleProfileClick}>
                        {' '}
                        {/* Open modal on click */}
                        <CIcon icon={cilUser} className="me-2" />
                        Profile
                    </CDropdownItem>
                    <CDropdownItem href="#">
                        <CIcon icon={cilEnvelopeOpen} className="me-2" />
                        Messages
                    </CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem onClick={() => navigate('/login')}>Logout</CDropdownItem>
                </CDropdownMenu>
            </CDropdown>

            {/* Render the ProfileModal if modalVisible is true */}
            {modalVisible && <ProfileModal />}
        </div>
    )
}

export default AppHeaderDropdown
