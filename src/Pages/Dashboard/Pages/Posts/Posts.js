import { Container, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { LoadMore } from "../../../../Components/LoadMore/LoadMore";
import { PostBox } from "../../../../Components/PostBox/PostBox";
import { ManagePost } from "../../../../Components/ManagePost/ManagePost"
import { usePosts } from "../../../../Hooks/usePosts";

export const Posts = () => {
    const { getPosts } = usePosts();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagData, setPagData] = useState({ page: 0, limit: 3 });
    const [nextPage, setNextPage] = useState(null);

    useEffect(() => {
        getPosts(pagData.page, pagData.limit, true)
            .then(({ data }) => {
                setNextPage(data.nextPage)
                setPosts(posts => ([...posts, ...data.docs]))
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, [pagData])

    return (
        <Container maxWidth="sm">
            <div className="posts-section">
                <div className="posts-head">
                    <ManagePost />
                    <div className="pageHead">
                        <h1>Posts</h1>
                    </div>
                    <div className="posts-boxes-section">
                        {isLoading && <LinearProgress />}
                        {!isLoading && !posts.length && <p>No posts found</p>}
                        {
                            posts.map(post => <PostBox key={post._id} post={post} />)
                        }
                    </div>
                    <div className="posts-bottom-section">
                        {nextPage ? <LoadMore isLoading={isLoading} setIsLoading={setIsLoading} setPagData={setPagData} nextPage={nextPage} /> : !isLoading && <p>No more posts</p>}
                    </div>
                </div>
            </div>
        </Container>
    )
}