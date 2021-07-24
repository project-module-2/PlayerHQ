import React from "react"
import './styles.css'
import testbanner  from "../../assets/images/1.jpg"
import testavatar from "../../assets/images/1ccf5087-4b44-4d0a-b8e3-84da3ec3afd4.png"
import logo from '../../assets/images/logo_color.png';
import Button from '../../components/Button';
import {updateUser} from "../../services/user-ws";




// X cambiar el componente a clase
//   crear las funciones de handle change
// X agregar un state para almacenar los datos
//utilizar el web service que creamos
//guardar la respuesta en el local storage
//pasar la info a la otra pagina

// Componente de clase

class EditProfile extends React.Component {

    state = {
        tagname: "",
        date: "",
        platform: "",
        intereses:"",
        country:"",
        discord:"",
        twitch:"",
        skype:"",
        xboxGamertag:"",
        steamUsername:"",
        playstationUsername:"",
        nintendoUsername:""
    }

    // state["tagname"] = "algo"

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    handleSubmit=(e)=>{
        const {history} = this.props
        const {user} = this.state
        e.preventDefault()
       //
        const profilepromise = () => 
        profilepromise()
            .then(res=>{
                localStorage.setItem( "user",JSON.stringify(res.data.result) )
                history.push('/dashboard')
            })
            .catch(error =>{
                console.log("error",error)
            })
    }
    
   

    render(){
        return (
            <div className= "main">
                {}
                <div className = "profileBody">
                    {}
            
                    <div className = "dataContainer">
                    <img src={logo} width='20%'/>

                        <div className= "info">
                           <form>

                           <label for="tagname"> Tagname:
                                <input 
                                type="text" 
                                id="tagname" 
                                value={this.state.tagname}
                                onChange={this.handleChange}/>
                            </label>

                           <label for="birthday"> Fecha de nacimiento:
                                <input 
                                type="date" 
                                id="date" 
                                onChange={this.handleChange}/>
                            </label>

                            <label for="platform"> Plataforma favorita:
                                <select 
                                    id="platform"
                                    onChange={this.handleChange}
                                >
                                    <option value="Xbox">Xbox</option>
                                    <option value="Playstation">Playstation</option>
                                    <option value="Nintendo">Nintendo</option>
                                    <option value="PC">PC</option>
                                    <option value="Mobile">Mobile</option>
                                </select>
                            </label>

                            <label for="intereses"> Estilo de Juego:
                                <select 
                                    id="intereses"
                                    onChange={this.handleChange}
                                >
                                    <option value="Casual">Casual</option>
                                    <option value="Competitivo">Competitivo</option>
                                    <option value="eSport">eSport</option>
                                </select>
                            </label>

                            <label for="country"> País:
                                <select 
                                    id="country"
                                    onChange={this.handleChange}
                                >
                                    <option value="Mexico">México</option>
                                    <option value="Estados Unidos">Estados Unidos</option>
                                    <option value="Canada">Canadá</option>
                                </select>
                            </label>

                            <label for="discord"> Usuario de Discord:
                                <input 
                                type="text" 
                                id="discord" 
                                value={this.state.discord}
                                onChange={this.handleChange}/>
                            </label>

                            <label for="twitch"> Usuario de Twitch:
                                <input 
                                type="text" 
                                id="twitch" 
                                value={this.state.twitch}
                                onChange={this.handleChange}/>
                            </label>

                            <label for="skype"> Usuario de Skype:
                                <input 
                                type="text" 
                                id="skype" 
                                value={this.state.skype}
                                onChange={this.handleChange}/>
                            </label>

                            <label for="xboxGamertag">xboxGamertag:
                                <input 
                                type="text" 
                                id="xboxGamertag" 
                                value={this.state.xboxGamertag}
                                onChange={this.handleChange}/>
                            </label>

                            <label for="steamUsername"> Usuario de Steam:
                                <input 
                                type="text" 
                                id="steamUsername" 
                                value={this.state.steamUsername}
                                onChange={this.handleChange}/>
                            </label>

                            <label for="playstationUsername"> Usuario de Playstation:
                                <input 
                                type="text" 
                                id="playstationUsername" 
                                value={this.state.playstationUsername}
                                onChange={this.handleChange}/>
                            </label>

                            <label for="nintendoUsername"> Usuario de Nintendo:
                                <input 
                                type="text" 
                                id="nintendoUsername" 
                                value={this.state.nintendoUsername}
                                onChange={this.handleChange}/>
                            </label>
                           </form>
                         </div>
                         <Button
                                        text="Guardar"
                                        onPress={console.log("BUSCAR")}
                                    />
            
                </div>
            </div>
            </div>
            )
    }
}

export default EditProfile;