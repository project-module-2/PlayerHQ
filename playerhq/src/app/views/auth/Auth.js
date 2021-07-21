import React, {Component} from 'react';
import './styles.css'
import logo from '../../assets/images/logo_color.png'
import sider from "../../assets/images/login_side.png"
import {Link} from 'react-router-dom';
import {loginEndpoint,signupEndpoint} from '../../services/auth-ws'
import {TextInput, Button} from "../../components/Index"

export default class Auth  extends Component{
    state={
        user:{
            //email:''
            //password:''
        }
    }
    //escucha a los inputs
    handleChange=(e)=>{
        let  {user} = this.state
         const {name,value} = e.target
         //para editar el state this.setState({})
         //a)
         // this.setState({  user:{ ...user,[name]:value }      })
         //b)
         user[name]=value
         this.setState({ user })
     }
     handleSubmit=(e)=>{
         const {match,history} = this.props
         const {user} = this.state
         e.preventDefault()
                         //
         const perroPromise = () => match.path === "/signup" ? signupEndpoint(user) : loginEndpoint(user);
         perroPromise()
             .then(res=>{
               
                 localStorage.setItem( "user",JSON.stringify(res.data.result) ) 
                 history.push('/main')
             })
             .catch(error =>{
                 console.log("error",error)
             })
         
         
     }
     render(){
         //desctruramos los para tenerlo mass limpio
         //state
         const {user} = this.state
         //this
         const {handleChange,handleSubmit} = this
         //props
         const {match} = this.props
         return(
             <section className="auth-container">
                 <div className="card">
                     <form onSubmit={handleSubmit}>
                         <img src={logo} width='20%'/>
 
 
                         {match.path === "/signup" &&
                                 <TextInput
                                 name='name'
                                 textLabel= 'Nombre'
                                 placeholder='John Snow'
                                 handleChange={handleChange}
                             />
                         
                         }
                         <TextInput
                             name='email'
                             textLabel= 'Correo electronico'
                             placeholder='j.snow@arena.com'
                             handleChange={handleChange}
                         />
                         
                         <TextInput
                             name='password'
                             textLabel= 'Contraseña'
                             type='password'
                             placeholder='······'
                             handleChange={handleChange}
                         />
                          {match.path === "/signup" &&
                                 <TextInput
                                 name='confirmPassword'
                                 textLabel= 'Confirma  tu contraseña'
                                 placeholder='······'
                                 handleChange={handleChange}
                             />
                         
                         }

                         <Button
                             text='Entrar'
                         />
                         
                     </form>
                     <span> {`${
                         match.path !== '/signup' ? "Aun no" : 'Ya' 
                         
                     } tienes cuenta? |`} 
                         <Link to={match.path !== "/signup" ? "/signup" :"/login" }>Dale aqui</Link> 
                     </span>
                     
                 </div>
                 <img src={sider} width='36%'/>

             </section>
             
         )
     }

}
