import { CircleUser, Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className=" mx-44 mt-4 rounded-full  border border-gray-500 p-4 flex justify-between text-center">
      <div className=""><h1 className='text-text text-xl'>DevLab</h1></div>
      <div className=' inline-flex'>
        <Bell className='cursor-pointer mr-4' size={26} />
        <CircleUser className='cursor-pointer ' size={26} />
      </div>
    </header>
  )
}

export default Header