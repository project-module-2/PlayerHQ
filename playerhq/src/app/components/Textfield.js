import React from 'react'

const Textfield = ({
    type="text",
    name,
    value,
    handleChange = () => {},
    placeholder='',
    width=100
}) => (
    <input
    style={{width:`${width}%`}}
    type={type}
    className="form-control-plaintext"
    id={name}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={handleChange}
    />
)

export default Textfield