import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { PostBox } from "../../../../Components/PostBox/PostBox";
import { PostHead } from "../../../../Components/PostHead/PostHead"
import { usePosts } from "../../../../Hooks/usePosts";

export const Posts = () => {
    const { getPosts } = usePosts();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getPosts(true)
            .then(({ data }) => setPosts(data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, [])
    if (isLoading) return 'Loading...';
    return (
        <Container maxWidth="sm">
            <div className="posts-section">
                <div className="posts-head">
                    <PostHead />
                    <div className="pageHead">
                        <h1>Posts</h1>
                    </div>
                    <div className="posts-boxes-section">
                        {
                            posts.map(post => <PostBox key={post._id} post={post} />)
                        }
                    </div>
                    <div className="posts-bottom-section">

                    </div>
                </div>
            </div>
        </Container>
    )
}