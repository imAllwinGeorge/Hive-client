import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import AdminSiderBar from "./AdminSiderBar"
import Footer from "./Footer"

const AdminLayout = () => {
  return (
    <div>
        <Navbar />
        <div>
            <AdminSiderBar />
        </div>
        <div>
            <Outlet/>
        </div>
        <Footer />
    </div>
  )
}

export default AdminLayout