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
  CDatePicker,
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
                    Create Module
                </CButton>
                <CModal alignment="center" backdrop="static" size="lg   " visible={visibleXL} onClose={() => setVisibleXL(false)}>
                  <CModalHeader>
                    <CModalTitle>Create Module</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                        <CForm validated={true}>
                            <div className="mb-3">
                                <CFormLabel htmlFor="formFile">Input Image (Optional)</CFormLabel>
                                <CFormInput type="file" id="formFile"/>
                            </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="exampleFormControlInput1">Module Title</CFormLabel>
                                <CFormInput required type="email" id="exampleFormControlInput1" placeholder="Input title"/>
                            </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                                <CFormTextarea id="exampleFormControlTextarea1" rows={3}></CFormTextarea>
                            </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="formFile">Upload File</CFormLabel>
                                <CFormInput required type="file" id="formFile"/>
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
                  <CTableHeaderCell scope="col">Training Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Schedule</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell>Operation Department</CTableDataCell>
                  <CTableDataCell>Seminar</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
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