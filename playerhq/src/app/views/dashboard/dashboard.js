import React from "react"
import logo from '../../assets/images/logo_color.png';
import profile from '../../assets/icons/profile.png';

import Button from '../../components/Button';
import PopularUser from '../../components/PopularUser';
import Textfield from "../../components/Textfield";

import './styles.css'

const Home = () => (
<div class="bodyDiv">
    <div class="dashboardContent">
        <div class="dashboardLeft">
            <img class="dashboardLogo" src={logo} alt="Logo"></img>
            <div class="popularUsers">
                <ul class="list-group bg-transparent">
                    <PopularUser text="User1" />
                    <PopularUser text="User2" />
                    <PopularUser text="User3" />
                    <PopularUser text="User4" />
                    <PopularUser text="User5" />
                    <PopularUser text="User6" />
                    <PopularUser text="User7" />
                    <PopularUser text="User8" />
                    <PopularUser text="User9" />
                    <PopularUser text="User10" />
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
                    Busca personas para jugar!
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
                </div>
                <div class="buscadorBot">
                    <span>
                        <label>Plataforma:</label>
                        <select class="form-select" aria-label="Plataforma">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </span>
                    <span>
                        <label>Estilo:</label>
                        <select class="form-select" aria-label="Estilo">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </span>

                    <span>
                        <label>Juego favorito:</label>
                        <Textfield
                            name='favorito'
                            placeholder='Juego favorito'
                            width='30'
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
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
);

export default Home;