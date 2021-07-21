import React, {Component} from "react"
import logo from '../../assets/images/logo_color.png';
import profile from '../../assets/icons/profile.png';

import { PopularUsersEndPoint } from "../../services/popularUsers";
import {loginEndpoint} from '../../services/auth-ws'

import Button from '../../components/Button';
import DisplayUser from '../../components/displayUser'
import Textfield from "../../components/Textfield";
import Avatars from "../../assets/images/avatar.json";

import './styles.css'

console.log(Avatars.avatars[0].src)

class Dashboard extends Component {
    state={
        user: JSON.parse(localStorage.getItem("user")) || {},
        isOpenAdmin:false,
        popularUsers:[]
    }

    getDataInit=()=>{
        console.log("HOLAAAAA");
        Promise.all([PopularUsersEndPoint()]).then(values =>{
            console.log("Popular users",values);
        })
    }

    componentDidMount(){
        const {user} = this.state
        const {history} = this.props

        //Object.keys({}) noss regresa un [key,key,key]
        if(!Object.keys(user).length || user === undefined){
            //history.push('/')
        }

        this.getDataInit();
    }

    render() {
        return (
            <div class="bodyDiv">
                    <div class="dashboardContent">
                        <div class="dashboardLeft">
                            <img class="dashboardLogo" src={logo} alt="Logo"></img>
                            <div class="popularUsers">
                                <ul class="list-group bg-transparent">
                                    <DisplayUser
                                    text="User1"
                                    avatarSrc={Avatars.avatars[Math.floor(Math.random() * 5)].src}
                                    onPress={()=>this.props.history.push('/user/594554689458')}
                                    />
                                    <DisplayUser text="User2" avatarSrc={Avatars.avatars[Math.floor(Math.random() * 5)].src}/>
                                    <DisplayUser text="User3" avatarSrc={Avatars.avatars[Math.floor(Math.random() * 5)].src}/>
                                    <DisplayUser text="User4" avatarSrc={Avatars.avatars[Math.floor(Math.random() * 5)].src}/>
                                    <DisplayUser text="User5" avatarSrc={Avatars.avatars[Math.floor(Math.random() * 5)].src}/>
                                    <DisplayUser text="User6" avatarSrc={Avatars.avatars[Math.floor(Math.random() * 5)].src}/>
                                    <DisplayUser text="User7" avatarSrc={Avatars.avatars[Math.floor(Math.random() * 5)].src}/>
                                    <DisplayUser text="User8" avatarSrc={Avatars.avatars[Math.floor(Math.random() * 5)].src}/>
                                    <DisplayUser text="User9" avatarSrc={Avatars.avatars[Math.floor(Math.random() * 5)].src}/>
                                    <DisplayUser text="User10" avatarSrc={Avatars.avatars[Math.floor(Math.random() * 5)].src}/>
                                </ul>
                            </div>
                        </div>
                        <div class="dashboardRight">
                            <div class="head">
                                <span>Explora</span>
                                <div>
                                    <a href=''><img className="profileIcon" src={profile} alt="profile icon"/>ASDASDASDASDASDASDASDASDASDAS</a>
                                    <Button
                                        text="Logout"
                                        onPress={console.log("LOGOUT")}
                                    />
                                </div>
                            </div>
                            <div class="buscador">
                                <span>
                                ¡Busca personas para jugar!
                                </span>
                                <div class="buscadorTop">
                                    <span class="userField">
                                        <label>Usuario:</label>
                                        <Textfield
                                            name='user'
                                            placeholder='Nombre de usuario'
                                            width='90'
                                        />
                                    </span>
                                    <span class="languageField">
                                        <label>Idioma:</label>
                                        <select class="form-select" aria-label="Idioma">
                                            <option selected>Idioma principal</option>
                                            <option value="Ingles">Ingles</option>
                                            <option value="Español">Español</option>
                                            <option value="Frances">Frances</option>
                                        </select>
                                    </span>
                                    <Button
                                        text="Buscar"
                                        onPress={console.log("BUSCAR")}
                                    />
                                </div>
                                <div class="buscadorBot">
                                    <span class="platformField">
                                        <label>Plataforma:</label>
                                        <select class="form-select" aria-label="Plataforma">
                                            <option selected>Donde juega</option>
                                            <option value="Xbox">Xbox</option>
                                            <option value="Playstation">Playstation</option>
                                            <option value="Nintendo">Nintendo</option>
                                            <option value="PC">PC</option>
                                            <option value="Mobiles">Mobiles</option>
                                        </select>
                                    </span>
                                    <span class="styleField">
                                        <label>Estilo:</label>
                                        <select class="form-select" aria-label="Estilo">
                                            <option selected>Estilo de juego</option>
                                            <option value="Casual">Casual</option>
                                            <option value="Competitivo">Competitivo</option>
                                            <option value="eSport">eSport</option>
                                        </select>
                                    </span>

                                    <span class="gameField">
                                        <label>Juego favorito:</label>
                                        <Textfield
                                            name='favorito'
                                            placeholder='Juego favorito'
                                            width='80'
                                        />
                                    </span>
                                </div>
                            </div>
                            <div class="tablaUsuarios">
                                <table class="table table-striped table-dark">
                                    <thead>
                                        <tr>
                                            <th scope="col">Usuario</th>
                                            <th scope="col">Juego Favorito</th>
                                            <th scope="col">Estilo de juego</th>
                                            <th scope="col">Donde juega</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Mark</td>
                                            <td>Mario Bros</td>
                                            <td>Casual</td>
                                            <td>Switch</td>
                                        </tr>
                                        <tr>
                                            <td>Jacob</td>
                                            <td>Counter Strike: Global Offensive</td>
                                            <td>Competitivo</td>
                                            <td>PC</td>
                                        </tr>
                                        <tr>
                                            <td>Larry</td>
                                            <td>League of Legends</td>
                                            <td>eSport</td>
                                            <td>PC</td>
                                        </tr>
                                        <tr>
                                            <td>Mark</td>
                                            <td>Mario Bros</td>
                                            <td>Casual</td>
                                            <td>Switch</td>
                                        </tr>
                                        <tr>
                                            <td>Jacob</td>
                                            <td>Counter Strike: Global Offensive</td>
                                            <td>Competitivo</td>
                                            <td>PC</td>
                                        </tr>
                                        <tr>
                                            <td>Larry</td>
                                            <td>League of Legends</td>
                                            <td>eSport</td>
                                            <td>PC</td>
                                        </tr>
                                        <tr>
                                            <td>Mark</td>
                                            <td>Mario Bros</td>
                                            <td>Casual</td>
                                            <td>Switch</td>
                                        </tr>
                                        <tr>
                                            <td>Jacob</td>
                                            <td>Counter Strike: Global Offensive</td>
                                            <td>Competitivo</td>
                                            <td>PC</td>
                                        </tr>
                                        <tr>
                                            <td>Larry</td>
                                            <td>League of Legends</td>
                                            <td>eSport</td>
                                            <td>PC</td>
                                        </tr>
                                        <tr>
                                            <td>Mark</td>
                                            <td>Mario Bros</td>
                                            <td>Casual</td>
                                            <td>Switch</td>
                                        </tr>
                                        <tr>
                                            <td>Jacob</td>
                                            <td>Counter Strike: Global Offensive</td>
                                            <td>Competitivo</td>
                                            <td>PC</td>
                                        </tr>
                                        <tr>
                                            <td>Larry</td>
                                            <td>League of Legends</td>
                                            <td>eSport</td>
                                            <td>PC</td>
                                        </tr>
                                        <tr>
                                            <td>Mark</td>
                                            <td>Mario Bros</td>
                                            <td>Casual</td>
                                            <td>Switch</td>
                                        </tr>
                                        <tr>
                                            <td>Jacob</td>
                                            <td>Counter Strike: Global Offensive</td>
                                            <td>Competitivo</td>
                                            <td>PC</td>
                                        </tr>
                                        <tr>
                                            <td>Larry</td>
                                            <td>League of Legends</td>
                                            <td>eSport</td>
                                            <td>PC</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}


export default Dashboard;