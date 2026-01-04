import pytesseract
from pdf2image import convert_from_bytes
from PIL import Image
import io

# NOTE: Tesseract must be installed on the host machine/container
# If running in docker, ensure tesseract-ocr is installed in Dockerfile

def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        images = convert_from_bytes(file_bytes)
        text = ""
        for image in images:
            text += pytesseract.image_to_string(image)
        return text
    except Exception as e:
        print(f"Error processing PDF: {e}")
        return ""

def extract_text_from_image(file_bytes: bytes) -> str:
    try:
        image = Image.open(io.BytesIO(file_bytes))
        return pytesseract.image_to_string(image)
    except Exception as e:
        print(f"Error processing Image: {e}")
        return ""
