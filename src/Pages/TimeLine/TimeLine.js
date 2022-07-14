import { Button, Container, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { LoadMore } from "../../Components/LoadMore/LoadMore";
import { PostBox } from "../../Components/PostBox/PostBox";
import { ManagePost } from "../../Components/ManagePost/ManagePost";
import useAuth from "../../Context/ContextHooks/useAuth";
import { usePosts } from "../../Hooks/usePosts";
import './TimeLine.css'

export const TimeLine = () => {
    const [filters, setFilters] = useState([
        {
            name: 'All'
        },
        {
            name: 'Pending'
        },
        {
            name: 'Fulfilled'
        }
    ])
    const { getPosts } = usePosts();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagData, setPagData] = useState({ page: 0, limit: 3 });
    const [nextPage, setNextPage] = useState(null);
    const [focus, setFocus] = useState(0);
    const userData = useAuth();
    useEffect(() => setIsLoading(true), [focus])
    useEffect(() => {
        getPosts(pagData.page, pagData.limit, false, filters[focus].name.toLowerCase())
            .then(({ data }) => {
                setNextPage(data.nextPage)
                data.page > 1 ? setPosts(posts => ([...posts, ...data.docs])) : setPosts(data.docs)
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, [pagData, focus])

    useEffect(() => {
        if (!userData.isLoading) userData.user.email && setFilters(data => ([...data, { name: 'Nearme' }]))
    }, [userData.isLoading])

    return (
        <Container maxWidth="sm">
            <section className="time-line-section">
                {userData.user.email && <ManagePost />}
                <div className="pageHead">
                    <h1>Timeline</h1>
                </div>
                <div className="timeline-filter">
                    {
                        filters.map((data, i) => <Button
                            key={data.name}
                            disabled={isLoading}
                            onFocus={() => {
                                setFocus(i)
                                setPagData({ page: 0, limit: 3 })
                            }}
                            variant="contained"
                            size="small"
                            sx={{ ...focus === i && { backgroundColor: '#101010', color: 'white' } }}
                        >
                            {data.name}
                        </Button>
                        )
                    }
                </div>
                <div className="posts-boxes-section">
                    {isLoading && <LinearProgress />}
                    {!isLoading && !posts.length && <p>No posts found</p>}
                    {
                        posts.map(post => <PostBox key={post._id} post={post} />)
                    }
                </div>
                <div className="posts-bottom-section">
                    {nextPage ? <LoadMore isLoading={isLoading} setIsLoading={setIsLoading} setPagData={setPagData} nextPage={nextPage} /> : (!isLoading && posts.length !== 0) && <p>No more posts</p>}
                </div>
            </section>
        </Container >
    )
}