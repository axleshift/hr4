import React from 'react'
import PropTypes from 'prop-types'
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

const EditProfile = ({ modalVisible, setModalVisible, user }) => {
    // Close modal function
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
                    <CFormInput id="fullName" value={user.name} readOnly />

                    <CFormLabel htmlFor="email">Email</CFormLabel>
                    <CFormInput id="email" value={user.email} readOnly />

                    <CFormLabel htmlFor="role">Role</CFormLabel>
                    <CFormInput id="role" value={user.role} readOnly />

                    <CFormLabel htmlFor="department">Department</CFormLabel>
                    <CFormInput id="department" value={user.department || 'N/A'} readOnly />
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

// Prop validation
EditProfile.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

export default EditProfile
