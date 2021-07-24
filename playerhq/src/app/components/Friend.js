import React, {Component} from 'react';
import DisplayUser from './displayUser';
import Avatars from '../assets/images/avatar.json'

import { findUsersByIdEndPoint } from '../services/findUserById';

class Friend extends Component {
    state={
        _friendsData:[],
        displayToggle:"block",
        //onPress:
    }

    fillFriendsUserData=async(userId)=>{
        let {_friendsData} = this.state;
        try {
            const friendData = {};
            const result = await findUsersByIdEndPoint({"_id":userId});
            friendData['username'] = result.data.result.username;
            friendData['avatar'] = result.data.result.avatar;
            friendData['_id'] = result.data.result._id;
            _friendsData.push(friendData);
            this.setState({_friendsData});
        }
        catch(error){
            console.log(error);
        }
    }

    componentWillMount(){
        let {friendRequestDataResult} = this.props;

        friendRequestDataResult.map(element=>{
            this.fillFriendsUserData(element);
        })
    }

    render(){
        console.log(this.state._friendsData);
        return(
                                <div className="profileLeft" style={{display:this.state.displayToggle}}>
                                    <span>Tus amigos +</span>
                                    <ul className="list-group bg-transparent">
                                        {this.state._friendsData.map(element=>(
                                            <DisplayUser
                                                text={element.username}
                                                avatarSrc={Avatars.avatars[element.avatar].src}
                                                onPress={()=>{}}
                                                //onPress={()=>this.props.history.push(`/user/${element._id}`)}
                                            />
                                        ))}
                                    </ul>
                                </div>
        )
    }
}


export default Friend