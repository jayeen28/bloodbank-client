import './CardUser.css'
import { CardUserPop } from './CardUserPop/CardUserPop'

export const CardUser = ({ user, createdAt }) => {

    const duration = (createdAt) => {
        const difference = new Date() - new Date(createdAt);
        if (difference < 60000) return `${parseInt(difference / 1000)}sec`;
        if (difference > 60000 && difference < 3600000) return `${parseInt(difference / (1000 * 60))}m`;
        if (difference > 3600000 && difference < 86400000) return `${parseInt(difference / 3600000)}h`;
        if (difference > 86400000 && difference < 2629800000) return `${parseInt(difference / 86400000)}d`;
        if (difference > 2629800000) return `${parseInt(difference / 2629800000)}mos`
    }

    return (
        <div className='card-user-profile' style={{ position: 'relative' }}>
            <div className='card-user-profile-img'
                style={{ border: `2px solid ${user.donating ? 'red' : 'white'}` }} >
                <img src={user.avatar} alt="user image" />
            </div>
            <div className='card-user-profile-name'>
                <h4>{user.name}</h4>
                <span>{duration(createdAt)}</span>
            </div>
            <CardUserPop user={user} />
        </div>
    )
}