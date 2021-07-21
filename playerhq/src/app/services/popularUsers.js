import { _api } from "./api";

export const PopularUsersEndPoint = () => _api.get('/users/popularUsers') ;