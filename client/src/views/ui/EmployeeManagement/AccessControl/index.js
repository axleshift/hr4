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
import { cilUserPlus, cilOptions } from '@coreui/icons'
import EditProfile from './EditProfile'

const AccessControl = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })

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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase())
    }

    const handleSort = (key) => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    const sortedUsers = [...users].sort((a, b) => {
        const aValue = a[sortConfig.key]?.toString().toLowerCase()
        const bValue = b[sortConfig.key]?.toString().toLowerCase()

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
    })

    const filteredUsers = sortedUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm),
    )

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader className="d-flex justify-content-between align-items-center">
                        <strong>Access Control</strong>
                    </CCardHeader>
                    <CCardBody>
                        <div className="mb-3">
                            <CFormInput
                                type="text"
                                placeholder="Search by name or email"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>#</CTableHeaderCell>
                                    <CTableHeaderCell
                                        className="bg-body-tertiary"
                                        onClick={() => handleSort('name')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Name{' '}
                                        {sortConfig.key === 'name' &&
                                            (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                        className="bg-body-tertiary"
                                        onClick={() => handleSort('email')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Email{' '}
                                        {sortConfig.key === 'email' &&
                                            (sortConfig.direction === 'asc' ? '↑' : '↓')}
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
                                {filteredUsers.map((user) => (
                                    <CTableRow key={user.id}>
                                        <CTableDataCell>{user.id}</CTableDataCell>
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
