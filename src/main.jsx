import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routesData } from './routes/routes'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={createBrowserRouter(routesData)} />
    </StrictMode>,
)
