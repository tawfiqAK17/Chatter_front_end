import { NavLink, Outlet } from 'react-router-dom';
import './MainLayout.css'
function MainLayout() {
    return (
        <div className="main-layout">
            <aside className='aside'>
                <div className="logo"><img src='../../../public/logo.png' alt='logo' /></div>
                <div className="elements">
                    <AsideElement icon="../../../public/message.svg" label="Messages" destination_path="/main/messages"></AsideElement>
                </div>
                <User />
            </aside>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}
function AsideElement({ icon, label, destination_path }) {
    return (
        <NavLink className={({isActive}) => isActive ? "active-aside-element " + "aside-element"  : "aside-element"} to={destination_path} end >
            <img className="aside-element-icon" src={icon} alt='icon' style={{width:'28px'}}/>
            <p className="aside-element-label">{label}</p>
        </NavLink>
   )
}

function User() {
    return (
        <NavLink className="user" to="/main/account">
            <img className="profile-picture" src='../../../public/user.jpg'/>            
            <p className="user-name">Name</p>
            <p className="logout">Logout</p>
        </NavLink>
    )
}
export default MainLayout;
