import { _api } from "./api";

export const friendRequestsFromEndPoint = () => _api.get('/friendRequests/friendRequestsFrom');
export const friendRequestsToEndPoint = () => _api.get('/friendRequests/friendRequestsTo');

export const sendFriendRequestEndPoint = (data) => _api.patch('/friendRequests/createFriendRequest',data);
export const rejectFriendRequestEndPoint = (data) => _api.patch('/friendRequests/rejectFriendRequest',data);
export const acceptFriendRequestEndPoint = (data) => _api.patch('/friendRequests/acceptFriendRequest',data);