import React, {useState, useContext} from 'react'
import './uploader.scss'
import axios from "axios"
import { useEffect } from 'react'
import { LoadingContext } from '../../App'
import {BsImage} from "react-icons/bs"
import {BsCloudDownloadFill} from "react-icons/bs"
import Blur from './Blur/Blur'


const Uploader = () => {

  const [imageFile, setimageFile] = useState(undefined)
  const [imageBase64, setImageBase64] = useState("")
  const [outputImage, setOutputImage] = useState("")

  const {setIsLoading, isLoading} = useContext(LoadingContext)

  useEffect(()=>{
    if (imageFile){
      setOutputImage(undefined)
      getBase64().then(result =>{
        setImageBase64(result)
      }).catch((error)=> console.log(error))
    }

  }, [imageFile])

  const getBase64 = () => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(imageFile);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

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
    <div className='uploader__section' style={{filter : isLoading ? "blur(8px)" : ""}}>

        <div className='images__container'>
          {imageBase64 ? <img src={imageBase64}/> : <div>Select Image</div>}
          {outputImage ? <img src={outputImage}/> : null}
        </div>
        <label className='custom__file__upload'>
          <input type="file" accept='image/*' onChange={(e) => setimageFile(e.target.files[0])}/>
          <BsImage /> Browse...
        </label>
        {outputImage ? <a href={outputImage} download={"edt_"+imageFile["name"]}><BsCloudDownloadFill/> Dowload</a> : null}
        
        <Blur imageBase64= { imageBase64 } setOutputImage={setOutputImage} imageFile={imageFile} />
        
    </div>
  )
}

export default Uploader