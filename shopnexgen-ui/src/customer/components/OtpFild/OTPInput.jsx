import React, { useState, useEffect } from 'react';

const OTPInput = ({ length, onChange, error = false }) => {
    const [otp, setOtp] = useState(Array(length).fill(''));

    useEffect(() => {
        onChange(otp.join(''));
    }, [otp, onChange]);

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next input field if there is a next one
            if (value && index < otp.length - 1) {
                const nextInput = document.getElementById(`otp-input-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-input-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    return (
        <div className='flex gap-3'>
            {otp.map((item, index) => (
                <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    value={item}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={1}
                    className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none sm:text-sm h-10 w-10 flex justify-center items-center text-center focus:border-pink-500`}
                />
            ))}
        </div>
    );
};

export default OTPInput;
