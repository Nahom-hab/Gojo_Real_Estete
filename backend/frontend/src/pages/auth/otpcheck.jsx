import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUser from '../../zustand/useUser';

export default function Otpcheck() {
    const location = useLocation();
    const userData = location.state || {};
    const navigate = useNavigate();
    const { isEng } = useUser();
    const [error, setError] = useState('');
    const [otpSentMessage, setOtpSentMessage] = useState('');
    const [code, setCode] = useState({
        first: '',
        second: '',
        third: '',
        fourth: '',
        fifth: ''
    });
    const [counter, setCounter] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const inputRefs = useRef([]);

    useEffect(() => {
        if (counter > 0) {
            const timer = setTimeout(() => {
                setCounter(counter - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setIsResendDisabled(false);
        }
    }, [counter]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        if (value.length <= 1) {
            setCode((prevData) => ({
                ...prevData,
                [name]: value,
            }));

            if (value && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[e.target.name] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleResendOtp = async () => {
        if (isResendDisabled) return;

        setIsLoading(true); // Start loading
        try {
            const res = await fetch('/api/auth/sendOtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (res.ok) {
                const message = await res.json();
                setOtpSentMessage(isEng ? 'OTP resent successfully!' : 'OTP በተሳካነት ተላክቷል!');
                setIsResendDisabled(true);
                setCounter(30);
            } else {
                const errorData = await res.json();
                setError(errorData.message || (isEng ? 'Failed to resend OTP' : 'OTP ወደ ቀደም አልተላከም'));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); // End loading
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otp = `${code.first}${code.second}${code.third}${code.fourth}${code.fifth}`;
        if (otp.length === 5) {
            try {
                const response = await fetch('/api/auth/VerifyOtp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: userData.email, otp: otp }),
                });

                if (response.ok) {
                    const { otpVerified, message } = await response.json();
                    if (otpVerified) {
                        try {
                            const res = await fetch('/api/auth/signup', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(userData),
                            });

                            if (res.ok) {
                                navigate('/signUpSuccess');
                            } else {
                                const errorData = await res.json();
                                console.error('Signup failed:', errorData);
                            }
                        } catch (error) {
                            console.error('Error signing up:', error);
                        }
                    } else {
                        setError(message);
                    }
                }

            } catch (error) {
                console.log(error.message);
            }

        } else {
            setError(isEng ? 'Enter a valid verification code' : 'እባኮትን እውቅና ኮድ ይግቡ');
        }
    };

    return (
        <div className='flex flex-col w-full  items-center px-4 h-screen  md:px-10 bg-gray-50 dark:bg-gray-900 pt-32'>
            <div className='text-green-600 flex flex-col items-center font-bold text-lg md:text-3xl mb-6'>
                {isEng
                    ? 'We have sent a Verification Code'
                    : 'የማረጋገጫ ኮድ ተላክቷል'}
                <span className='block text-[13px] md:text-xl'>{isEng ? `to ${userData.email}` : `ወደ ${userData.email}`}</span>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col items-center gap-2'>
                <div className='flex gap-3'>
                    {['first', 'second', 'third', 'fourth', 'fifth'].map((field, index) => (
                        <input
                            key={field}
                            ref={(el) => (inputRefs.current[index] = el)}
                            value={code[field]}
                            name={field}
                            type="text"
                            className='bg-slate-300 dark:bg-gray-700 w-14 h-14 rounded-lg text-2xl p-3 outline-green-500 text-center dark:text-gray-200'
                            onChange={(e) => handleInputChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            maxLength={1}
                        />
                    ))}
                </div>

                <button className='bg-green-500 w-[90%] text-xl text-white font-bold rounded-lg px-5 py-3 hover:bg-green-600 transition'>
                    {isEng ? 'Submit' : 'ማመለሻ'}
                </button>

                <div className='mt-4'>
                    <button
                        type="button"
                        onClick={handleResendOtp}
                        className={`text-green-600 font-bold hover:cursor-pointer hover:text-green-300 ${isResendDisabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isResendDisabled || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loader"></span> {/* Spinner */}
                                {isEng ? ' Resending...' : ' ወደ እንደዚያ እቀይሩ...'}
                            </>
                        ) : (
                            (isEng ? 'Resend OTP' : 'OTP ይቀይሩ')
                        )}
                    </button>
                    {isResendDisabled && (
                        <span className='ml-4 text-red-500'>
                            {isEng ? `Resend available in ${counter}s` : `ወደ እነዚያ ወቅት በ${counter}s ይቀይሩ`}
                        </span>
                    )}
                </div>
            </form>

            {otpSentMessage && <p className='text-green-500 mt-2'>{otpSentMessage}</p>}
            {error && <p className='text-red-500 mt-2'>{error}</p>}

            {/* Spinner CSS */}
            <style>
                {`
                    .loader {
                        border: 4px solid rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        border-top: 4px solid #fff;
                        width: 20px;
                        height: 20px;
                        animation: spin 0.6s linear infinite;
                        display: inline-block;
                        margin-right: 8px;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
}