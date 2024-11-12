import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import mammoth from 'mammoth'

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

        if (fileType === 'text/plain') {
            // Handle .txt files
            const reader = new FileReader()
            reader.onload = (event) => {
                setFileContent(event.target.result)
            }
            reader.readAsText(file)
            return
        }

        if (fileType === 'text/html') {
            // Handle .html files
            const reader = new FileReader()
            reader.onload = (event) => {
                setFileContent(event.target.result)
            }
            reader.readAsText(file)
            return
        }

        alert('Unsupported file type')
    }

    return (
        <CCard>
            <CCardHeader>
                <input type="file" onChange={handleFileChange} accept=".docx,.txt,.html" />
            </CCardHeader>
            <CCardBody>
                <div dangerouslySetInnerHTML={{ __html: fileContent }} />
            </CCardBody>
        </CCard>
    )
}

export default Fileviewer
