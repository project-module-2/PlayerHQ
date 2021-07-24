const Button = ({
    text='Send',
    type='primary',
    onPress=()=>{},
    disabled,
    displayed="visibility"
    })=>(
    <button
        display={displayed}
        disabled={disabled}
        className={`btn btn-${type}`}
        onClick={onPress}
    >
    {text}
    </button>
)

export default Button

