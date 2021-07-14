import React from 'react'

const TextInput = ({
    textLabel,
    type="text",
    name,
    value,
    handleChange = () => {},
    placeholder=''
}) => (
    <div className="mb-3">
        {/* con este validamos para mosstrar el label */}
    {textLabel && <label 
        for="exampleFormControlInput1" 
        class="form-label">
            {textLabel}
    </label>}
    <input 
        type={type}
        className="form-control" 
        id={name}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        />
    </div>
)

export default TextInput