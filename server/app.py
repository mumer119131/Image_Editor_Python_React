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

    imageBase64 = request.data
    img_dict_str = imageBase64.decode("UTF-8")
    imageBase64Dict = ast.literal_eval(img_dict_str)
    blurValue = imageBase64Dict["blurValue"]
    imageType = imageBase64Dict["imageType"]

    indexToStart = imageBase64Dict["base64"].index("base64,") + 7
    img = Image.open(BytesIO(base64.b64decode(imageBase64Dict["base64"][indexToStart:])))
    blur_img = img.filter(ImageFilter.BoxBlur(int(blurValue)))
    
    buffered = BytesIO()
    blur_img.save(buffered, format=imageType.split("/")[1])
    img_str = base64.b64encode(buffered.getvalue())

    with open("imageToSave.jpg", "wb") as fh:
        fh.write(base64.b64decode(imageBase64Dict["base64"][indexToStart:]))

    
    # with open("test.txt", "w+") as test_file:
    #     test_file.write()
    
    output_image = imageBase64Dict["base64"][0:indexToStart]+str(img_str)[2:-1]

    return output_image




if __name__ == "__main__":
    app.run(debug=True)