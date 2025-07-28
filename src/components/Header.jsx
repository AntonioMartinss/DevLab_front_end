import { CircleUser, Bell, Github } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className=" mx-44 mt-4 rounded-full  border border-gray-500 p-4 flex justify-between text-center max-sm:mx-12">
      <div className="">
        <NavLink to="/biblioteca"><h1 className='text-text text-xl'>DevLab</h1></NavLink>
      </div>
      <div className=' inline-flex text-sky-blue'>
        <NavLink to="/desenvolvedores"><Github className='cursor-pointer mr-4' size={26} /></NavLink>
        
      </div>
    </header>
  )
}

export default Header