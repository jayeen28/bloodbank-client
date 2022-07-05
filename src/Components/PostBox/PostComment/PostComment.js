import CommentRoundedIcon from '@mui/icons-material/CommentRounded';

export const PostComment = ({ post }) => {
    console.log(post.comments)
    return (
        <div className="post-comments-wrapper">
            <span><CommentRoundedIcon fontSize='small' /> Comment</span>
        </div>
    )
}