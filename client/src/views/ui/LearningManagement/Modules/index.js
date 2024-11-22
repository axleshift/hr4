import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import mammoth from 'mammoth'
import axios from 'axios'

const Fileviewer = () => {
    const [fileContent, setFileContent] = useState('')

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

    const handleUpload = async () => {
        const file = new Blob([fileContent], { type: 'text/html' }) // Adjust the type based on file content

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await axios.post('/api/files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            alert('File uploaded successfully')
        } catch (error) {
            alert('Error uploading file')
        }
    }

    return (
        <CCard>
            <CCardHeader>
                <input type="file" onChange={handleFileChange} accept=".docx,.txt,.html" />
                <button onClick={handleUpload}>Upload File</button>
            </CCardHeader>
            <CCardBody>
                <div dangerouslySetInnerHTML={{ __html: fileContent }} />
            </CCardBody>
        </CCard>
    )
}

export default Fileviewer
