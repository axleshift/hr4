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
        const fetchUsers = async () => {
            try {
                const response = await api.get('/api/users') // API endpoint
                setUsers(response.data.data)
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }
        fetchUsers()
    }, [])

    // Handle clicking "More" button
    const handleEditUser = (user) => {
        setSelectedUser(user) // Set the selected user
        setModalVisible(true) // Show modal
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
                                        <CTableDataCell className="text-center">
                                            {user.role}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CButton
                                                color="secondary"
                                                size="sm"
                                                onClick={() => handleEditUser(user)} // Pass user data
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

            {/* Show EditProfile modal and pass user data */}
            {selectedUser && (
                <EditProfile
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    user={selectedUser} // Pass user details
                />
            )}
        </CRow>
    )
}

export default AccessControl
