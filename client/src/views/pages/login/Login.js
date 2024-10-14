import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password,
            })
            console.log('Login Response:', response)

            if (response.data.token) {
                // Store the token in local storage
                localStorage.setItem('token', response.data.token)

                // Fetch protected data
                const token = localStorage.getItem('token')
                const protectedResponse = await axios.get(
                    'http://localhost:8000/api/protected-route',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )
                console.log('Protected Response:', protectedResponse.data) // Handle the protected data as needed

                // Navigate to the dashboard
                navigate('/dashboard')
            } else {
                console.error('Login failed:', response.data.message)
            }
        } catch (error) {
            console.error(
                'Error during login:',
                error.response ? error.response.data : error.message,
            )
        }
    }

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={handleLogin}>
                                        <h1>Login</h1>
                                        <p className="text-body-secondary">
                                            Sign In to your account
                                        </p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Email"
                                                autoComplete="username"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton
                                                    color="primary"
                                                    className="px-4"
                                                    type="submit"
                                                >
                                                    Login
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0">
                                                    Forgot password?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
