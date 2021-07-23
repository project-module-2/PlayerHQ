import React, {Component} from "react"

import {findUsersByIdEndPoint} from '../../services/findUserById';
import {friendRequestsToEndPoint} from '../../services/friendRequestsList';
import {sendFriendRequestEndPoint} from '../../services/friendRequestsList';
import {rejectFriendRequestEndPoint} from '../../services/friendRequestsList';
import {acceptFriendRequestEndPoint} from '../../services/friendRequestsList';

import FriendRequest from "../../components/FriendRequest";
import Button from '../../components/Button';
import DisplayUser from '../../components/displayUser';
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
        _friends:[],
        _friendRequests:[],
        loaded:false
    }

    fillFriendRequestData=async(userId, friendRequestId)=>{
        try {
            const friendRequestData = {};
            const result = await findUsersByIdEndPoint({"_id":userId});
            friendRequestData['username'] = result.data.result.username;
            friendRequestData['avatar'] = result.data.result.avatar;
            friendRequestData['friendRequestId'] = friendRequestId;
            this.state._friendRequests.push(friendRequestData);
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
            const friendRequestsList = await friendRequestsToEndPoint({"_id":this.props.match.params.id});

            await friendRequestsList.data.result.map(element => {
                this.fillFriendRequestData(element._from, element._id);
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
                nintendoUsername:results.data.result.nintendoUsername
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
        else if (this.state._friends.includes(user._id)) {
            this.setState({controllerDisplay:{
                friendsDisplay:"none",
                friendRequestDisplay:"none",
                editBtnDisplay:"none",
                sendFriendRequestBtnDisplay:"none",
                deleteFriendBtnDisplay:"block"
            }});
        }
        else {
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
            await sendFriendRequestEndPoint({_to:user._id});
        }
        catch(error){
            console.log(error);
        }
    }

    rejectFriendRequest=async(id)=>{
        try{

        }
        catch{

        }
    }

    acceptFriendRequest=async(id)=>{
        try{

        }
        catch{

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
                <div class="bodyDiv">
                        <div class="profileContent">
                            <div class="profileTop" style={{backgroundImage:`url("${Banners.banners[0].src}")`}} >
                                <div class="userProfile">
                                    <img src={Avatars.avatars[this.state.avatar].src} alt="avatar"/>
                                    <span>{this.state.username}</span>
                                </div>
                            </div>
                            <div class="profileBottom">
                                <div class="profileLeft" style={{display:this.state.controllerDisplay.friendsDisplay}}>
                                    <span>Tus amigos +</span>
                                    <ul class="list-group bg-transparent">
                                        <DisplayUser
                                            text="amigo 1"
                                            avatarSrc={Avatars.avatars[0].src}
                                            onPress={()=>console.log("amigo 1")}
                                        />
                                        <DisplayUser
                                            text="amigo 2"
                                            avatarSrc={Avatars.avatars[1].src}
                                            onPress={()=>console.log("amigo 2")}
                                        />
                                        <DisplayUser
                                            text="amigo 3"
                                            avatarSrc={Avatars.avatars[2].src}
                                            onPress={()=>console.log("amigo 3")}
                                        />
                                        <DisplayUser
                                            text="Mi username muy largo"
                                            avatarSrc={Avatars.avatars[3].src}
                                            onPress={()=>console.log("Mi username muy largo")}
                                        />
                                        <DisplayUser
                                            text="amigo 5"
                                            avatarSrc={Avatars.avatars[4].src}
                                            onPress={()=>console.log("amigo 5")}
                                        />
                                    </ul>
                                </div>
                                <div class="profileMiddle">
                                    <div class="profileData">
                                        <span class="dataTitle">Videojuego favorito:</span>
                                        <span>{this.state.favoriteGame}</span>
                                    </div>
                                    <div class="profileData">
                                        <span class="dataTitle">Estilo de juego:</span>
                                        <span>{this.state.intereses[0]}</span>
                                    </div>
                                    <div class="profileData">
                                        <span class="dataTitle">Plataforma:</span>
                                        <span>{this.state.platforms}</span>
                                    </div>
                                    <div class="profileData">
                                        <span class="dataTitle">Canales:</span>
                                        <span style={{display:this.state.channelsDisplay.twitchDisplay}}>Twitch: {this.state.twitch}</span>
                                        <span style={{display:this.state.channelsDisplay.discordDisplay}}>Discord: {this.state.discord}</span>
                                        <span style={{display:this.state.channelsDisplay.steamUsernameDisplay}}>Steam: {this.state.steamUsername}</span>
                                        <span style={{display:this.state.channelsDisplay.xboxGamertagDisplay}}>Xbox Gamertag: {this.state.xboxGamertag}</span>
                                        <span style={{display:this.state.channelsDisplay.playstationUsernameDisplay}}>PSN: {this.state.playstationUsername}</span>
                                        <span style={{display:this.state.channelsDisplay.nintendoUsernameDisplay}}>Nintendo: {this.state.nintendoUsername}</span>
                                    </div>
                                </div>
                                <div class="profileRight" style={{display:this.state.controllerDisplay.friendRequestDisplay}}>
                                    <span class="profileRightTitle">Solicitudes de amistad</span>
                                    <ul class="list-group bg-transparent">
                                        {console.log("STATE",this.state)}
                                        {console.log("FRIEND REQUESTS DESDE EL RENDER ",this.state._friendRequests)}
                                        {this.state._friendRequests.map(element=>(
                                            <FriendRequest
                                                username = {element.username}
                                                avatarSrc = {Avatars.avatars[element.avatar].src}
                                                message="Quiere ser tu amigo"
                                                userOnPress={()=>console.log("userOnPress")}
                                                acceptOnPress={()=>console.log("acceptOnPress")}
                                                rejectOnPress={()=>console.log("rejectOnPress")}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div class="profileControls">
                                <span style={{display:this.state.controllerDisplay.sendFriendRequestBtnDisplay}}>
                                    <Button
                                        text="Enviar solicitud de amistad"
                                        onPress={()=> {}}
                                    />
                                </span>
                                <span style={{display:this.state.controllerDisplay.deleteFriendBtnDisplay}}>
                                    <Button
                                        text="Eliminar amigo"
                                        onPress={()=>{}}
                                    />
                                </span>
                                <span style={{display:this.state.controllerDisplay.editBtnDisplay}}>
                                    <Button
                                        text="Editar mi perfil"
                                        onPress={()=> {}}
                                    />
                                </span>
                                <span style={{display:'block'}}>
                                    <Button
                                        text="test refresh"
                                        onPress={()=> this.setState({loaded:true})}
                                    />
                                </span>
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