import React from 'react';
import {Switch,Route} from 'react-router-dom';
//Van mis vistas que see mostraran
import { Home, Auth } from './app/views';

const Routes = () =>  (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={()=><h1>Bienvenido al login</h1>} />
        <Route exact path="/signup" component={()=><h1>Bienvenido al signup</h1>} />
        <Route exact path="/user/:id" component={()=><h1>Bienvenido al perfil de usuario</h1>} />
        <Route exact path="/party/:id" component={()=><h1>Bienvenido a una party</h1>} />
    </Switch>
)

export default Routes