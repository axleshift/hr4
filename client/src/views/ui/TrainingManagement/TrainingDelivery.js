import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  // CCardHeader,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CCol,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import axios from 'axios'

const TrainingDelivery = () => {
  const [visibleXL, setVisibleXL] = useState(false)
  const [trainings, setTrainings] = useState([])
  const [formData, setFormData] = useState({
    training_class: '',
    agenda: '',
    location: '',
    schedule: '',
    status: '',
  })

  useEffect(() => {
    fetchTrainings()
  }, [])

  const fetchTrainings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/training')
      setTrainings(response.data.data)
    } catch (error) {
      console.error('Error fetching trainings:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/training', formData)
      setVisibleXL(false) // Close modal
      fetchTrainings() // Refresh training list
      setFormData({
        training_class: '',
        agenda: '',
        location: '',
        schedule: '',
        status: '',
      }) // Reset form data
    } catch (error) {
      console.error('Error adding training:', error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Ongoing Training</strong>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton color="primary" onClick={() => setVisibleXL(true)}>
                Add Stuff
              </CButton>
              <CModal
                alignment="center"
                backdrop="static"
                size="lg"
                visible={visibleXL}
                onClose={() => setVisibleXL(false)}
              >
                <CModalHeader>
                  <CModalTitle>Add Stuff</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CForm onSubmit={handleSubmit}>
                    <CFormLabel htmlFor="training_class">Training Class</CFormLabel>
                    <CFormInput
                      type="text"
                      id="training_class"
                      name="training_class"
                      value={formData.training_class}
                      onChange={handleInputChange}
                      required
                    />
                    <CFormLabel htmlFor="agenda">Type of Agenda</CFormLabel>
                    <CFormInput
                      type="text"
                      id="agenda"
                      name="agenda"
                      value={formData.agenda}
                      onChange={handleInputChange}
                      required
                    />
                    <CFormLabel htmlFor="location">Location / Mode</CFormLabel>
                    <CFormInput
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                    <CFormLabel htmlFor="schedule">Schedule</CFormLabel>
                    <CFormInput
                      type="date"
                      id="schedule"
                      name="schedule"
                      value={formData.schedule}
                      onChange={handleInputChange}
                      required
                    />
                    <CFormLabel htmlFor="status">Status</CFormLabel>
                    <CFormInput
                      type="text"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                    />
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setVisibleXL(false)}>
                        Cancel
                      </CButton>
                      <CButton color="primary" type="submit">
                        Add Module
                      </CButton>
                    </CModalFooter>
                  </CForm>
                </CModalBody>
              </CModal>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Training Class</CTableHeaderCell>
                  <CTableHeaderCell>Agenda</CTableHeaderCell>
                  <CTableHeaderCell>Location</CTableHeaderCell>
                  <CTableHeaderCell>Schedule</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {trainings.map((training) => (
                  <CTableRow key={training.id}>
                    <td>{training.training_class}</td>
                    <td>{training.agenda}</td>
                    <td>{training.location}</td>
                    <td>{training.schedule}</td>
                    <td>{training.status}</td>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default TrainingDelivery
