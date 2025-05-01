const Footer = () => {
    const date = new Date();
    return (
        <div className="bg-stone-100 text-gray-400 text-xs w-full flex flex-col items-center p-5">
            <div className='text-center'>Copyright ©{date.getFullYear()} Zoom Video Communication, Inc. All Rights Reserved.</div>
            <div className='text-[#0024f2] text-center'>Privacy Policy <span className='text-gray-400'>|</span> Terms of Service</div>
        </div>
    )
}

export default Footer