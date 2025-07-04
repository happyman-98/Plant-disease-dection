import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'

function Upload() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')
  const [data, setData] = useState(null)

  // this for the drop zone area 

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


  // 


  // fetching data form the api


  function handleupload(event) {
    event.preventDefault()

    if (!file) {
      console.log("no file was selected")
      return;
    }
    const formData = new FormData()
    formData.append('file', file)
    fetch(
      'http://127.0.0.1:8000/upload/',
      {
        method: 'POST',
        body: formData,

      }
    )
      .then(async (response) => {
        const contentType = response.headers.get('content-type');
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`HTTP error ! status : ${response.status} \n ${errorText}`)
        }
        if (contentType && contentType.includes('application/json')) {
          const json = await response.json()
          console.log("result : ", json)
          setData(json)
          setStatus('Upload was succesful')
        }
        else {
          const raw = await response.text()
          console.warn("Unexpected response formate : ", raw)
          setStatus('Upload was not succesful')
        }
      })
      .catch(error => {
        console.error("Fetch error : ", error)
      })
  }
  return (
    <div>
      {/*  for the drop box ............................*/}
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
        {isDragActive ? (<p style={{ color: 'white' }}>Drop the file here ...</p>) : (<p style={{ color: 'white' }}> Drag & drop some files here, or click to select files</p>)}
      </div>

      {/* ..................................... */}


      {/* preview */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ margin: '10px', color: 'white' }}>Image Preview</h1>
        <img src={preview}
          style={{ maxWidth: '60%', maxHeight: '200px', borderRadius: '10px' }} />

        {/* status */}
        {status && <p style={{ color: 'white' }}>{status}</p>}
        {/* predication data */}
        {data && <div>
          <h2 style={{ color: 'white' }}> Predication:{data.prediction}</h2>
          <h2 style={{ color: 'white' }}>Confidence:{data.confidence}</h2>
        </div>}


        {/* upload button */}
        <form onSubmit={handleupload}>
          <button style={{ margin: '10px', borderRadius: "10px", width: '90px', height: '30px', backgroundColor: 'black', color: 'white' }} type='submit'>Upload</button>
        </form>
      </div>

    </div>
  )
}

export default Upload
