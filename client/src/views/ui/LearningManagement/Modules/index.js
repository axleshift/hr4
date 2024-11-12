import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import mammoth from 'mammoth'

const DocxViewer = () => {
    const [docxContent, setDocxContent] = useState('')

    // Function to handle file upload
    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (
            file &&
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            const reader = new FileReader()
            reader.onload = async (event) => {
                const arrayBuffer = event.target.result
                const result = await mammoth.convertToHtml({ arrayBuffer })
                setDocxContent(result.value)
            }
            reader.readAsArrayBuffer(file)
        } else {
            alert('Please upload a .docx file.')
        }
    }

    return (
        <CCard>
            <CCardHeader>
                <input type="file" onChange={handleFileChange} accept=".docx" />
            </CCardHeader>
            <CCardBody>
                <div dangerouslySetInnerHTML={{ __html: docxContent }} />
            </CCardBody>
        </CCard>
    )
}

export default DocxViewer
