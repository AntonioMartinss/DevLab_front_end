import { Github, LogOut, Gamepad2 } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { typography } from "../assets/fonts/typography.js";
import LogOutPopUp from './LogoutPopup.jsx'; 

const Header = () => {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutPopup(true);
  };

  const handleConfirmLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
    setShowLogoutPopup(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <>
      <header className="mx-44 mt-4 rounded-full border border-gray-500 p-2 flex justify-between text-center max-sm:mx-12">
        <div className="">
          <NavLink to="/biblioteca">
            <h1 className={`${typography.general.heading1} text-text ml-4`}>
              DevLab
            </h1>
          </NavLink>
        </div>
        <div className='inline-flex text-sky-blue items-center'>
          <NavLink to="/biblioteca">
            <Gamepad2 className='cursor-pointer mr-4' size={26} />
          </NavLink>
          <NavLink to="/desenvolvedores">
            <Github className='cursor-pointer mr-4' size={26} />
          </NavLink>
          <button onClick={handleLogoutClick}>
            <LogOut className='cursor-pointer mr-4' size={26} />
          </button>
        </div>
      </header>

      <LogOutPopUp 
        isOpen={showLogoutPopup}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Header;