import { CardUser } from '../CardUser/CardUser';
import { PostMeta } from './PostMeta/PostMeta';
import './PostBox.css';
import { PostComment } from './PostComment/PostComment';
import { PostContent } from './PostContent/PostContent';
import { PostMedia } from './PostMedia/PostMedia';

export const PostBox = ({ post }) => {
    return (
        <div className='postBox-wrapper'>
            <div className='post-creator-wrapper'>
                <CardUser user={post.creator} createdAt={post.createdAt} />
            </div>
            <PostMeta address={post.address} bloodGroup={post.bloodGroup} />
            <PostContent content={post.content} />
            {post.image && <PostMedia image={post.image} />}
            <PostComment post={post} />
        </div>
    )
}