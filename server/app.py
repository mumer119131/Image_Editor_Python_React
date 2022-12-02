from flask import Flask, request
from flask_cors import CORS
import base64
import ast
from io import BytesIO
from PIL import Image, ImageFilter

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

@app.route("/", methods= ['POST'])
def blurImage():

    # parsing base64 data into a python readable dict
    imageBase64Dict = base64ToDict(request.data)

    #getting required data from the dict
    blurValue = imageBase64Dict["blurValue"]
    imageType = imageBase64Dict["imageType"]

    # converting base64image into pillow image
    img, indexToStart = bytesToImage(imageBase64Dict["base64"])

    # blur the image
    blur_img = img.filter(ImageFilter.BoxBlur(int(blurValue)))
    

    # saving image in buffer to return it as a base64 image
    buffered = BytesIO()
    blur_img.save(buffered, format=imageType.split("/")[1])
    img_str = base64.b64encode(buffered.getvalue())

    output_image = imageBase64Dict["base64"][0:indexToStart]+str(img_str)[2:-1]

    return output_image


@app.route("/embossing", methods=['POST'])
def embossingImage():
    # parsing base64 data into a python readable dict
    imageBase64Dict = base64ToDict(request.data)

    #getting required data from the dict
    imageType = imageBase64Dict["imageType"]

    # converting base64image into pillow image
    img, indexToStart = bytesToImage(imageBase64Dict["base64"])

    # blur the image
    img_gray_smooth = img.filter(ImageFilter.SMOOTH)
    blur_img = img_gray_smooth.filter(ImageFilter.EMBOSS)
    
    # saving image in buffer to return it as a base64 image
    buffered = BytesIO()
    blur_img.save(buffered, format=imageType.split("/")[1])
    img_str = base64.b64encode(buffered.getvalue())

    output_image = imageBase64Dict["base64"][0:indexToStart]+str(img_str)[2:-1]

    return output_image



def base64ToDict(imageBase64):
    img_dict_str = imageBase64.decode("UTF-8")
    imageBase64Dict = ast.literal_eval(img_dict_str)
    return imageBase64Dict

def bytesToImage(imageBase64):
    indexToStart = imageBase64.index("base64,") + 7
    img = Image.open(BytesIO(base64.b64decode(imageBase64[indexToStart:])))
    return img, indexToStart

if __name__ == "__main__":
    app.run(debug=True)