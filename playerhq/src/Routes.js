import React from 'react';
import {Switch,Route} from 'react-router-dom';
//Van mis vistas que see mostraran

import { Home, Auth, EditProfile ,Dashboard } from './app/views';


const Routes = () =>  (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Auth} />
        <Route exact path="/signup" component={Auth} />

        <Route exact path="/editprofile" component={EditProfile} />
         <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/user/:id" component={()=><h1>Bienvenido al perfil de usuario</h1>} />
        <Route exact path="/user/edit" component={()=><h1>Bienvenido al perfil de usuario</h1>} />
        <Route exact path="/party/:id" component={()=><h1>Bienvenido a una party</h1>} />
        <Route exact path="/party/edit" component={()=><h1>Bienvenido a una party</h1>} />

    </Switch>
)

export default Routes