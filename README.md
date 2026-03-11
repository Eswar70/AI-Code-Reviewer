# 🤖 AI Code Reviewer

Elevate your code quality with **AI Code Reviewer**, a high-performance, intelligent tool powered by **Google Gemini 2.5 Flash**. It provides real-time, multi-stage validation to detect bugs, security vulnerabilities, and performance bottlenecks before they hit production.

![AI Code Reviewer Screenshot](https://raw.githubusercontent.com/username/repo/main/screenshot.png) *(Note: Add your real screenshot here)*

## ✨ Key Features

- **🚀 Real-time AI Analysis**: Instant code audits using the cutting-edge Gemini 2.5 Flash model.
- **🛡️ Security First**: Deep scans for SQL injections, XSS, and insecure patterns.
- **⚡ Performance Insights**: Automated suggestions for algorithm optimization and resource management.
- **📝 Interactive Editor**: Feature-rich code editing experience powered by Monaco Editor (VS Code's engine).
- **📂 Persistent History**: Securely store and manage your previous reviews with MongoDB.
- **🌓 Modern UI**: A stunning, responsive "Glassmorphism" interface with dark mode support.
- **📱 Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop with intuitive sidebar drawers.

## 🛠️ Tech Stack

### Frontend
- **React 19** + **TypeScript**
- **Vite** (Build Tool)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **Monaco Editor** (Code Input)

### Backend
- **FastAPI** (High-performance Python framework)
- **Motor** (Asynchronous MongoDB driver)
- **Google Generative AI SDK** (Gemini 2.5 Flash integration)
- **Slowapi** (Rate limiting)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- MongoDB (Local or Atlas)
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-code-reviewer.git
   cd ai-code-reviewer
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
   Create a `.env` file in the `backend/` folder:
   ```env
   GEMINI_API_KEY=your_key_here
   MONGODB_URL=mongodb://localhost:27017
   DATABASE_NAME=code_reviewer
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend/` folder:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```

4. **Run the Application**
   - **Backend**: `python -m uvicorn app.main:app --reload`
   - **Frontend**: `npm run dev`

## 📖 Deployment

For detailed instructions on deploying the backend to **Vercel** and the frontend to **Netlify**, please refer to our [DEPLOYMENT.md](./DEPLOYMENT.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
