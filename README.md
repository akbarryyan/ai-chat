# AI Chatbot Interaktif dengan AKBXR API

Aplikasi chatbot interaktif yang menggunakan API AKBXR sebagai backend AI dengan React.js untuk frontend dan Node.js + Express untuk backend.

## Fitur

- 🤖 Chat real-time dengan AI menggunakan API AKBXR
- 💾 Penyimpanan riwayat chat ke database MySQL
- 🎨 UI yang modern dan responsif dengan Tailwind CSS
- ⚡ Real-time typing indicator
- 📱 Mobile-friendly design
- 🗑️ Fitur clear chat

## Teknologi yang Digunakan

### Backend
- Node.js + Express
- MySQL dengan mysql2
- Axios untuk HTTP requests
- CORS untuk cross-origin requests
- dotenv untuk environment variables

### Frontend
- React.js 19
- React Router DOM
- Tailwind CSS
- Axios untuk API calls
- Vite sebagai build tool

## Struktur Project

```
├── backend/
│   ├── controllers/
│   │   └── chatController.js
│   ├── routes/
│   │   └── chatRoutes.js
│   ├── .env
│   ├── db.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── ChatPage.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── router.jsx
    ├── .env
    └── package.json
```

## Setup dan Instalasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd ai-chatbot
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env` di folder backend:
```env
PORT=3001
AKBXR_API_KEY=UNLIMITED-BETA
AKBXR_BASE_URL=https://api.akbxr.com/v1

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ai_chatbot
```

### 3. Setup Database MySQL

Pastikan MySQL sudah terinstall dan running, kemudian buat database:
```sql
CREATE DATABASE ai_chatbot;
```

Aplikasi akan otomatis membuat tabel `chat_history` saat pertama kali dijalankan.

### 4. Setup Frontend

```bash
cd ../frontend
npm install
```

Buat file `.env` di folder frontend:
```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## Menjalankan Aplikasi

### 1. Jalankan Backend
```bash
cd backend
npm start
```
Backend akan berjalan di `http://localhost:3001`

### 2. Jalankan Frontend
```bash
cd frontend
npm run dev
```
Frontend akan berjalan di `http://localhost:5173`

## API Endpoints

### Backend Endpoints

- `POST /api/chat` - Mengirim pesan chat
- `GET /api/chat/history` - Mengambil riwayat chat
- `GET /health` - Health check

### Format Request ke AKBXR API

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, AI!"
    }
  ],
  "model": "auto"
}
```

### Format Response dari AKBXR API

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "Hello! How can I help you today? 😊",
        "padding": "ab",
        "role": "assistant"
      }
    }
  ],
  "id": "chatcmpl-BsUHauKz8BExyFxRJTp751pdXwbb8",
  "usage": {
    "completion_tokens": 11,
    "prompt_tokens": 11,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "total_tokens": 22
  },
  "model": "auto",
  "system_fingerprint": "fp_07e970ab25"
}
```

## Database Schema

### Tabel `chat_history`

```sql
CREATE TABLE chat_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_message TEXT NOT NULL,
  ai_reply TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Kontribusi

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## Kontak

Project Link: [https://github.com/akbarryyan/ai-chat](https://github.com/akbarryyan/ai-chat)
