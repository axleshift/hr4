import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CListGroup,
    CListGroupItem,
    CButton,
    CSpinner,
} from '@coreui/react'
import axios from 'axios'

const ModuleList = () => {
    const [modules, setModules] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedModule, setSelectedModule] = useState(null) // Store selected module

    useEffect(() => {
        fetchModules()
    }, [])

    const fetchModules = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/modules')
            setModules(response.data.data) // Adjust based on API response structure
        } catch (error) {
            console.error('Error fetching modules:', error)
        } finally {
            setLoading(false)
        }
    }

    const viewModule = (module) => {
        if (selectedModule?.id === module.id) {
            setSelectedModule(null) // Hide file preview if same module is clicked again
        } else {
            setSelectedModule(module)
        }
    }

    return (
        <CCard>
            <CCardHeader>
                <h2>Modules List</h2>
            </CCardHeader>
            <CCardBody>
                {loading ? (
                    <CSpinner color="primary" />
                ) : (
                    <CListGroup>
                        {modules.length > 0 ? (
                            modules.map((module) => (
                                <CListGroupItem
                                    key={module.id}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <span>{module.title}</span>
                                    <CButton color="info" onClick={() => viewModule(module)}>
                                        {selectedModule?.id === module.id ? 'Hide' : 'View'}
                                    </CButton>
                                </CListGroupItem>
                            ))
                        ) : (
                            <CListGroupItem>No modules available</CListGroupItem>
                        )}
                    </CListGroup>
                )}
            </CCardBody>

            {/* File Viewer Below */}
            {selectedModule && (
                <CCardBody>
                    <h4>{selectedModule.title}</h4>
                    {selectedModule.file_url ? (
                        <>
                            {selectedModule.file_url.endsWith('.pdf') ? (
                                <iframe
                                    src={selectedModule.file_url}
                                    width="100%"
                                    height="500px"
                                    style={{ border: '1px solid #ddd' }}
                                />
                            ) : (
                                <a
                                    href={selectedModule.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Download {selectedModule.file_name}
                                </a>
                            )}
                        </>
                    ) : (
                        <p>No file available.</p>
                    )}
                </CCardBody>
            )}
        </CCard>
    )
}

export default ModuleList
