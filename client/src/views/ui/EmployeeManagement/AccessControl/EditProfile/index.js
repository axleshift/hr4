import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../../../../../util/api'
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

const EditProfile = ({ modalVisible, setModalVisible, user, fetchUsers }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        department: '',
        employee_type: '',
        employment_status: '',
        date_of_hire: '',
        gender: '',
        phone_number: '',
        address: '',
    })

    // Populate form data when the modal opens
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || '',
                department: user.department || '',
                employee_type: user.employee_type || '',
                employment_status: user.employment_status || '',
                date_of_hire: user.date_of_hire || '',
                gender: user.gender || '',
                phone_number: user.phone_number || '',
                address: user.address || '',
            })
        }
    }, [user])

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    // Close modal function
    const closeModal = () => {
        setModalVisible(false)
    }

    // Submit updated user data
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.put(`/api/users/${user.id}`, formData) // Update backend
            fetchUsers() // Refresh user list
            closeModal() // Close modal
        } catch (error) {
            console.error('Error updating user profile:', error)
        }
    }

    return (
        <CModal visible={modalVisible} onClose={closeModal}>
            <CModalHeader>
                <CModalTitle>Edit Profile</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleSubmit}>
                    <CFormLabel htmlFor="name">Full Name</CFormLabel>
                    <CFormInput
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <CFormLabel htmlFor="email">Email</CFormLabel>
                    <CFormInput id="email" name="email" value={formData.email} readOnly />

                    <CFormLabel htmlFor="role">Role</CFormLabel>
                    <CFormInput
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    />

                    <CFormLabel htmlFor="department">Department</CFormLabel>
                    <CFormInput
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                    />

                    <CFormLabel htmlFor="employee_type">Employee Type</CFormLabel>
                    <CFormInput
                        id="employee_type"
                        name="employee_type"
                        value={formData.employee_type}
                        onChange={handleChange}
                    />

                    <CFormLabel htmlFor="employment_status">Employment Status</CFormLabel>
                    <CFormInput
                        id="employment_status"
                        name="employment_status"
                        value={formData.employment_status}
                        onChange={handleChange}
                    />

                    <CFormLabel htmlFor="date_of_hire">Date of Hire</CFormLabel>
                    <CFormInput
                        id="date_of_hire"
                        name="date_of_hire"
                        type="date"
                        value={formData.date_of_hire}
                        onChange={handleChange}
                    />

                    <CFormLabel htmlFor="gender">Gender</CFormLabel>
                    <CFormInput
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    />

                    <CFormLabel htmlFor="phone_number">Phone Number</CFormLabel>
                    <CFormInput
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />

                    <CFormLabel htmlFor="address">Address</CFormLabel>
                    <CFormInput
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={closeModal}>
                    Close
                </CButton>
                <CButton color="primary" onClick={handleSubmit}>
                    Save Changes
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

// ✅ Add PropTypes validation before export
EditProfile.propTypes = {
    modalVisible: PropTypes.bool.isRequired, // Validate modal visibility
    setModalVisible: PropTypes.func.isRequired, // Validate function to toggle modal
    user: PropTypes.shape({
        // Validate user object structure
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        department: PropTypes.string,
        employee_type: PropTypes.string,
        employment_status: PropTypes.string,
        date_of_hire: PropTypes.string,
        gender: PropTypes.string,
        phone_number: PropTypes.string,
        address: PropTypes.string,
    }).isRequired,
    fetchUsers: PropTypes.func.isRequired, // Validate function for refreshing users
}

export default EditProfile
