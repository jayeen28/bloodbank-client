import { Button } from "@mui/material"
import { useState } from "react"
import { PostModal } from "./PostModal/PostModal"

export const PostHead = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="post-head">
            <div className="post-views-wrapper">
                list view || grid view
            </div>
            <div className="create-post-btn-wrapper">
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Create post</Button>
            </div>
            <PostModal open={open} setOpen={setOpen} />
        </div>
    )
}