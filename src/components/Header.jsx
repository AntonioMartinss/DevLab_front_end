import { CircleUser } from 'lucide-react';

const Header = () => {
  return (
    <header className="p-4 flex bg-deep-black justify-between text-center">
  <div className="ml-14"><h1 className='text-text text-2xl'>DevLab</h1></div>
  <div className='mr-14'><CircleUser className='cursor-pointer' size={36}/></div>
</header>
  )
}

export default Header