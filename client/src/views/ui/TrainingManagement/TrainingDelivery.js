import React, { useState }from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'

//datepicker sunod
const TrainingDelivery = () => {
  const [visibleXL, setVisibleXL] = useState(false)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Ongoing Training</strong>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton color="primary" onClick={() => setVisibleXL(!visibleXL)}>
                    Add Stuff 
                </CButton>
                <CModal alignment="center" backdrop="static" size="lg   " visible={visibleXL} onClose={() => setVisibleXL(false)}>
                  <CModalHeader>
                    <CModalTitle>Add Stuff</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                        <CForm validated={true}>
                          <CFormLabel htmlFor="exampleFormControlInput1">Department</CFormLabel>
                          <div className="mb-3">
                          <CTooltip content="Description here." placement="top">
                            <CButton CButton color="secondary" className="me-2">Operational Department</CButton>
                          </CTooltip>
                          <CTooltip content="Description here." placement="top">
                            <CButton color="secondary">+</CButton>
                          </CTooltip>
                          </div>
                          <CFormLabel htmlFor="exampleFormControlInput1">Training Class</CFormLabel>
                          <div className="mb-3">
                          <CTooltip content="Description here." placement="top">
                            <CButton CButton color="secondary" className="me-2">Onboarding</CButton>
                          </CTooltip>
                          <CTooltip content="Description here." placement="top">
                            <CButton color="secondary">+</CButton>
                          </CTooltip>
                          </div>
                          <CFormLabel htmlFor="exampleFormControlInput1">Type of Agenda</CFormLabel>
                          <div className="mb-3">
                          <CTooltip content="Description here." placement="top">
                            <CButton CButton color="secondary" className="me-2">Seminar</CButton>
                          </CTooltip>
                          <CTooltip content="Description here." placement="top">
                            <CButton color="secondary">+</CButton>
                          </CTooltip>
                          </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="exampleFormControlInput1">Location /  Mode</CFormLabel>
                                <CFormInput type="email" id="exampleFormControlInput1" placeholder="Input Location"/>
                            </div>
                            <div className="mb-3">
                          <CTooltip content="Description here." placement="top">
                            <CButton CButton color="secondary" className="me-2">Seminar</CButton>
                          </CTooltip>
                          <CTooltip content="Description here." placement="top">
                            <CButton color="secondary">+</CButton>
                          </CTooltip>
                          </div>
                        </CForm>    
                  </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisibleXL(false)}>
                            Cancel
                        </CButton>
                        <CButton color="primary">Add Module</CButton>
                    </CModalFooter>
                </CModal>
            </div>
            
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                  <CTableHeaderCell scope="col">training Class</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Agenda</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Location / Mode</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Schedule</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell>Operation Department</CTableDataCell>
                  <CTableDataCell>Seminar</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>Mandatory</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    
)
}
export default TrainingDelivery