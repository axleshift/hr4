import React, { useState, useEffect } from 'react'
import api from '../../../../util/api'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUserPlus, cilOptions } from '@coreui/icons'
import EditProfile from './EditProfile'

const AccessControl = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await api.get('/api/users')
            setUsers(response.data.data)
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    // Fetch user details before opening modal
    const handleEditUser = async (userId) => {
        try {
            const response = await api.get(`/api/users/${userId}`)
            setSelectedUser(response.data.data) // Set fetched user data
            setModalVisible(true) // Show modal
        } catch (error) {
            console.error('Error fetching user profile:', error)
        }
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader className="d-flex justify-content-between align-items-center">
                        <strong>Access Control</strong>
                        <CButton color="primary">
                            <CIcon icon={cilUserPlus} className="me-2" /> Add User
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell className="bg-body-tertiary">
                                        Name
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">
                                        Email
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        Role
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        More
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {users.map((user) => (
                                    <CTableRow key={user.id}>
                                        <CTableDataCell>{user.name}</CTableDataCell>
                                        <CTableDataCell>{user.email}</CTableDataCell>
                                        <CTableDataCell>{user.role}</CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CButton
                                                color="secondary"
                                                size="sm"
                                                onClick={() => handleEditUser(user.id)} // Fetch user before opening modal
                                            >
                                                <CIcon icon={cilOptions} /> More
                                            </CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Show EditProfile modal */}
            {selectedUser && (
                <EditProfile
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    user={selectedUser}
                    fetchUsers={fetchUsers} // Refetch users after update
                />
            )}
        </CRow>
    )
}

export default AccessControl
