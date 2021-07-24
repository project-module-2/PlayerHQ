import React, {Component} from "react";
import logo from '../../assets/images/logo_color.png';
import profile from '../../assets/icons/profile.png';

import { PopularUsersEndPoint } from "../../services/popularUsers";
import { findUsersEndPoint } from "../../services/findUsers";
import {loginEndpoint} from '../../services/auth-ws'
import {logoutEndpoint} from '../../services/auth-ws'

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
        userAvatar: "",
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
        let {popularUsers, userAvatar} = this.state;
        try{
            const popularUsersArr = await PopularUsersEndPoint();
            popularUsers = popularUsersArr.data.result;
            userAvatar = Avatars.avatars[this.state.user.avatar].src;
            this.setState({popularUsers});
            this.setState({userAvatar});
        }
        catch(error){
            console.log(error);
        }
    }

    componentDidMount(){
        const {user} = this.state
        const {history} = this.props
        console.log(user);
        if(!Object.keys(user).length || user === undefined){
            history.push('/')
        }

        this.getDataInit();
    }

    logout(){
        const {history} = this.props;
        logoutEndpoint();
        history.push('/');
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
                    console.log(this.state.tableResult)
                }
                catch(error){
                    console.log(error);
                }
            })();
        }
    }

    render() {
        return (
            <div className="bodyDiv">
                    <div className="dashboardContent">
                        <div className="dashboardLeft">
                            <img className="dashboardLogo" src={logo} alt="Logo"></img>
                            <div className="popularUsers">
                                <ul className="list-group bg-transparent">
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
                        <div className="dashboardRight">
                            <div className="head">
                                <span>Explora</span>
                                <div>
                                    <DisplayUser
                                        text={this.state.user.username}
                                        avatarSrc={this.state.userAvatar}
                                        onPress={()=>this.props.history.push(`/user/${this.state.user._id}`)}
                                    />
                                    <Button
                                        text="Logout"
                                        onPress={()=> this.logout()}
                                    />
                                </div>
                            </div>
                            <form onSubmit={this.handleSubmit} className="buscador">
                                <span>
                                ¡Busca personas para jugar!
                                </span>
                                <div className="buscadorTop">
                                    <span className="userField">
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
                                <div className="buscadorBot">
                                    <span className="platformField">
                                        <label>Plataforma:</label>
                                        <select className="form-select" aria-label="Plataforma" name="platform" onChange={this.handleChange}>
                                            <option style={{backgroundColor:"black"}} selected>Donde juega</option>
                                            <option style={{backgroundColor:"black"}} value="Xbox">Xbox</option>
                                            <option style={{backgroundColor:"black"}} value="Playstation">Playstation</option>
                                            <option style={{backgroundColor:"black"}} value="Nintendo">Nintendo</option>
                                            <option style={{backgroundColor:"black"}} value="PC">PC</option>
                                            <option style={{backgroundColor:"black"}} value="Mobiles">Mobiles</option>
                                        </select>
                                    </span>
                                    <span className="styleField">
                                        <label>Estilo:</label>
                                        <select className="form-select" aria-label="Estilo" name="style" onChange={this.handleChange}>
                                            <option style={{backgroundColor:"black"}} selected>Estilo de juego</option>
                                            <option style={{backgroundColor:"black"}} value="Casual">Casual</option>
                                            <option style={{backgroundColor:"black"}} value="Competitivo">Competitivo</option>
                                            <option style={{backgroundColor:"black"}} value="eSport">eSport</option>
                                        </select>
                                    </span>

                                    <span className="gameField">
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
                            <div className="tablaUsuarios">
                                <table className="table table-striped table-dark">
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
                                                <td>{element.intereses}</td>
                                                <td>{element.platforms}</td>
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