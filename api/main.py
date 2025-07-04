from io import BytesIO
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import uvicorn
import numpy as np
from PIL import Image
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware

model=tf.keras.models.load_model(r'C:\Users\ACER\Desktop\bandhan\plantdetection guid\models\2.h5')

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5174'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
class_name=['Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy']
def read_file_as_image(file)-> np.ndarray:
    image=Image.open(BytesIO(file))
    return image

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    content=await file.read()
    image=read_file_as_image(content)
    image=np.expand_dims(image,axis=0)
    predication=model.predict(image)
    ans=class_name[np.argmax(predication[0])]
    confidence=float(predication[0][np.argmax(predication[0])])*100
    return JSONResponse({"prediction":ans,"confidence":f"{confidence:.2f}%"})
    # return JSONResponse({"predection":(predication)})





if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
