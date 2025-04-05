import React from 'react'
import PropTypes from 'prop-types'
import {
    CButton,
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

const ProgramModals = ({
    visibleProgram,
    setVisibleProgram,
    programTitle,
    setProgramTitle,
    programDescription,
    setProgramDescription,
    handleSaveProgram,
    visibleCourse,
    setVisibleCourse,
    courseTitle,
    setCourseTitle,
    courseDescription,
    setCourseDescription,
    setCourseFile,
    handleSaveCourse,
    modalVisible,
    setModalVisible,
    base64Doc,
    mimeType,
    fileName,
}) => {
    return (
        <>
            {/* Add Program Modal */}
            <CModal size="lg" visible={visibleProgram} onClose={() => setVisibleProgram(false)}>
                <CModalHeader>
                    <CModalTitle>Add Program</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel>Program Title</CFormLabel>
                                <CFormInput
                                    value={programTitle}
                                    onChange={(e) => setProgramTitle(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel>Program Description</CFormLabel>
                                <CFormTextarea
                                    value={programDescription}
                                    onChange={(e) => setProgramDescription(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleProgram(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleSaveProgram}>
                        Save Program
                    </CButton>
                </CModalFooter>
            </CModal>

            {/* Add Course Modal */}
            <CModal size="lg" visible={visibleCourse} onClose={() => setVisibleCourse(false)}>
                <CModalHeader>
                    <CModalTitle>Add Course</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel>Course Title</CFormLabel>
                                <CFormInput
                                    value={courseTitle}
                                    onChange={(e) => setCourseTitle(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel>Course Description</CFormLabel>
                                <CFormTextarea
                                    value={courseDescription}
                                    onChange={(e) => setCourseDescription(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormLabel>Upload File</CFormLabel>
                                <CFormInput
                                    type="file"
                                    onChange={(e) => setCourseFile(e.target.files[0])}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleCourse(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleSaveCourse}>
                        Save Course
                    </CButton>
                </CModalFooter>
            </CModal>

            {/* Course Preview Modal */}
            <CModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                size="xl"
                fullscreen
            >
                <CModalHeader>
                    <CModalTitle>Document Preview</CModalTitle>
                </CModalHeader>
                <CModalBody style={{ padding: 0 }}>
                    {base64Doc ? (
                        mimeType === 'application/pdf' ? (
                            <iframe
                                src={`${base64Doc}`}
                                style={{ width: '100%', height: '90vh', border: 'none' }}
                            ></iframe>
                        ) : (
                            <iframe
                                src={`https://view.officeapps.live.com/op/embed.aspx?src=${base64Doc}`}
                                style={{ width: '100%', height: '90vh', border: 'none' }}
                            ></iframe>
                        )
                    ) : (
                        <p>No preview available.</p>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalVisible(false)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

// Add PropTypes validation
ProgramModals.propTypes = {
    visibleProgram: PropTypes.bool.isRequired,
    setVisibleProgram: PropTypes.func.isRequired,
    programTitle: PropTypes.string.isRequired,
    setProgramTitle: PropTypes.func.isRequired,
    programDescription: PropTypes.string.isRequired,
    setProgramDescription: PropTypes.func.isRequired,
    handleSaveProgram: PropTypes.func.isRequired,
    visibleCourse: PropTypes.bool.isRequired,
    setVisibleCourse: PropTypes.func.isRequired,
    courseTitle: PropTypes.string.isRequired,
    setCourseTitle: PropTypes.func.isRequired,
    courseDescription: PropTypes.string.isRequired,
    setCourseDescription: PropTypes.func.isRequired,
    setCourseFile: PropTypes.func.isRequired,
    handleSaveCourse: PropTypes.func.isRequired,
    // Props for preview modal
    modalVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    base64Doc: PropTypes.string.isRequired,
    mimeType: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
}

export default ProgramModals
