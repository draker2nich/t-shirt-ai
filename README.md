# AI T-Shirt Designer

A modern web application for generating AI-powered textile patterns and designs using Stable Diffusion through the Replicate API.

## Features

- **AI-Powered Design Generation**: Create unique textile patterns using text descriptions
- **Parallel Processing**: Generate multiple design variants simultaneously
- **Real-time Preview**: See your designs on a t-shirt mockup instantly
- **Seamless Patterns**: Optimized for textile printing with tileable patterns
- **Modern UI**: Clean, intuitive interface built with React and Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Replicate API key ([Get one here](https://replicate.com/account/api-tokens))

## Installation

1. **Clone the repository** (or extract the archive)

2. **Run the cleanup script** (Windows):
   ```bash
   cleanup.bat
   ```
   This removes duplicate and unused files from the project.

3. **Install dependencies**:
   
   Backend:
   ```bash
   cd server
   npm install
   ```

   Frontend:
   ```bash
   cd ..
   npm install
   ```

## Configuration

1. **API Key Setup**:
   - Get your Replicate API key from https://replicate.com/account/api-tokens
   - On first run, the app will prompt you to enter your API key
   - The key is stored locally in your browser (localStorage)

2. **Environment Variables** (optional):
   - Copy `.env` to create custom configuration
   - Modify `REACT_APP_PROXY_URL` if needed (default: http://localhost:3001/api)

## Running the Application

### Option 1: Using the start script (Windows)
```bash
start.bat
```
This will automatically start both backend and frontend servers.

### Option 2: Manual start

Start the backend server:
```bash
cd server
npm start
```

In a new terminal, start the frontend:
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Usage

1. **Configure API Key**:
   - Click the "Settings" button in the header
   - Enter your Replicate API key
   - The key will be saved for future sessions

2. **Generate Designs**:
   - Enter a description of your desired pattern
   - Optionally adjust generation settings (pattern type, style, variants)
   - Click "Generate Design"
   - Wait 20-30 seconds for parallel generation

3. **Preview & Download**:
   - Select any generated design from the gallery
   - View it on a t-shirt mockup
   - Switch between front/back views
   - Download your favorite design

## Generation Settings

- **Pattern Type**: Seamless, Full Composition, or Geometric
- **Art Style**: Realistic, Abstract, Minimalist, Vintage, etc.
- **Variants**: Generate 2-6 variations per request
- **Detail Level**: Low (faster), Medium, or High (slower)

## Project Structure

```
ai-tshirt-designer/
├── public/             # Static files
├── server/            # Backend proxy server
│   ├── server.js      # Express server
│   └── package.json   # Backend dependencies
├── src/
│   ├── components/    # React components
│   │   ├── ApiKeyInput.js
│   │   ├── DesignGallery.js
│   │   ├── Icons.js
│   │   ├── PromptInput.js
│   │   ├── SettingsPanel.js
│   │   └── TShirtPreview.js
│   ├── services/      # API services
│   │   └── replicateService.js
│   ├── App.js         # Main application
│   ├── index.js       # Entry point
│   └── index.css      # Global styles
├── .env               # Environment variables
├── cleanup.bat        # Cleanup script
├── start.bat          # Start script
└── package.json       # Frontend dependencies
```

## Technology Stack

- **Frontend**: React 18, Tailwind CSS
- **Backend**: Express.js, Node.js
- **AI**: Replicate API (Stable Diffusion XL)
- **Build Tool**: Create React App

## Performance Optimization

- Parallel generation of multiple variants
- Optimized API calls with proper error handling
- Efficient image loading and caching
- Responsive design for all screen sizes

## Troubleshooting

**Port already in use:**
- Change ports in `.env` and `server/server.js`

**API key errors:**
- Verify your key starts with `r8_`
- Check that your Replicate account has credits
- Ensure the key is correctly entered in settings

**Generation fails:**
- Check your internet connection
- Verify backend server is running
- Check browser console for detailed errors

**Slow generation:**
- Reduce number of variants
- Lower detail level in settings
- Check Replicate service status

## Cost Information

- Generation typically costs $0.005-0.01 per image
- Replicate offers $10 in free credits for new accounts
- Monitor usage at https://replicate.com/account/billing

## License

MIT

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review console logs for detailed errors
3. Verify all dependencies are installed correctly

---

**Note**: This application requires an active internet connection and a valid Replicate API key to function.
