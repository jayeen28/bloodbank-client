import { useNavigate } from 'react-router-dom';
import LOGO from '../../Assets/fast-blood-white.png';

export const Brand = () => {
    const navigate = useNavigate();
    return (
        <div className='desktop-logo-wrapper' style={{ width: '200px', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src={LOGO} alt="Fast Blood logo" style={{ width: '100%' }} />
        </div>
    )
}