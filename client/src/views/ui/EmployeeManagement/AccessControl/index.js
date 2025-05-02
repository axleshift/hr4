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
    CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import EditProfile from './EditProfile'

const AccessControl = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
    const [filterText, setFilterText] = useState('')

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

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return {
                    key,
                    direction: prev.direction === 'asc' ? 'desc' : 'asc',
                }
            } else {
                return { key, direction: 'asc' }
            }
        })
    }

    const renderSortArrow = (key) => {
        if (sortConfig.key !== key) return ''
        return sortConfig.direction === 'asc' ? ' ↑' : ' ↓'
    }

    // Filter users
    const filteredUsers = users.filter((user) =>
        [user.name, user.email, user.role, user.department].some((value) =>
            value?.toLowerCase().includes(filterText.toLowerCase()),
        ),
    )

    // Sort users after filtering
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortConfig.key) {
            const valA = a[sortConfig.key]?.toLowerCase?.() ?? ''
            const valB = b[sortConfig.key]?.toLowerCase?.() ?? ''
            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
    })

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader className="d-flex justify-content-between align-items-center">
                        <strong>Access Control</strong>
                    </CCardHeader>
                    <CCardBody>
                        {/* Filter Input */}
                        <CFormInput
                            type="text"
                            placeholder="Search by name, email, role, or department..."
                            className="mb-3"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />

                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>#</CTableHeaderCell>
                                    <CTableHeaderCell
                                        className="bg-body-tertiary"
                                        onClick={() => handleSort('name')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Name{renderSortArrow('name')}
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                        className="bg-body-tertiary"
                                        onClick={() => handleSort('email')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Email{renderSortArrow('email')}
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                        className="bg-body-tertiary text-center"
                                        onClick={() => handleSort('role')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Role{renderSortArrow('role')}
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                        className="bg-body-tertiary text-center"
                                        onClick={() => handleSort('department')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Department{renderSortArrow('department')}
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        More
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {sortedUsers.length > 0 ? (
                                    sortedUsers.map((user) => (
                                        <CTableRow key={user.id}>
                                            <CTableDataCell>{user.id}</CTableDataCell>
                                            <CTableDataCell>{user.name}</CTableDataCell>
                                            <CTableDataCell>{user.email}</CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                {user.role}
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                {user.department}
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CButton
                                                    color="secondary"
                                                    size="sm"
                                                    onClick={() => handleEditUser(user.id)}
                                                >
                                                    <CIcon icon={cilOptions} /> More
                                                </CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))
                                ) : (
                                    <CTableRow>
                                        <CTableDataCell colSpan={6} className="text-center">
                                            No users found.
                                        </CTableDataCell>
                                    </CTableRow>
                                )}
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
