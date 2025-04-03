import React, { useState } from 'react'
import {
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CButton,
    CForm,
    CFormLabel,
    CFormInput,
} from '@coreui/react'

const ProfileModal = () => {
    const [modalVisible, setModalVisible] = useState(true) // Local state for modal visibility

    // Close modal
    const closeModal = () => {
        setModalVisible(false)
    }

    return (
        <CModal visible={modalVisible} onClose={closeModal}>
            <CModalHeader>
                <CModalTitle>Profile</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm>
                    <CFormLabel htmlFor="fullName">Full Name</CFormLabel>
                    <CFormInput
                        id="fullName"
                        value="John Doe" // Hardcoded value
                        readOnly
                    />
                    <CFormLabel htmlFor="email">Email</CFormLabel>
                    <CFormInput
                        id="email"
                        value="johndoe@example.com" // Hardcoded value
                        readOnly
                    />
                    <CFormLabel htmlFor="role">Role</CFormLabel>
                    <CFormInput
                        id="role"
                        value="Software Engineer" // Hardcoded value
                        readOnly
                    />
                    <CFormLabel htmlFor="department">Department</CFormLabel>
                    <CFormInput
                        id="department"
                        value="Engineering" // Hardcoded value
                        readOnly
                    />
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={closeModal}>
                    Close
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ProfileModal
