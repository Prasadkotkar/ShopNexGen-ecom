import React from "react";

const OTPField = ({ id, name, label, value, onChange, error, helperText }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex gap-3">
        {value.map((digit, index) => (
          <input
            key={index}
            type="text"
            id={`${id}-${index}`}
            name={name}
            maxLength={1}
            value={digit}
            onChange={(e) => onChange(index, e.target.value)}
            className={`mt-1 block px-3 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none sm:text-sm h-14 w-14 flex justify-center items-center text-center text-xl`}
          />
        ))}
      </div>
      {helperText && <p className={`mt-2 text-sm ${error ? "text-red-600" : "text-gray-500"}`}>{helperText}</p>}
    </div>
  );
};

export default OTPField;
