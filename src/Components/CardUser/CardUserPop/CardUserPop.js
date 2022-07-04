export const CardUserPop = ({ user }) => {
    return (
        <div className="card-user-pop-wrapper">
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
        </div>
    )
}