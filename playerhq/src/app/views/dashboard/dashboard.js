import React, {Component} from "react"
import logo from '../../assets/images/logo_color.png';
import profile from '../../assets/icons/profile.png';

import { PopularUsersEndPoint } from "../../services/popularUsers";
import { findUsersEndPoint } from "../../services/findUsers";
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
        popularUsers:[],
        tableResult:[],
        data:{
            user:"",
            platform:"",
            style:"",
            favoriteGame:""
        }
    }

    getDataInit=async()=>{
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
    }

    componentDidMount(){
        const {user} = this.state
        const {history} = this.props
        //Object.keys({}) noss regresa un [key,key,key]
        console.log(Object.keys(user))
        if(!Object.keys(user).length || user === undefined){
            //history.push('/')
        }

        this.getDataInit();
    }

    handleChange=(e)=>{
        let {data} = this.state
        const {name,value} = e.target
        data[name]=value
        this.setState({ data })
     }

    handleSubmit=(e)=>{
        e.preventDefault()
        const {data} = this.state;
        console.log(data);
        if(data.username!=="" || data.platform!=="" || data.style!=="" || data.favoriteGame!=="") {
            (async()=> {
                try {
                    const results = await findUsersEndPoint(data);
                    this.setState({tableResult:results.data.result});
                }
                catch(error){
                    console.log(error);
                }
            })();
        }
    }

    render() {
        return (
            <div class="bodyDiv">
                    <div class="dashboardContent">
                        <div class="dashboardLeft">
                            <img class="dashboardLogo" src={logo} alt="Logo"></img>
                            <div class="popularUsers">
                                <ul class="list-group bg-transparent">
                                    {this.state.popularUsers.map(element=>(
                                        <DisplayUser
                                            text={element.username}
                                            avatarSrc={Avatars.avatars[element.avatar].src}
                                            onPress={()=>this.props.history.push(`/user/${element._id}`)}
                                        />
                                    ))}
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
                                        onPress={()=> console.log("LOGOUT")}
                                    />
                                </div>
                            </div>
                            <form onSubmit={this.handleSubmit} class="buscador">
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
                                            handleChange={this.handleChange}
                                        />
                                    </span>
                                    <Button
                                        text="Buscar"
                                        //onPress={()=> this.searchUsers()}
                                    />
                                </div>
                                <div class="buscadorBot">
                                    <span class="platformField">
                                        <label>Plataforma:</label>
                                        <select class="form-select" aria-label="Plataforma" name="platform" onChange={this.handleChange}>
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
                                        <select class="form-select" aria-label="Estilo" name="style" onChange={this.handleChange}>
                                            <option selected>Estilo de juego</option>
                                            <option value="Casual">Casual</option>
                                            <option value="Competitivo">Competitivo</option>
                                            <option value="eSport">eSport</option>
                                        </select>
                                    </span>

                                    <span class="gameField">
                                        <label>Juego favorito:</label>
                                        <Textfield
                                            name='favoriteGame'
                                            placeholder='Juego favorito'
                                            width='80'
                                            handleChange={this.handleChange}
                                        />
                                    </span>
                                </div>
                            </form>
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
                                        {this.state.tableResult.map(element=>(
                                            <tr>
                                                <td onClick={()=>this.props.history.push(`/user/${element._id}`)}>{element.username}</td>
                                                <td>{element.favoriteGame}</td>
                                                <td>{element.style}</td>
                                                <td>{element.platform}</td>
                                            </tr>
                                        ))}
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