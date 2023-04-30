import { useEffect, useState } from "react";

const ImageLoader = ({ className, onLoaded, link, children, whenBadFetchComponent, ...rest }) => {
    const [url, setUrl] = useState(null);
    useEffect(() => {
        // console.log("ImageLoader link", link);
        if (!link || url) { return }

        fetch(link)
            .then(response => response.blob())
            .then((image) => {
                setUrl(URL.createObjectURL(image));
                if (onLoaded) onLoaded()
            }).catch(err => setUrl(false))

        return () => {
            URL.revokeObjectURL(url)
        }
    });

    // useEffect(() => {
    //     console.log("ImageLoader url", url);
    // }, [url])

    return <>
        {url
            ? <img
                className={className ? ` ${className}` : ""}
                src={url}
                {...rest}
            />
            :
            url === null ? <>{children}</>
                : whenBadFetchComponent ? whenBadFetchComponent : <>{children}</>
        }
    </>
}

export default ImageLoader