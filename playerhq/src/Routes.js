import React from 'react';
import {Switch,Route} from 'react-router-dom';
//Van mis vistas que see mostraran
import User from './app/views/user/user'
import { Home, Auth, EditProfile ,Dashboard } from './app/views';


const Routes = () =>  (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Auth} />
        <Route exact path="/signup" component={Auth} />
        <Route exact path="/editprofile" component={EditProfile} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/user/:id" component={User} />
    </Switch>
)

export default Routes