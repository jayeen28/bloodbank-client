import { useEffect, useState } from "react";
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
        <div>
            <h1>TimeLine</h1>
        </div>
    )
}