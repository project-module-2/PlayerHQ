const displayUser = ({
    text='User',
    onPress=()=>{},
    disabled=false,
    avatarSrc="https://res.cloudinary.com/arenagoodgame/image/upl…:262c35/v1626556232/arena_avatars/1-04_os5nmj.jpg",
    })=>(
    <li class="list-group-item bg-transparent" style={
        {   "display": "flex",
            "flex-direction": "row",
            "flex-wrap": "nowrap",
            "justify-content": "center",
            "align-items": "center",
            "align-content": "space-between"
        }
    }>
    <img src={avatarSrc} style={{"height":50, "margin-right":5, "border-radius":"50%"}}/>
    <a onClick={onPress} disabled={disabled}>{text}</a>
    </li>
)

export default displayUser