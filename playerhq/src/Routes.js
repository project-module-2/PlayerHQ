import React from 'react';
import {Switch,Route} from 'react-router-dom';
//Van mis vistas que see mostraran
import {} from './app/views'

const Routes = () =>  (
    <Switch>
        <Route exact path="/" component={<h1>Bienvenido al home</h1>} />
        <Route exact path="/login" component={<h1>Bienvenido al login</h1>} />
        <Route exact path="/signup" component={<h1>Bienvenido alsignup</h1>} />
 
    </Switch>
)

export default Routes