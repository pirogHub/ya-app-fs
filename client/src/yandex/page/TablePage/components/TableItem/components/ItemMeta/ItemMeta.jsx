import "./ItemMeta.scss"

const ItemMeta = ({ updatedAt }) => {
    return (
        <div className="meta">
            <div className="publishdate">{new Date(updatedAt).toLocaleString()}</div>
        </div>
    )
}
export default ItemMeta