import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'


function Mydropzone() {

    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)


    function onDrop(acceptedFiles) {
        console.log('File dropped :', acceptedFiles);
        const selectedFile = acceptedFiles[0]

        setFile(selectedFile)


        const previewUrl = URL.createObjectURL(selectedFile)
        setPreview(previewUrl)


    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        multiple: false
    });


    return (
        <div>
            <div {
                ...getRootProps()
            }
                style={{

                    height: "150px",
                    width: '200px',
                    border: '2px dashed  gray',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '20px auto'
                }}
            >
                <input {...getInputProps()} />
                {isDragActive ? (<p style={{color:'white'}}>Drop the file here ...</p>) : (<p style={{color:'white'}}> Drag & drop some files here, or click to select files</p>)}
            </div>
            {
                preview && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center', margin: '20px auto'
                    }}>

                        <div style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
                            <h1 style={{ margin: '10px',color:'white' }}>Image Preview</h1>
                            <img src={preview}
                                alt='Plant image'
                                style={{ maxWidth: '60%', maxHeight: '300px', borderRadius: '10px' }} />
                                <h2 style={{color:'white'}}> Predication:</h2>
                                <h2 style={{color:'white'}}>Confidence:</h2>

                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default Mydropzone
