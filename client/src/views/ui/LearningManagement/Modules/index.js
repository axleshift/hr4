import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CButton } from '@coreui/react'
import mammoth from 'mammoth'

const Fileviewer = () => {
    const [fileContent, setFileContent] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setSelectedFile(file)

        const fileType = file.type

        if (
            fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
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
        if (!selectedFile) {
            alert('No file selected')
            return
        }

        const reader = new FileReader()
        reader.onload = async (event) => {
            const base64Content = event.target.result.split(',')[1] // Extract Base64
            const payload = {
                original_name: selectedFile.name,
                file_type: selectedFile.type,
                base64_content: base64Content,
                module_id: 1, // Replace with actual module_id
            }

            try {
                const response = await fetch('http://localhost:8000/api/files', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    console.error('Upload failed:', errorData)
                    alert('Failed to upload file: ' + errorData.message)
                    return
                }

                const data = await response.json()
                alert('File uploaded successfully!')
            } catch (error) {
                console.error('Error:', error)
                alert('An error occurred during upload.')
            }
        }
        reader.readAsDataURL(selectedFile)
    }

    return (
        <CCard>
            <CCardHeader>
                <input type="file" onChange={handleFileChange} accept=".docx,.txt,.html" />
                <CButton color="primary" onClick={handleUpload} className="ml-2">
                    Upload
                </CButton>
            </CCardHeader>
            <CCardBody>
                <div dangerouslySetInnerHTML={{ __html: fileContent }} />
            </CCardBody>
        </CCard>
    )
}

export default Fileviewer
