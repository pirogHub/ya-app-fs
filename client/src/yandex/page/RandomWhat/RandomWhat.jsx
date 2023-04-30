import { useEffect, useState } from "react"
import offerService from "../../services/offer.service"
import Loader from "../../components/ui/Loader"
import { Redirect, useParams } from "react-router-dom"
import userService from "../../services/user.service"
import { useDispatch } from "react-redux"
import { ERROR_TYPES, setError } from "../../store/errors"


const RandomWhat = ({ }) => {
    const { what } = useParams()
    const [randomError, setRandomError] = useState()

    const dispatch = useDispatch()

    const [content, setContent] = useState()

    useEffect(() => {

        async function fetchSmth() {
            let realContent = content
            if (what === "user") {
                const randomUser = await userService.getRandomUser()

                if (!randomUser?._id) setRandomError(true)
                realContent = <Redirect to={{ pathname: `/user/${randomUser?._id}` }} />

            } else {

                const randomOffer = await offerService.getRandomByCategory({})
                if (!randomOffer?.linkToOffer) setRandomError(true)
                realContent = <Redirect to={{ pathname: randomOffer?.linkToOffer, alreadyFetchedOffer: randomOffer }} />
            }
            setContent(realContent)
        }
        fetchSmth()
    }, [])

    if (randomError) {
        dispatch(setError({ message: "Произошла какая-то ошибка в случайной генерации:(", errorType: ERROR_TYPES.WARNING }))
        return <Redirect to={{ pathname: "/404" }} />
    }

    if (!content) {

        return <Loader size={"100px"} />
    }
    return (<>
        {content}
    </>
    )
}

export default RandomWhat