import { useState } from 'react'
import './CardUser.css'
import { CardUserPop } from './CardUserPop/CardUserPop'

export const CardUser = ({ user }) => {
    return (
        <div className='card-user-profile' style={{ position: 'relative' }}>
            <div
                className='card-user-profile-img'
                style={{ border: `2px solid ${user.donating ? 'red' : 'white'}` }}
            >
                <img src={user.avatar} alt="user image" />
            </div>
            <div className='card-user-profile-name'>
                <h4>{user.name}</h4>
                <span>{user.bloodGroup}</span>
            </div>
            <CardUserPop user={user} />
        </div>
    )
}