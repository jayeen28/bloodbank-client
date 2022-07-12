export const PostMeta = ({ address, bloodGroup }) => {
    return (
        <div className="post-meta-data">
            <span><b>Address: </b> {address}</span>
            <span><b>Blood group: </b> {bloodGroup}</span>
        </div>
    )
}