import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../../util/api'
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
    CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Cookies from 'js-cookie'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await api.post(
                '/api/auth/login',
                { email, password },
                { withCredentials: true },
            )

            const { user, session_id } = response.data
            Cookies.set('session_id', session_id, { expires: 1, secure: true, sameSite: 'Strict' })
            localStorage.setItem('user', JSON.stringify(user))

            // Redirect based on role
            switch (user.role) {
                case 'superadmin':
                    navigate('/admin/dashboard')
                    break
                case 'manager':
                    navigate('/manager/dashboard')
                    break
                default:
                    navigate('/dashboard')
                    break
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password!')
        } finally {
            setLoading(false)
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
                                    <CForm onSubmit={handleSubmit}>
                                        <h1>Login</h1>
                                        <p className="text-body-secondary">
                                            Sign in to your account
                                        </p>
                                        {error && <div className="text-danger mb-3">{error}</div>}

                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Email"
                                                autoComplete="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
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
                                                required
                                            />
                                        </CInputGroup>

                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton
                                                    color="primary"
                                                    className="px-4"
                                                    type="submit"
                                                    disabled={loading}
                                                >
                                                    {loading ? <CSpinner size="sm" /> : 'Login'}
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

                            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>Create an account to get started</p>
                                        <Link to="/register">
                                            <CButton color="light" className="mt-3">
                                                Register Now!
                                            </CButton>
                                        </Link>
                                    </div>
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
