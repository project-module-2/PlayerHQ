import React from 'react'

const ComboBox = ({
    type="text",
    name,
    value,
    handleChange = () => {},
    placeholder=''
}) => (
    <div className="form-group row">
        <input
            type={type}
            className="form-control-plaintext"
            id={name}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={handleChange}
            />

    </div>
)

export default ComboBox