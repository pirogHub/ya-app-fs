import "./PageTitle.scss"

const PageTitle = ({ title, isTitleCenter, isTitleRight }) => {


    return (
        <div className={
            "Page__title-wrapper"
            + (isTitleCenter ? " title-center"
                : isTitleRight ? " title-right" : "")
        }>
            <h1 className="Page__title">{title ? title : "No Title"}</h1>
        </div>

    )
}

export default PageTitle