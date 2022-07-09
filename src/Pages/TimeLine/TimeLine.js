import { Button, Container, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { LoadMore } from "../../Components/LoadMore/LoadMore";
import { PostBox } from "../../Components/PostBox/PostBox";
import { PostHead } from "../../Components/PostHead/PostHead";
import { usePosts } from "../../Hooks/usePosts";
import './TimeLine.css'

export const TimeLine = () => {
    const { getPosts } = usePosts();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagData, setPagData] = useState({ page: 0, limit: 3 });
    const [nextPage, setNextPage] = useState(null);

    useEffect(() => {
        getPosts(pagData.page, pagData.limit)
            .then(({ data }) => {
                setNextPage(data.nextPage)
                setPosts(posts => ([...posts, ...data.docs]))
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, [pagData])

    return (
        <Container maxWidth="sm">
            <section className="time-line-section">
                <PostHead />
                <div className="pageHead">
                    <h1>Timeline</h1>
                </div>
                <div className="timeline-filter">
                    <Button variant="contained" size="small" sx={{ '&:focus': { backgroundColor: '#101010', color: 'white' } }}>All</Button>
                    <Button variant="contained" size="small" sx={{ '&:focus': { backgroundColor: '#101010', color: 'white' } }}>Pending</Button>
                    <Button variant="contained" size="small" sx={{ '&:focus': { backgroundColor: '#101010', color: 'white' } }}>Fulfilled</Button>
                    <Button variant="contained" size="small" sx={{ '&:focus': { backgroundColor: '#101010', color: 'white' } }}>Nearme</Button>
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
            </section>
        </Container>
    )
}