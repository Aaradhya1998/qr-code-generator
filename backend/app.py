from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import qrcode
import qrcode.image.svg as svg
import os
import uuid
import time

def cleanup_old_qr_files(folder, max_age_seconds=600):
    current_time = time.time()

    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)

        if os.path.isfile(file_path):
            file_age = current_time - os.path.getmtime(file_path)

            if file_age > max_age_seconds:
                try:
                    os.remove(file_path)
                except Exception:
                    pass



app = Flask(__name__)
CORS(app)

QR_DIR = "qr"
os.makedirs(QR_DIR, exist_ok=True)


@app.route("/")
def home():
    return jsonify({"status": "backend running"})

@app.route("/generate", methods=["POST"])
def generate():
    cleanup_old_qr_files(QR_DIR)

    data = request.get_json()

    if not data or "text" not in data:
        return jsonify({"status": "error", "message": "No input provided"}), 400

    text = data["text"].strip()
    format_type = data.get("format", "png")

    if not text:
        return jsonify({"status": "error", "message": "Input is empty"}), 400

    if len(text) > 500:
        return jsonify({
            "status": "error",
            "message": "Input too long (max 500 characters)"
        }), 400

    filename = f"qr_{uuid.uuid4().hex}.{format_type}"
    path = os.path.join(QR_DIR, filename)

    if format_type == "svg":
        factory = svg.SvgImage
        img = qrcode.make(text, image_factory=factory)
        img.save(path)
    else:
        img = qrcode.make(text)
        img.save(path)

    return jsonify({
        "status": "success",
        "file": filename
    })


@app.route("/download/<filename>")
def download(filename):
    path = os.path.join(QR_DIR, filename)
    return send_file(path, as_attachment=True)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

