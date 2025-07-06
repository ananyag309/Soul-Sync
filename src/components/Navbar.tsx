import { useState } from 'react'
import Logo from './Logo'
import { Menu, Search } from 'lucide-react'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
interface INavbar{
    onMenuClick: any ;
}

const Navbar = ({onMenuClick}:INavbar) => {
    const [focus,setFocus] = useState(false)
  return (
    <div className='flex items-center justify-between 
    gap-4 p-4 sticky top-0 z-[50] bg-bgsecondary 
    md:bg-bgprimary border-b-[1px] border-b-slate-700'>
        <Logo onlyLogo className='md:hidden'/>

        <div className='hidden sm:flex items-center 
        bg-bgprimary px-4 rounded-full md:bg-bgsecondary'>
            <input 
            type="text"
            placeholder='Search here...'
            className='bg-transparent h-10 outline-none
            border-none w-full text-sm'
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            />
            <Search className={`transition-all ${focus ? 
                'text-white':'text-gray-500'}`}/>
        </div>

        <div className='flex justify-end items-center gap-5 ml-auto'>
            <SignedIn>
            <UserButton />
            </SignedIn>
            <SignedOut>
                <div className='flex items-center gap-3'>
                    <Link to={'/sign-in'} className='bg-bgsecondary 
                    py-2 px-4 rounded-md text-sm cursor-pointer'>Sign In</Link>
                    <Link to={'/sign-up'} className='bg-primary py-2 px-4 
                    rounded-md text-sm cursor-pointer'>Register</Link>
                </div>
            </SignedOut>
            <div
            className='flex items-center justify-center size-10 
            bg-bgsecondary cursor-pointer rounded-md md:hidden' 
            onClick={onMenuClick}>
                <Menu/>
            </div>
        </div>
    </div>
  )
}

export default Navbar