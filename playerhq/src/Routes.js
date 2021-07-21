import React from 'react';
import {Switch,Route} from 'react-router-dom';
//Van mis vistas que see mostraran
import { Home, Auth, EditProfile } from './app/views';

const Routes = () =>  (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Auth} />
        <Route exact path="/signup" component={Auth} />
        <Route exact path="/dashboard" component={()=><h1>Bienvenido a al dashboard</h1>} />
        <Route exact path="/editprofile" component={EditProfile} />
        <Route exact path="/user/edit" component={()=><h1>Bienvenido al perfil de usuario</h1>} />
        <Route exact path="/party/:id" component={()=><h1>Bienvenido a una party</h1>} />
        <Route exact path="/party/edit" component={()=><h1>Bienvenido a una party</h1>} />

    </Switch>
)

export default Routes