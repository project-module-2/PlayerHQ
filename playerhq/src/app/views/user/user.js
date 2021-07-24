import React, {Component} from "react"

import {findUsersByIdEndPoint} from '../../services/findUserById';
import {friendRequestsToEndPoint} from '../../services/friendRequestsList';
import {friendRequestsFromEndPoint} from '../../services/friendRequestsList';
import {sendFriendRequestEndPoint} from '../../services/friendRequestsList';
import {rejectFriendRequestEndPoint} from '../../services/friendRequestsList';
import {acceptFriendRequestEndPoint} from '../../services/friendRequestsList';
import {deleteFriendEndPoint} from '../../services/friendRequestsList';

import FriendRequest from "../../components/FriendRequest";
import Button from '../../components/Button';
import DisplayUser from '../../components/displayUser';
import Friend from '../../components/Friend';
import Avatars from "../../assets/images/avatar.json";
import Banners from "../../assets/images/banner.json";
import './styles.css'

class User extends Component {
    state={
        user: JSON.parse(localStorage.getItem("user")) || {},
        isOpenAdmin:false,
        channelsDisplay:{
            discordDisplay:"none",
            twitchDisplay:"none",
            skypeDisplay:"none",
            xboxGamertagDisplay:"none",
            steamUsernameDisplay:"none",
            playstationUsernameDisplay:"none",
            nintendoUsernameDisplay:"none"
        },
        controllerDisplay:{
            friendsDisplay:"none",
            friendRequestDisplay:"none",
            editBtnDisplay:"none",
            sendFriendRequestBtnDisplay:"none",
            deleteFriendBtnDisplay:"none"
        },
        _id:"",
        username:"",
        avatar:"",
        favoriteGame:"",
        intereses:"",
        platforms:"",
        discord:"",
        twitch:"",
        skype:"",
        xboxGamertag:"",
        steamUsername:"",
        playstationUsername:"",
        nintendoUsername:"",
        _friendsIds:[],
        _friendsData:[],
        _friendRequests:[],
        loaded:false
    }

    fillFriendRequestData=async(userId, friendRequestId)=>{
        let {_friendRequests} = this.state;
        try {
            const friendRequestData = {};
            const result = await findUsersByIdEndPoint({"_id":userId});
            friendRequestData['username'] = result.data.result.username;
            friendRequestData['avatar'] = result.data.result.avatar;
            friendRequestData['friendRequestId'] = friendRequestId;
            _friendRequests.push(friendRequestData);
            this.setState({_friendRequests});
        }
        catch(error){
            console.log(error);
        }
    }

    fillFriendsUserData=async(userId)=>{
        let {_friendsData} = this.state;
        try {
            const friendData = {};
            const result = await findUsersByIdEndPoint({"_id":userId});
            friendData['username'] = result.data.result.username;
            friendData['avatar'] = result.data.result.avatar;
            friendData['_id'] = result.data.result._id;
            _friendsData.push(friendData);
            this.setState({_friendsData});
        }
        catch(error){
            console.log(error);
        }
    }

    getDataInit=async()=>{
        console.log("USER",this.state.user);
        const {user} = this.state;
        const {history} = this.props;

        try {
            const results = await findUsersByIdEndPoint({"_id":this.props.match.params.id});
            const friendRequestsList = await friendRequestsToEndPoint();
            const friendRequestsList2 = await friendRequestsFromEndPoint();

            this.setState({friendRequestDataResult:results.data.result._friends});
            friendRequestsList.data.result.map(element => {
                this.fillFriendRequestData(element._from, element._id);
            })

            await results.data.result._friends.map(element => {
                this.fillFriendsUserData(element);
            })

            this.setState({
                _id:results.data.result._id,
                username:results.data.result.username,
                avatar:results.data.result.avatar,
                favoriteGame:results.data.result.favoriteGame,
                intereses:results.data.result.intereses,
                platforms:results.data.result.platforms,
                discord:results.data.result.discord,
                twitch:results.data.result.twitch,
                skype:results.data.result.skype,
                xboxGamertag:results.data.result.xboxGamertag,
                steamUsername:results.data.result.steamUsername,
                playstationUsername:results.data.result.playstationUsername,
                nintendoUsername:results.data.result.nintendoUsername,
                _friendsIds:results.data.result._friends
            });
        }
        catch(error){
            history.push('/');
        }

        this.setState({channelsDisplay:{
            discordDisplay:this.state.discord !== undefined ? "block" : "none",
            twitchDisplay: this.state.twitch !== undefined ? "block" : "none",
            skypeDisplay: this.state.skype !== undefined ? "block" : "none",
            xboxGamertagDisplay: this.state.xboxGamertag !== undefined ? "block" : "none",
            steamUsernameDisplay: this.state.steamUsername !== undefined ? "block" : "none",
            playstationUsernameDisplay: this.state.playstationUsername !== undefined ? "block" : "none",
            nintendoUsernameDisplay: this.state.nintendoUsername !== undefined ? "block" : "none"
        }});

        if(this.state._id === user._id) {
            this.setState({controllerDisplay:{
                friendsDisplay:"block",
                friendRequestDisplay:"block",
                editBtnDisplay:"block",
                sendFriendRequestBtnDisplay:"none",
                deleteFriendBtnDisplay:"none"
            }});
        }
        else if (this.state.user._friends!==undefined && this.state.user._friends.includes(this.state._id)) {
            this.setState({controllerDisplay:{
                friendsDisplay:"none",
                friendRequestDisplay:"none",
                editBtnDisplay:"none",
                sendFriendRequestBtnDisplay:"none",
                deleteFriendBtnDisplay:"block"
            }});
        }
        else if(this.state.user._friends!==undefined && !this.state.user._friends.includes(this.state._id)) {
            this.setState({controllerDisplay:{
                friendsDisplay:"none",
                friendRequestDisplay:"none",
                editBtnDisplay:"none",
                sendFriendRequestBtnDisplay:"block",
                deleteFriendBtnDisplay:"none"
            }});
        }

        this.setState({loaded:true});
    }

    sendFriendRequest=async()=>{
        const {user} = this.state;
        try{
            this.setState({controllerDisplay:{
                friendsDisplay:"none",
                friendRequestDisplay:"none",
                editBtnDisplay:"none",
                sendFriendRequestBtnDisplay:"none",
                deleteFriendBtnDisplay:"none"
            }});
        }
        catch(error){
            console.log(error);
        }
    }

    rejectFriendRequest=async(id)=>{
        try{
            await rejectFriendRequestEndPoint({id:id});
            this.setState({_friendRequests:[]});
            this.setState({_friendsData:[]});
            await this.getDataInit();
        }
        catch(error){
            console.log(error);
        }
    }

    acceptFriendRequest=async(id)=>{
        try{
            await acceptFriendRequestEndPoint({id:id});
            this.setState({_friendRequests:[]});
            this.setState({_friendsData:[]});
            await this.getDataInit();
        }
        catch(error){
            console.log(error);
        }
    }

    deleteFriend=async()=>{
        try{
            await deleteFriendEndPoint({id:this.state._id});
            this.setState({controllerDisplay:{
                friendsDisplay:"none",
                friendRequestDisplay:"none",
                editBtnDisplay:"none",
                sendFriendRequestBtnDisplay:"block",
                deleteFriendBtnDisplay:"none"
            }});
            this.setState({_friendRequests:[]});
            this.setState({_friendsData:[]});
            await this.getDataInit();
        }
        catch(error){
            console.log(error);
        }
    }

    seeUser=async(id)=>{
        const {history} = this.props;
        try{
            history.push(`/user/${id}`)
            window.location.reload();
        }
        catch(error){
            console.log(error);
        }
    }


    componentDidUpdate(prevProps,prevState){
        window.onpopstate = e => {
            window.location.reload();
         }
    }

    async componentWillMount(){
        const {user} = this.state;
        const {history} = this.props;

        if(!Object.keys(user).length || user === undefined){
            history.push('/')
        }

        await this.getDataInit();
    }

    showRender() {
        if(this.state.loaded) {
            return (
                <div className="bodyDiv">
                        <div className="profileContent">
                            <div class="dashboardBtn">
                                <Button
                                    text="Regresar al dashboard"
                                    onPress={()=>this.props.history.push(`/dashboard`)}
                                />
                            </div>
                            <div className="profileTop" style={{backgroundImage:`url("${Banners.banners[0].src}")`}} >
                                <div className="userProfile">
                                    <img src={Avatars.avatars[this.state.avatar].src} alt="avatar"/>
                                    <span>{this.state.username}</span>
                                </div>
                            </div>
                            <div className="profileBottom">
                                <div className="profileLeft" style={{display:this.state.controllerDisplay.friendsDisplay}}>
                                    <span>Tus amigos +</span>
                                    <ul className="list-group bg-transparent">
                                        {this.state._friendsData.map(element=>(
                                            <DisplayUser
                                                text={element.username}
                                                avatarSrc={Avatars.avatars[element.avatar].src}
                                                onPress={()=>this.seeUser(element._id)}
                                            />
                                        ))}
                                    </ul>
                                </div>
                                <div className="profileMiddle">
                                    <div className="profileData">
                                        <span className="dataTitle">Videojuego favorito:</span>
                                        <span>{this.state.favoriteGame}</span>
                                    </div>
                                    <div className="profileData">
                                        <span className="dataTitle">Estilo de juego:</span>
                                        <span>{this.state.intereses[0]}</span>
                                    </div>
                                    <div className="profileData">
                                        <span className="dataTitle">Plataforma:</span>
                                        <span>{this.state.platforms}</span>
                                    </div>
                                    <div className="profileData">
                                        <span className="dataTitle">Canales:</span>
                                        <span style={{display:this.state.channelsDisplay.twitchDisplay}}>Twitch: {this.state.twitch}</span>
                                        <span style={{display:this.state.channelsDisplay.discordDisplay}}>Discord: {this.state.discord}</span>
                                        <span style={{display:this.state.channelsDisplay.steamUsernameDisplay}}>Steam: {this.state.steamUsername}</span>
                                        <span style={{display:this.state.channelsDisplay.xboxGamertagDisplay}}>Xbox Gamertag: {this.state.xboxGamertag}</span>
                                        <span style={{display:this.state.channelsDisplay.playstationUsernameDisplay}}>PSN: {this.state.playstationUsername}</span>
                                        <span style={{display:this.state.channelsDisplay.nintendoUsernameDisplay}}>Nintendo: {this.state.nintendoUsername}</span>
                                    </div>
                                </div>
                                <div className="profileRight" style={{display:this.state.controllerDisplay.friendRequestDisplay}}>
                                    <span className="profileRightTitle">Solicitudes de amistad</span>
                                    <ul className="list-group bg-transparent">
                                        {this.state._friendRequests.map(element=>(
                                            <FriendRequest
                                                username = {element.username}
                                                avatarSrc = {Avatars.avatars[element.avatar].src}
                                                message="Quiere ser tu amigo"
                                                onPress={()=>this.seeUser(element._from)}
                                                acceptOnPress={()=>this.acceptFriendRequest(element.friendRequestId)}
                                                rejectOnPress={()=>this.rejectFriendRequest(element.friendRequestId)}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="profileControls">
                                <span style={{display:this.state.controllerDisplay.sendFriendRequestBtnDisplay}}>
                                    <Button
                                        text="Enviar solicitud de amistad"
                                        onPress={()=> this.sendFriendRequest(this.state.user.id)}
                                    />
                                </span>
                                <span style={{display:this.state.controllerDisplay.deleteFriendBtnDisplay}}>
                                    <Button
                                        text="Eliminar amigo"
                                        onPress={()=>this.deleteFriend()}
                                    />
                                </span>
                                {/*<span style={{display:this.state.controllerDisplay.editBtnDisplay}}>
                                    <Button
                                        text="Editar mi perfil"
                                        onPress={()=> {}}
                                    />
                                        </span>*/}
                            </div>
                        </div>
                    </div>
            )
        }
        else {
            return (<span>Loading...</span>);
        }

    }

    render() {
        return this.showRender();
    }
}


export default User;