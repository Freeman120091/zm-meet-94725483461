import { useEffect, useState } from 'react'
import axios from 'axios';
import { FaBars, FaCaretDown, FaMagnifyingGlass, FaRegCircleXmark } from 'react-icons/fa6';

import logo from '/logo.svg'

const Navbar = () => {
    const [ip, setIP] = useState("");
    const [showMenu, SetShowMenu] = useState(false)

    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        console.log(res.data);
        setIP(res.data.ip);
    };

    useEffect(() => {
        //passing getData method to the lifecycle method
        getData();
    }, []);
  return (
    <>
        <div className="hidden lg:block">
            <div className="bg-[#001f3d] text-sm w-full flex flex-row gap-5 justify-end items-center p-5">
                <div className='flex flex-row items-center gap-2'><FaMagnifyingGlass />  <span>search</span></div>
                <div className=''>Support</div>
                <div className=''>{ip}</div>
                <div className=''>Request a Demo join</div>
                <div className=''>|</div>
                <div className='flex flex-row items-center gap-2'><span>Host</span> <FaCaretDown /></div>
                <div className=''>Sign In</div>
            </div>
        </div>
        <div className="w-full flex flex-row justify-between items-center lg:px-10 lg:py-7 p-5 border-gray-300 border-b-2">
            <div className="flex flex-row items-center gap-5">
                <img src={logo} className="h-5" alt="Zoom logo" />
                <div className="hidden lg:flex flex-row items-center gap-5 font-semibold text-black">
                    <div className=''>Products</div>
                    <div className=''>Solutions</div>
                    <div className=''>Resources</div>
                    <div className=''>Plans & Pricing</div>
                </div>
            </div>
            <div className="hidden lg:flex flex-row items-center gap-5 font-semibold text-black">
                <div className='border-2 border-[#0024f2] text-[#0024f2] font-sembold rounded-full px-4 py-2'>Contact Sales</div>
                <div className='bg-[#0024f2] text-white font-sembold rounded-full px-4 py-2'>Sign Up Free</div>
            </div>
            <div className="lg:hidden block">
                <FaBars color='black' onClick={() => SetShowMenu(true)} className='cursor-pointer'/>
            </div>
        </div>
        {showMenu && 
            <div className='flex flex-col fixed top-0 right-0 w-screen h-screen bg-black/30 z-50'>
                <div className='flex flex-col w-full relative bg-white p-5'>
                    <div className='flex flex-row items-center justify-between w-full pb-5 border-b border-gray-400'>
                        <img src={logo} alt='logo' className='h-5'/>
                        <FaRegCircleXmark color='black' size={24} onClick={() => SetShowMenu(false)} className='cursor-pointer'/>
                    </div>
                    <div className='flex flex-col tracking-wide w-full gap-[2rem] mt-5'>
                        <div className="bg-[#001f3d] text-sm w-full flex flex-row flex-wrap gap-5 justify-end items-center p-5">
                            <div className='flex flex-row items-center gap-2'><FaMagnifyingGlass />  <span>search</span></div>
                            <div className=''>Support</div>
                            <div className=''>{ip}</div>
                            <div className=''>Request a Demo join</div>
                            <div className=''>|</div>
                            <div className='flex flex-row items-center gap-2'><span>Host</span> <FaCaretDown /></div>
                            <div className=''>Sign In</div>
                        </div>
                        <div className='text-black font-semibold'>Products</div>
                        <div className='text-black font-semibold'>Solutions</div>
                        <div className='text-black font-semibold'>Resources</div>
                        <div className='text-black font-semibold'>Plans & Pricing</div>
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default Navbar