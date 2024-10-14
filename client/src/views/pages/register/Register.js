import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
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

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate() // Initialize useNavigate

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            })
            console.log(response.data)
            navigate('/login') // Correct the path to your login route
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || 'Registration failed. Please try again.',
            )
            console.error(error.response.data)
        }
    }

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm onSubmit={handleRegister}>
                                    <h1>Register</h1>
                                    <p className="text-body-secondary">Create your account</p>
                                    {errorMessage && (
                                        <p className="text-danger">{errorMessage}</p>
                                    )}{' '}
                                    {/* Moved inside JSX */}
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Name"
                                            autoComplete="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>@</CInputGroupText>
                                        <CFormInput
                                            placeholder="Email"
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="new-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Repeat password"
                                            autoComplete="new-password"
                                            value={passwordConfirmation}
                                            onChange={(e) =>
                                                setPasswordConfirmation(e.target.value)
                                            }
                                        />
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton color="success" type="submit">
                                            Create Account
                                        </CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Register
