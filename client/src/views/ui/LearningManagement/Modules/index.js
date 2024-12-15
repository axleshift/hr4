import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CButton } from '@coreui/react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import mammoth from 'mammoth'

const Fileviewer = () => {
    const [fileContent, setFileContent] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [fileCount, setFileCount] = useState(0) // To hold the file count
    const location = useLocation()
    const { title, fileId } = location.state || {}

    // Fetch the file content on component mount (when the page reloads)
    useEffect(() => {
        if (fileId) {
            const storedContent = localStorage.getItem(`file-${fileId}`)
            if (storedContent) {
                setFileContent(storedContent) // Use the stored content if available
            } else {
                fetchFileContent(fileId)
            }
        }
        fetchFileCount() // Fetch file count on component mount
    }, [fileId])

    // Function to fetch file count from the backend
    const fetchFileCount = async () => {
        try {
            const response = await axios.get('http://your-backend-url/api/files/count')
            setFileCount(response.data.count) // Set the file count in state
        } catch (error) {
            console.error('Error fetching file count:', error)
        }
    }

    // Function to fetch file content from the backend
    const fetchFileContent = async (id) => {
        try {
            const response = await axios.get(`http://your-backend-url/api/files/${id}`)
            const { content } = response.data

            if (content) {
                // Decode the Base64 content and update the state
                const decodedContent = atob(content)
                setFileContent(decodedContent)
                localStorage.setItem(`file-${id}`, decodedContent) // Store content in localStorage
            }
        } catch (error) {
            console.error('Error fetching file content:', error)
        }
    }

    // Handle file selection and content parsing
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
            reader.onload = async (event) => {
                const content = event.target.result
                setFileContent(content)
            }
            reader.readAsText(file)
            return
        }

        alert('Unsupported file type')
    }

    // Function to upload file and its content
    // Fileviewer Component

    const uploadFile = async () => {
        if (!selectedFile) {
            alert('No file selected!')
            return
        }

        try {
            setUploading(true)
            const formData = new FormData()
            formData.append('file', selectedFile) // Upload raw file for backend storage
            formData.append('title', title) // Pass title (this should be set in the location state)
            formData.append('content', fileContent) // File content (HTML or plain text)

            const response = await axios.post('http://localhost:8000/api/files', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            alert('File uploaded successfully!')
            console.log(response.data)
            fetchFileCount() // Update file count after upload
        } catch (error) {
            console.error('Error uploading file:', error)
            alert('Failed to upload the file.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <CCard>
            <CCardHeader>
                <h2>{title}</h2>
                <input type="file" onChange={handleFileChange} accept=".docx,.txt,.html" />
                <CButton onClick={uploadFile} color="primary" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload File'}
                </CButton>
                <CButton
                    onClick={() => fetchFileContent(fileId)}
                    color="secondary"
                    className="ml-2"
                >
                    Fetch File Content
                </CButton>
            </CCardHeader>
            <CCardBody>
                {/* Display the file content */}
                <div dangerouslySetInnerHTML={{ __html: fileContent }} />
            </CCardBody>
        </CCard>
    )
}

export default Fileviewer
