import { CardUser } from '../CardUser/CardUser';
import './PostBox.css';

export const PostBox = ({ post }) => {
    return (
        <div className='postBox-wrapper'>
            <div className='post-creator-wrapper'>
                <CardUser user={post.creator} />
            </div>
        </div>
    )
}