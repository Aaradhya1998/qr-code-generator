# QR Code Generator (Full Stack)

A full-stack QR Code Generator built using **Flask (Python)** for the backend and **HTML, CSS, JavaScript** for the frontend.

The application allows users to generate and download QR codes from text or URLs in **PNG and SVG formats**.

---

## 🚀 Features

* Generate QR codes from text or URLs
* Supports:

  * PNG format
  * SVG format
* Download generated QR codes
* Automatic cleanup of old QR files (server-side)
* Input validation (empty input & max length)
* REST API-based architecture

---

## 🧠 Tech Stack

### Backend

* Python
* Flask
* qrcode library
* Flask-CORS

### Frontend

* HTML
* CSS
* JavaScript (Fetch API)

---

## 📁 Project Structure

```
backend/
│── app.py
│── qr_generator.py
│── requirements.txt
│── qr/              # Stores generated QR files

frontend/
│── index.html
│── css/style.css
│── js/script.js
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/Aaradhya1998/qr-code-generator.git
cd qr-code-generator
```

---

### 2. Run Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

#Check Out the Live demo 
at  https://asqrgenrator.netlify.app/

**Request:**

```json
{
  "text": "https://example.com",
  "format": "png"
}
```

**Response:**

```json
{
  "status": "success",
  "file": "qr_xxxxx.png"
}
```

---

### Download QR Code

```
GET /download/<filename>
```

---
## 🌐 Live Demo

👉 https://asqrgenrator.netlify.app/

Try generating QR codes directly in your browser.
## ⚠️ Limitations

* Max input length: 500 characters
* No persistent storage (files auto-delete)
* No authentication system

---

## 💡 Future Improvements

* QR customization (colors, embedded logo)
* Cloud deployment (Render / Railway)
* Database integration (history tracking)
* Scan analytics dashboard
* User authentication

---

## 👨‍💻 Author

Aaradhya Shekdar

---

## 📌 Summary

This project demonstrates:

* Backend API development using Flask
* File handling and cleanup mechanisms
* Frontend-backend integration
* Basic full-stack system design

---
