import React from 'react'
import PropTypes from 'prop-types' // Import PropTypes
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

const ProfileModal = ({ modalVisible, setModalVisible }) => {
    return (
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader>
                <CModalTitle>Profile</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm>
                    <CFormLabel htmlFor="fullName">Full Name</CFormLabel>
                    <CFormInput id="fullName" value="John Doe" readOnly />

                    <CFormLabel htmlFor="email">Email</CFormLabel>
                    <CFormInput id="email" value="johndoe@example.com" readOnly />

                    <CFormLabel htmlFor="role">Role</CFormLabel>
                    <CFormInput id="role" value="Software Engineer" readOnly />

                    <CFormLabel htmlFor="department">Department</CFormLabel>
                    <CFormInput id="department" value="Engineering" readOnly />
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setModalVisible(false)}>
                    Close
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

// Add PropTypes validation
ProfileModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
}

export default ProfileModal
