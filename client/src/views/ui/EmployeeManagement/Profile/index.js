import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
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
    const user = useSelector((state) => state.auth.user)

    return (
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader>
                <CModalTitle>Profile</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {user ? (
                    <CForm>
                        <CFormLabel htmlFor="fullName">Full Name</CFormLabel>
                        <CFormInput id="fullName" value={user.name} readOnly />

                        <CFormLabel htmlFor="email">Email</CFormLabel>
                        <CFormInput id="email" value={user.email} readOnly />

                        <CFormLabel htmlFor="role">Role</CFormLabel>
                        <CFormInput id="role" value={user.role} readOnly />
                    </CForm>
                ) : (
                    <p>Loading profile...</p>
                )}
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setModalVisible(false)}>
                    Close
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

ProfileModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
}

export default ProfileModal
