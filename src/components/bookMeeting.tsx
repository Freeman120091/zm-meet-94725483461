import { useRef, useState } from 'react'
import InputField from './input'
import { FaRegCopy } from 'react-icons/fa6';
import { encodeURL, validateEmail } from '../utils/common';

const BookMeeting = () => {
    const [meetingLink, setMeetingLink] = useState("");
    const companyNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {  
        if (!companyNameRef.current?.value || !emailRef.current?.value)
          return alert('Please fill in both the Company Name and Email.') 

        if (emailRef.current?.value && !validateEmail(emailRef.current?.value))
          return alert('Please enter a valid email.')

        const link = `/meeting?company=${companyNameRef.current?.value}&email=${emailRef.current?.value}`

        setMeetingLink(encodeURL(link))
    };

    return (
        <div className='flex flex-col items-center gap-10 my-[3rem]'>
            <div className='text-black lg:text-3xl text-2xl font-bold'>Book Your Meeting Here</div>
            <div className='lg:w-2/5 w-10/12 flex flex-col gap-5'>
                <InputField
                    type="text"
                    title="Company Name"
                    placeholder="Enter Company Name"
                    ref={companyNameRef}
                />
                <InputField
                    type="text"
                    title="Email"
                    placeholder="Enter Company Email"
                    ref={emailRef}
                />
                <div onClick={handleSubmit} className='bg-[#0024f2] hover:bg-[#004bb5] hover:drop-shadow-lg hover:-translate-y-1 cursor-pointer rounded-full text-center py-2 font-semibold mt-5'>BOOK MEETING</div>
                <div className='text-black text-center text-xl font-bold'>Link Generated:</div>
                {meetingLink && <a href={meetingLink} target='_blank' className='text-[#0024f2] text-center text-sm underline'>{meetingLink}</a> }
                <div className='flex flex-row justify-center w-full'>
                    <div className='border-2 border-[#0024f2] text-[#0024f2] hover:text-white flex flex-row items-center gap-3 hover:bg-[#004bb5] hover:shadow-lg cursor-pointer rounded-full text-center py-2 px-8 font-semibold'>
                        <FaRegCopy color='black'/>
                        <span>COPY MEETING LINK</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookMeeting