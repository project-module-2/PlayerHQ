const FriendRequest = ({
    message='Message',
    username='user',
    userOnPress=()=>{},
    rejectOnPress=()=>{},
    acceptOnPress=()=>{},
    disabled=false,
    avatarSrc="https://res.cloudinary.com/arenagoodgame/image/upl…:262c35/v1626556232/arena_avatars/1-04_os5nmj.jpg",
    })=>(
    <li class="list-group-item bg-transparent" style={
        {
            "display": "flex",
            "flex-direction": "column",
        }
    }>
        <div>
            <img src={avatarSrc} style={{"height":35, "margin-right":5, "border-radius":"50%"}}/>
            <a onClick={userOnPress} disabled={disabled}>{username}</a>
        </div>
        <div><span style={{"margin-right":10}}>{message}</span></div>
        <div>
            <button
            disabled={disabled}
            className={`btn btn-primary`}
            onClick={acceptOnPress}
            style={{"margin-right":10, fontSize:"0.8em"}}>
            Aceptar
            </button>
            <button
            disabled={disabled}
            className={`btn btn-primary`}
            onClick={rejectOnPress}
            style={{fontSize:"0.8em"}}
            >
            Rechazar
            </button>
        </div>
    </li>
)

export default FriendRequest