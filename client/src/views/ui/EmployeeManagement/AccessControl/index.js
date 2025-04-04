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

    const handleEditUser = async (userId) => {
        try {
            const response = await api.get(`/api/users/${userId}`)
            setSelectedUser(response.data.data)
            setModalVisible(true)
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
                            <CIcon icon={cilUserPlus} className="me-2" />
                            Add User
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Email</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">
                                        Role
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">
                                        Actions
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
                                                onClick={() => handleEditUser(user.id)}
                                            >
                                                <CIcon icon={cilOptions} className="me-1" />
                                                More
                                            </CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>

            {selectedUser && (
                <EditProfile
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    user={selectedUser}
                    fetchUsers={fetchUsers}
                />
            )}
        </CRow>
    )
}

export default AccessControl
