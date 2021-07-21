
import {_api} from "./api"

export const loginEndpoint = (data) => _api.post("/login",data);

export const signupEndpoint = (data) => _api.post("/signup",data);

export const logoutEndpoint = () => _api.post("/logout");

