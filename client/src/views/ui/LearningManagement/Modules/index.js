import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import mammoth from 'mammoth'
import axios from 'axios'

const Fileviewer = () => {
    const location = useLocation()
    const { module } = location.state // Retrieve module passed through navigation

    const [fileContent, setFileContent] = useState('')

    // Handle file upload change (similar to your previous implementation)
    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const fileType = file.type

        if (
            fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            // Handle .docx files
            const reader = new FileReader()
            reader.onload = async (event) => {
                const arrayBuffer = event.target.result
                const result = await mammoth.convertToHtml({ arrayBuffer })
                setFileContent(result.value)
            }
            reader.readAsArrayBuffer(file)
            return
        }

        if (fileType === 'text/plain' || fileType === 'text/html') {
            // Handle .txt and .html files
            const reader = new FileReader()
            reader.onload = (event) => {
                setFileContent(event.target.result)
            }
            reader.readAsText(file)
            return
        }

        alert('Unsupported file type')
    }

    // Upload file to API
    const handleUpload = async () => {
        const file = document.querySelector('input[type="file"]').files[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        try {
            await axios.post(`http://localhost:8000/api/modules/${module.id}/files`, formData)
            alert('File uploaded successfully')
        } catch (error) {
            console.error('Error uploading file:', error)
        }
    }

    return (
        <div>
            <CCard>
                <CCardHeader>{module.title}</CCardHeader>
                <CCardBody>
                    <h3>{module.description}</h3>
                    <div>
                        {module.files.length > 0 ? (
                            <ul>
                                {module.files.map((file) => (
                                    <li key={file.id}>{file.original_name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No files available for this module.</p>
                        )}
                    </div>
                    <div>
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleUpload}>Upload File</button>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: fileContent }} />
                </CCardBody>
            </CCard>
        </div>
    )
}

export default Fileviewer
