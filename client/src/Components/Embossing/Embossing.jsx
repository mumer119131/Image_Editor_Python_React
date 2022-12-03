import axios from 'axios'
import React,{useContext, useState, useEffect} from 'react'
import { LoadingContext } from '../../App'
import FileBrowser from '../FileBrowser/FileBrowser'
import ImagesPreview from '../ImagesPreview/ImagesPreview'
import DownloadBtn from '../DownloadBtn/DownloadBtn'
const Embossing = () => {

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
        const response = await axios.post("https://imageedit-mumer119131.vercel.app", {
            "base64" : imageBase64,
            "imageType" : imageFile["type"],
            "editFunction" : "embossing"
        })
        setIsLoading(false)
        setOutputImage(response["data"])
      }
  }
  return (
    <div className='uploader__section' style={{filter : isLoading ? "blur(8px)" : ""}}>
        <h2><span>Embossing</span> Tool</h2>
        <ImagesPreview imageBase64 = {imageBase64} outputImage = {outputImage} />
        <FileBrowser setimageFile = {setimageFile} />
        {outputImage ? <DownloadBtn outputImage={outputImage} fileName={imageFile["name"]}/> : null}
        <button onClick={uploadImage} disabled={imageFile ? false : true} >Upload</button>

    </div>
  )
}

export default Embossing