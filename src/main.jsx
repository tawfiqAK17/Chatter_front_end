import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routesData } from './routes/routes'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

// In your app's entry point or where you configure axios
axios.defaults.baseURL = 'http://localhost:5000'; 

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={createBrowserRouter(routesData)} />
    </StrictMode>,
)
