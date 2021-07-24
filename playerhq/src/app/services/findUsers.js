import {_api} from "./api"

export const findUsersEndPoint = (data) => _api.post("/users/findUsers",data);