import {_api} from "./api"

export const findUsersByIdEndPoint = (data) => _api.post("/users/findUsersByID",data);