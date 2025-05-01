import React, { useEffect, useState } from 'react'
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
import api from '../../../../util/api'
import Cookies from 'js-cookie'

const ProfileModal = ({ modalVisible, setModalVisible }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
        department: '',
    })

    const fetchUser = async () => {
        const session_id = Cookies.get('session_id')
        if (!session_id) return

        try {
            const response = await api.post('/api/auth/verify-session', { session_id })
            const data = response.data.user

            setUser({
                name: data.name,
                email: data.email,
                role: data.role,
                department: data.department,
            })
        } catch (error) {
            console.error('Failed to fetch user info:', error)
        }
    }

    // Fetch user data when modal becomes visible
    useEffect(() => {
        if (modalVisible) {
            fetchUser()
        }
    }, [modalVisible])

    return (
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
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
                    <CFormInput id="department" value={user.department} readOnly />
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

ProfileModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
}

export default ProfileModal
