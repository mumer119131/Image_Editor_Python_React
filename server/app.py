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
    imageType = imageBase64Dict["imageType"]
    editFunction = imageBase64Dict['editFunction']

    # converting base64image into pillow image
    img, indexToStart = bytesToImage(imageBase64Dict["base64"])

    #check what to edit into the image
    if editFunction == "blur":
        blurValue = imageBase64Dict["blurValue"]
        output_img = img.filter(ImageFilter.BoxBlur(int(blurValue)))
    elif editFunction == "embossing":
        img_gray_smooth = img.filter(ImageFilter.SMOOTH)
        output_img = img_gray_smooth.filter(ImageFilter.EMBOSS)
    elif editFunction == "reducer" :
        reduceFactor = imageBase64Dict["reduceFactor"]
        output_img = img.reduce(int(reduceFactor))
    elif editFunction == "grayScale" :
        output_img = img.convert("L")
    elif editFunction == "rotate":
        rotateAngle = imageBase64Dict["rotateAngle"]
        isExpandImage = imageBase64Dict["isExpandImage"]
        output_img = img.rotate(int(rotateAngle), expand=bool(isExpandImage))
    elif editFunction == "sharpen":
        output_img = img.filter(ImageFilter.SHARPEN)
    elif editFunction == "smooth":
        output_img = img.filter(ImageFilter.SMOOTH_MORE)
    elif editFunction == "detail":
        output_img = img.filter(ImageFilter.DETAIL)
    elif editFunction == "contour":
        img = img.convert("L")
        output_img = img.filter(ImageFilter.CONTOUR)
    # saving image in buffer to return it as a base64 image
    buffered = BytesIO()
    output_img.save(buffered, format=imageType.split("/")[1])
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