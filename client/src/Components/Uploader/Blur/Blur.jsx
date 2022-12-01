import React from 'react'
import axios from "axios"

const Blur = (props) => {

    const [imageBase64, setOutputImage, imageFile] = props
    const [blurValue, setBlurValue] = useState("10")
    const uploadImage = async() =>{
        if (imageFile){
            setIsLoading(true)
            const response = await axios.post("http://127.0.0.1:5000", {
            "base64" : imageBase64,
            "blurValue" : blurValue,
            "imageType" : imageFile["type"]
            })
            setIsLoading(false)
            setOutputImage(response["data"])
        }
        }
    return (
    <>
        <label className='blur__value__label'>
          <input type="range" min="1" max="50" step="1" defaultValue="10" onChange={(e)=> setBlurValue(e.target.value)}/><span>{blurValue}</span>
        </label>
        <button onClick={uploadImage} disabled={imageFile ? false : true} >Upload</button>
    </>
  )
}

export default Blur