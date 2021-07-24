import { _api } from "./api";

export const friendRequestsFromEndPoint = () => _api.post('/friendRequests/friendRequestsFrom');
export const friendRequestsToEndPoint = () => _api.post('/friendRequests/friendRequestsTo');

export const sendFriendRequestEndPoint = (data) => _api.patch('/friendRequests/createFriendRequest',data);
export const rejectFriendRequestEndPoint = (data) => _api.post('/friendRequests/rejectFriendRequest',data);
export const acceptFriendRequestEndPoint = (data) => _api.post('/friendRequests/acceptFriendRequest',data);