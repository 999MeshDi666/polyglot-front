import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'


import { fbaseDB } from "../../../utils/firebase-config";
import { ref, onValue, orderByChild, query } from "firebase/database";


const ScoreTable = () =>{
      
    const {roomIDFromUrl} = useParams();
    const [users, setUsers] = useState();
    const usersDataRef =  query(ref(fbaseDB, `polyglot/rooms/${roomIDFromUrl.substring(1)}/users/`), orderByChild('createdAt'))
     //get users data
     useEffect(()=>{
       
        onValue(usersDataRef, (snapshot) => {

            const userList = []
            snapshot.forEach((child) =>{
                userList.push(child.val())
            })
            setUsers(userList)
        });
    },[roomIDFromUrl.substring(1)])
    return(
        <div className="score-table__block">
            <h1 className="content-block__title">Таблица очков</h1>
            <div>
                <span className="score-table__subtitles">
                    <p>Игроки</p>
                    <p>Счет</p>
                </span>
                <div>
                    {users ? users.map((user)=>(
                        <div className = "score-table__user-score" key={user.nickname}>
                            <div className = "score-table__user">
                                <div className='user-crown-pos'>
                                    <img src={user.image} className="user-image"/>
                                    <span style={user.isOwner ? {display: 'inline'} : {display: 'none'}} className='owner-crown icon-crown'/>
                                </div>
                                <h4 className="score-table__user-nickname">{user.nickname}</h4>
                            </div>
                            
                            <p className="score-table__score">{user.score}</p>
                        
                        </div>

                    )): ' '}
                     
                </div>
            </div>
        </div>

    )
}

export default ScoreTable;