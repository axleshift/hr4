import React, { useState } from 'react'
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
} from '@coreui/react'

import ReactImg from 'src/assets/images/react.jpg'  


const LMS = () => {

  //Variable or Placeholder para ma call
  
  
    return (
        
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>MODULES</strong>
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
                <CCard style={{ width: '18rem' }}>
                  <CCardImage orientation="top" src={ReactImg} />
                  <CCardBody>
                    <CCardTitle>Module Title</CCardTitle>
                    <CCardText>
                      Some quick example text to build on the card title and make up the bulk of the
                      card&#39;s content.
                    </CCardText>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton color="primary" className="me-md-2">
                      EDIT
                      </CButton>
                      <CButton color="primary" className="me-md-2">
                      DELETE
                      </CButton>
                  </div>
                  </CCardBody>
                </CCard>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
  
  export default LMS