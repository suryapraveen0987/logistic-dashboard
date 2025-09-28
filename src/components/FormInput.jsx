import React from 'react';

// This component now accepts the 'error' prop from App.jsx
const FormInput = ({ id, label, placeholder, type = 'text', required = true, isTextArea = false, value, onChange, error, disabled }) => {
    // Determine if the input should get the error class
    // Using a specific class name when an error is present
    const errorClass = error ? 'form-input-error' : ''; 
    const baseClassName = `form-input ${isTextArea ? 'form-textarea' : ''}`;
    const inputClassName = `${baseClassName} ${errorClass}`;

    return (
        <div className="form-field">
            <label htmlFor={id} className="form-label">
                {label} {required && <span className="text-required">*</span>}
            </label>
            
            {isTextArea ? (
                <textarea
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    rows="4"
                    className={inputClassName}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                ></textarea>
            ) : (
                <div className="input-wrapper">
                    <input
                        id={id}
                        name={id}
                        type={type}
                        placeholder={placeholder}
                        className={inputClassName}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                    />
                    {/* Optional icons for visual flair on date/time inputs */}
                    {(label.includes('Date') || label.includes('Time')) && (
                        <span className="input-icon">
                            {label.includes('Date') ? '🗓' : '🕒'}
                        </span>
                    )}
                </div>
            )}
            
            {/* DISPLAY THE ERROR MESSAGE */}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default FormInput;
