import { CardUser } from '../CardUser/CardUser';
import { PostMeta } from './PostMeta/PostMeta';
import './PostBox.css';
import { PostComment } from './PostComment/PostComment';
import { PostContent } from './PostContent/PostContent';
import { PostMedia } from './PostMedia/PostMedia';
import { PostActions } from './PostActions/PostActions';
import useAuth from '../../Context/ContextHooks/useAuth';

export const PostBox = ({ post }) => {
    const { user } = useAuth();
    return (
        <div className='postBox-wrapper'>
            <div className='postHeadWrapper'>
                <div className='post-creator-wrapper'>
                    <CardUser user={post.creator} createdAt={post.createdAt} />
                </div>
                {
                    user._id === post.creator._id && <PostActions post={post} />
                }
            </div>
            <PostMeta address={post.address} bloodGroup={post.bloodGroup} />
            <PostContent content={post.content} />
            {post.image && <PostMedia image={post.image} />}
            <PostComment post={post} />
        </div>
    )
}