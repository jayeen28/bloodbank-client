import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { PostBox } from "../../Components/PostBox/PostBox";
import { PostHead } from "../../Components/PostHead/PostHead";
import { usePosts } from "../../Hooks/usePosts";

export const TimeLine = () => {
    const { getPosts } = usePosts();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getPosts()
            .then(({ data }) => setPosts(data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, [])
    if (isLoading) return 'Loading...';

    return (
        <Container>
            <section className="time-line-section">
                <PostHead />
                <div className="pageHead">
                    <h1>Timeline</h1>
                </div>
                <div className="posts-boxes-section">
                    {
                        posts.map(post => <PostBox key={post._id} post={post} />)
                    }
                </div>
                <div className="posts-bottom-section">

                </div>
            </section>
        </Container>
    )
}