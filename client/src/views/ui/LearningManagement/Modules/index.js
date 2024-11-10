import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CButton } from '@coreui/react'
import * as pdfjsLib from 'pdfjs-dist'
import mammoth from 'mammoth'

const LMS = () => {
    const [fileContent, setFileContent] = useState(null)
    const [centeredText, setCenteredText] = useState([])
    const [boldText, setBoldText] = useState([])
    const [images, setImages] = useState([])

    // Function to handle file selection
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            await processFile(selectedFile)
        }
    }

    // Function to process the file (DOCX or PDF)
    const processFile = async (file) => {
        const fileType = file.type

        if (fileType === 'application/pdf') {
            const fileReader = new FileReader()
            fileReader.onload = async () => {
                const typedArray = new Uint8Array(fileReader.result)
                const pdf = await pdfjsLib.getDocument(typedArray).promise
                const page = await pdf.getPage(1)
                const textContent = await page.getTextContent()
                let text = ''
                let bold = []
                let images = []

                // Extract text and detect bold
                textContent.items.forEach((item) => {
                    text += item.str + ' '

                    // Detect bold font by fontName, fontWeight or text transform (uppercase)
                    if (item.fontName && item.fontName.includes('Bold')) {
                        bold.push(item.str)
                    }
                    if (item.fontWeight && item.fontWeight > 400) {
                        bold.push(item.str) // Assuming 400 is normal weight and anything higher is bold
                    }
                    if (
                        item.str === item.str.toUpperCase() &&
                        item.str !== item.str.toLowerCase()
                    ) {
                        bold.push(item.str) // Fallback for uppercase text (might indicate emphasis)
                    }
                })

                // Extract images from PDF (if any)
                const imagesData = await page.getOperatorList()
                imagesData.fnArray.forEach((fn, index) => {
                    if (fn === pdfjsLib.OPS.paintImageXObject) {
                        const img = page.objs[index]
                        images.push(img)
                    }
                })

                setFileContent(text)
                setBoldText(bold)
                setImages(images)
            }
            fileReader.readAsArrayBuffer(file)
        } else if (
            fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            const reader = new FileReader()
            reader.onload = async () => {
                const arrayBuffer = reader.result
                const result = await mammoth.extractRawText({ arrayBuffer })
                setFileContent(result.value)

                // Convert DOCX to HTML using mammoth and detect <strong> or <b> (bold) elements
                const docxHtml = await mammoth.convertToHtml({ arrayBuffer })
                const boldElements = []
                // Extract bold text between <strong> and <b> tags
                const regex = /<(strong|b)>(.*?)<\/\1>/g
                let match
                while ((match = regex.exec(docxHtml.value)) !== null) {
                    boldElements.push(match[2])
                }
                setBoldText(boldElements)

                // Extract images from DOCX (if any)
                const imageRegex = /<img[^>]*src="([^"]*)"[^>]*>/g
                let imageMatches = []
                while ((match = imageRegex.exec(docxHtml.value)) !== null) {
                    imageMatches.push(match[1])
                }
                setImages(imageMatches)
            }
            reader.readAsArrayBuffer(file)
        }
    }

    // Function to get alignment based on paragraph content
    const getAlignment = (line) => {
        if (line.trim().startsWith('    ')) {
            return 'justify' // Indented line as justification example
        } else if (line.trim() === line.trim().toUpperCase()) {
            return 'center' // All caps can suggest centered text
        }
        return 'left'
    }

    // Split the file content by new lines and render with basic alignment
    const splitContent = fileContent ? fileContent.split('\n') : []

    // Handle and separate centered text
    const separateCenteredText = () => {
        const centered = []
        const nonCentered = []

        splitContent.forEach((line) => {
            if (getAlignment(line) === 'center') {
                centered.push(line)
            } else {
                nonCentered.push(line)
            }
        })

        // Store the separated content
        setCenteredText(centered)
    }

    // Call the function to separate centered text
    useEffect(() => {
        if (fileContent) {
            separateCenteredText()
        }
    }, [fileContent])

    // Render the text with bold styles
    const renderText = (line) => {
        const words = line.split(' ')
        return words.map((word, index) => {
            // Check if word is part of bold text
            const isBold = boldText.some((boldWord) => boldWord.includes(word))
            return (
                <span key={index} style={isBold ? { fontWeight: 'bold' } : {}}>
                    {word + ' '}
                </span>
            )
        })
    }

    // Render Images inline
    const renderImagesInline = () => {
        return (
            images.length > 0 && (
                <div>
                    {images.map((image, index) => (
                        <div key={index} style={{ marginBottom: '20px', textAlign: 'center' }}>
                            <img
                                src={image}
                                alt={`Image ${index}`}
                                style={{
                                    maxWidth: '100%',
                                    display: 'inline-block',
                                    margin: '10px auto',
                                    textAlign: 'center',
                                }}
                            />
                        </div>
                    ))}
                </div>
            )
        )
    }

    // Function to handle rendering based on sequence (Text -> Image)
    const renderContent = () => {
        let content = []

        // Indices for text and image content
        let textIndex = 0
        let imageIndex = 0

        // Process each line and check if it is text or image
        while (textIndex < splitContent.length || imageIndex < images.length) {
            // If there's remaining text, render it
            if (textIndex < splitContent.length) {
                const line = splitContent[textIndex]
                content.push(
                    <CCardText key={`text-${textIndex}`} className={`text-${getAlignment(line)}`}>
                        {renderText(line)}
                    </CCardText>,
                )
                textIndex++
            }

            // If there's remaining image, render it
            if (imageIndex < images.length) {
                content.push(
                    <div
                        key={`image-${imageIndex}`}
                        style={{ marginBottom: '20px', textAlign: 'center' }}
                    >
                        <img
                            src={images[imageIndex]}
                            alt={`Image ${imageIndex}`}
                            style={{
                                maxWidth: '100%',
                                display: 'inline-block',
                                margin: '10px auto',
                                textAlign: 'center',
                            }}
                        />
                    </div>,
                )
                imageIndex++
            }
        }

        return content
    }

    return (
        <CCard>
            <CCardHeader>File Upload</CCardHeader>
            <CCardBody>
                <CCardTitle>Document Content</CCardTitle>

                {/* File input */}
                <input type="file" onChange={handleFileChange} accept=".pdf, .docx" />

                {/* Render the content */}
                <div>{renderContent()}</div>

                {/* Button for additional action */}
                <CButton color="primary">Upload File</CButton>
            </CCardBody>
        </CCard>
    )
}

export default LMS
