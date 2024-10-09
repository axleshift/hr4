import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'

const TrainingDelivery = () => {
    const [visibleXL, setVisibleXL] = useState(false)

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
                                    <CForm>
                                        <CFormLabel>user_id</CFormLabel>
                                        <CFormInput type="text" name="department" required />
                                        <CFormLabel>vendor_id</CFormLabel>
                                        <CFormInput type="text" name="training_class" required />
                                        <CFormLabel>payment_confirmed</CFormLabel>
                                        <CFormInput type="text" name="agenda" required />
                                        <CFormLabel>reference_number</CFormLabel>
                                        <CFormInput type="text" name="agenda" required />
                                        <CModalFooter>
                                            <CButton
                                                color="secondary"
                                                onClick={() => setVisibleXL(false)}
                                            >
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
                                    <CTableHeaderCell>Title</CTableHeaderCell>
                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                    <CTableHeaderCell>test</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>test</CTableDataCell>
                                    <CTableDataCell>testtest</CTableDataCell>
                                    <CTableDataCell>testtesttest</CTableDataCell>
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
