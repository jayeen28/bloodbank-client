import { CardUser } from '../CardUser/CardUser';
import './PostBox.css';
import { PostContent } from './PostContent/PostContent';
import { PostMedia } from './PostMedia/PostMedia';

export const PostBox = ({ post }) => {
    return (
        <div className='postBox-wrapper'>
            <div className='post-creator-wrapper'>
                <CardUser user={post.creator} createdAt={post.createdAt} />
            </div>
            <PostContent content={post.content} />
            {post.image && <PostMedia image={post.image} />}
        </div>
    )
}