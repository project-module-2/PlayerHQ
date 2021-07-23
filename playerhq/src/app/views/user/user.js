import React, {Component} from "react"
import logo from '../../assets/images/logo_color.png';
import profile from '../../assets/icons/profile.png';

import {loginEndpoint} from '../../services/auth-ws'

import Button from '../../components/Button';
import DisplayUser from '../../components/displayUser';
import Textfield from "../../components/Textfield";
import Avatars from "../../assets/images/avatar.json";
import Banners from "../../assets/images/banner.json";

import './styles.css'
import FriendRequest from "../../components/FriendRequest";

class User extends Component {
    state={
        user: JSON.parse(localStorage.getItem("user")) || {},
        isOpenAdmin:false,
        popularUsers:[],
        tableResult:[],
        data:{
            user:"",
            platform:"",
            style:"",
            favoriteGame:""
        }
    }

    /*getDataInit=async()=>{
        try{
            await loginEndpoint({email:"miEmail@email2.com",password:"pass123"});
            const popularUsersArr = await PopularUsersEndPoint();
            this.setState({popularUsers:popularUsersArr.data.result});
            this.state.popularUsers.map((element)=>{
                console.log(element._id);
                console.log(element.username);
                console.log(element.avatar);
            })
        }
        catch(error){
            console.log(error);
        }
    }*/

    componentDidMount(){
        console.log(this.props.match.params.id);
/*        const {user} = this.state
        const {history} = this.props
        //Object.keys({}) noss regresa un [key,key,key]
        console.log(Object.keys(user))
        if(!Object.keys(user).length || user === undefined){
            //history.push('/')
        }

        this.getDataInit();*/
    }


    render() {
        return (
            <div class="bodyDiv">
                    <div class="profileContent">
                        <div class="profileTop" style={{backgroundImage:`url("${Banners.banners[0].src}")`}} >
                            <div class="userProfile">
                                <img src={Avatars.avatars[0].src} alt="avatar"/>
                                <span>Mi Username</span>
                            </div>
                        </div>
                        <div class="profileBottom">
                            <div class="profileLeft">
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
                                    <span>League of Legends</span>
                                </div>
                                <div class="profileData">
                                    <span class="dataTitle">Estilo de juego:</span>
                                    <span>Casual</span>
                                </div>
                                <div class="profileData">
                                    <span class="dataTitle">Plataforma:</span>
                                    <span>PC</span>
                                </div>
                                <div class="profileData">
                                    <span class="dataTitle">Canales:</span>
                                    <span>Twitch: asd</span>
                                    <span>Discord: xcvbx</span>
                                    <span>Steam: asdasd</span>
                                    <span>Xbox Gamertag: asdasd</span>
                                    <span>PSN: asdasd</span>
                                    <span>Nintendo: asdasd</span>
                                </div>
                            </div>
                            <div class="profileRight">
                                <span class="profileRightTitle">Solicitudes de amistad</span>
                                <ul class="list-group bg-transparent">
                                    <FriendRequest
                                        username = "Usuario 1"
                                        avatarSrc={Avatars.avatars[0].src}
                                        message="Quiere ser tu amigo"
                                        userOnPress={()=>console.log("userOnPress")}
                                        acceptOnPress={()=>console.log("acceptOnPress")}
                                        rejectOnPress={()=>console.log("rejectOnPress")}
                                    />
                                    <FriendRequest
                                        username = "Usuario 2"
                                        avatarSrc={Avatars.avatars[1].src}
                                        message="Quiere ser tu amigo"
                                        userOnPress={()=>console.log("userOnPress")}
                                        acceptOnPress={()=>console.log("acceptOnPress")}
                                        rejectOnPress={()=>console.log("rejectOnPress")}
                                    />
                                    <FriendRequest
                                        username = "Usuario 3"
                                        avatarSrc={Avatars.avatars[2].src}
                                        message="Quiere ser tu amigo"
                                        userOnPress={()=>console.log("userOnPress")}
                                        acceptOnPress={()=>console.log("acceptOnPress")}
                                        rejectOnPress={()=>console.log("rejectOnPress")}
                                    />
                                    <FriendRequest
                                        username = "Usuario 4"
                                        avatarSrc={Avatars.avatars[3].src}
                                        message="Quiere ser tu amigo"
                                        userOnPress={()=>console.log("userOnPress")}
                                        acceptOnPress={()=>console.log("acceptOnPress")}
                                        rejectOnPress={()=>console.log("rejectOnPress")}
                                    />
                                    <FriendRequest
                                        username = "Usuario 5"
                                        avatarSrc={Avatars.avatars[4].src}
                                        message="Quiere ser tu amigo"
                                        userOnPress={()=>console.log("userOnPress")}
                                        acceptOnPress={()=>console.log("acceptOnPress")}
                                        rejectOnPress={()=>console.log("rejectOnPress")}
                                    />
                                </ul>
                            </div>
                        </div>
                        <div class="profileControls">
                            <Button
                                text="Enviar solicitud de amistad"
                                onPress={()=> console.log("Solicitud de amistad")}
                            />
                            <Button
                                text="Eliminar amigo"
                                onPress={()=> console.log("Eliminar amigo")}
                            />
                            <Button
                                text="Editar mi perfil"
                                onPress={()=> console.log("Editar mi perfil")}
                            />
                        </div>
                    </div>
                </div>
        )
    }
}


export default User;