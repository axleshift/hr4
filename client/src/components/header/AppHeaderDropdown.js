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
    const [modalVisible, setModalVisible] = useState(false) // Control modal visibility

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
                    <CDropdownItem onClick={() => setModalVisible(true)}>
                        {' '}
                        {/* Toggle modal */}
                        <CIcon icon={cilUser} className="me-2" />
                        Profile
                    </CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem onClick={() => navigate('/login')}>Logout</CDropdownItem>
                </CDropdownMenu>
            </CDropdown>

            {/* Pass modalVisible and setModalVisible as props */}
            <ProfileModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </div>
    )
}

export default AppHeaderDropdown
