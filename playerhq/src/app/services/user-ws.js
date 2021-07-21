import {_api} from "./api";
export const updateUser = (data) => {
    return _api.patch(`/users/editMyUser`,data)
} 