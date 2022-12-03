from flask import Flask, request, Response
from flask_cors import CORS
import base64
import ast
from io import BytesIO
from PIL import Image, ImageFilter, ImageEnhance


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
    try:
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
            enhanceFactor = imageBase64Dict["enhanceFactor"]
            output_img = ImageEnhance.Sharpness(img).enhance(int(enhanceFactor))
        elif editFunction == "contour":
            img = img.convert("L")
            output_img = img.filter(ImageFilter.CONTOUR)
        elif editFunction == "composite":
            secondImage = imageBase64Dict["secondImage"]
            img2, i = bytesToImage(secondImage)
            mask = img2.convert("L")
            output_img = Image.composite(img, img2, mask)
            
        # saving image in buffer to return it as a base64 image
        buffered = BytesIO()
        output_img.save(buffered, format=imageType.split("/")[1])
        img_str = base64.b64encode(buffered.getvalue())

        output_image = imageBase64Dict["base64"][0:indexToStart]+str(img_str)[2:-1]
    except Exception as error:
        print(error)
        return Response("Error", status=501)

    return Response(output_image, status=201)




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