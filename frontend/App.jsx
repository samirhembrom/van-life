import React from "react"
import { 
    BrowserRouter, 
    Routes, 
    Route, 
    RouterProvider, 
    createBrowserRouter,
    createRoutesFromElements
 } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans, {loader as loadVans} from "./pages/Vans/Vans"
import VansDetails, {loader as loadVanDetail} from "./pages/Vans/VansDetails"
import Dashboard,{loader as dashboardLoader} from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Layout from "./components/Layout"
import Reviews from "./pages/Host/Reviews"
import VansD, {loader as loadHostVans } from "./pages/Host/HostVans"
import VansDe, {loader as loadHostVan } from "./pages/Host/HostVanDetails"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPricing from "./pages/Host/HostVanPricing"
import HostVanPhoto from "./pages/Host/HostVanPhotos"
import HostLayout from "./components/HostLayout"
import NotFound from "./pages/NotFound"
import Error from "./components/Error"
import Login, {loader as loginLoader, action as loginAction } from "./pages/Login"
import { requireAuth } from "./utils"
import "./server"


export default function App() {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route index element={<Home />} />
            <Route 
                path="about" 
                element={<About />} />
            <Route 
                path="login" 
                element={<Login />}
                loader={loginLoader}
                action={loginAction}/>
            <Route 
                path="vans" 
                element={<Vans />} 
                loader={loadVans} 
                errorElement={<Error/>} />
            <Route 
                path="vans/:id" 
                element={<VansDetails />} 
                loader={loadVanDetail} 
                errorElement={<Error/>}/>  
            <Route path="/host" element={<HostLayout/>}>
                <Route 
                    index 
                    element={<Dashboard />} 
                    loader={dashboardLoader } />
                <Route 
                    path="income" 
                    element={<Income />} 
                    loader={async ({request})=> await requireAuth(request) } />
                <Route 
                    path="reviews" 
                    element={<Reviews />} 
                    loader={async ({request})=> await requireAuth(request) } />
                <Route 
                    path="vans" 
                    element={<VansD />} 
                    loader={ loadHostVans }
                    errorElement={<Error/>}  />
                <Route 
                    path="vans/:id" 
                    element={<VansDe/>} 
                    loader={ loadHostVan }
                    errorElement={<Error/>}  >
                    <Route 
                        index 
                        element={<HostVanInfo />} 
                        loader={async ({request})=> await requireAuth(request)} />
                    <Route 
                        path="pricing" 
                        element={<HostVanPricing />} 
                        loader={async ({request})=> await requireAuth(request)} />
                    <Route 
                        path="photos" 
                        element={<HostVanPhoto />} 
                        loader={async ({request})=> await requireAuth(request)} />
                </Route>
            </Route>              
            <Route 
                path="*" 
                element={<NotFound/>}/>
        </Route>
    ))
    return (
        <RouterProvider router={router}/>
    )
}