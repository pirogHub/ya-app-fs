import { Redirect, Route, useParams } from "react-router-dom"
import { useAuth } from "../../../providers/AuthProvider/AuthProvider"
import { useEffect, useRef, useState } from "react"
import Loader from "../../../components/ui/Loader"
import offerService from "../../../services/offer.service"
import DragNDropProvider from "../../../providers/dragNDropProvider/dragNDropProvider"
import { ERROR_TYPES, setError } from "../../../store/errors"
import { useDispatch } from "react-redux"

const ProtectedRoute = ({ children, component: Component, ...rest }) => {
    const { userId, checkIsSigned, userOfferList } = useAuth()
    const isSigned = checkIsSigned()
    const { category, id } = rest?.computedMatch?.params

    const [offerToEdit, setOfferToEdit] = useState(null)
    const refToEdit = useRef()

    const dispatch = useDispatch()

    useEffect(() => {

        refToEdit.current = isSigned
        if (!refToEdit.current) setOfferToEdit(false)
        else if (rest?.location?.offerToEdit) {
            const isMyOffer = rest?.location?.offerToEdit?.userId === userId
            refToEdit.current = refToEdit.current && isMyOffer
            setOfferToEdit(rest?.location?.offerToEdit)
        }
        else {
            async function fetchOffer() {
                const offer = await offerService.getByTypeAndId({ category, id })
                setOfferToEdit(offer)
                refToEdit.current = refToEdit.current && offer && offer?.userId === userId
                // refToEdit.current = false
            }
            fetchOffer()

        }

    }, [])


    console.log("ProtectedRoute", isSigned, userId);

    if (offerToEdit === null) {
        return <Loader />
    }
    return (
        <Route {...rest} render={(props) => {
            if (refToEdit.current) {
                return <DragNDropProvider>
                    {Component ? <Component {...props} offerToEdit={offerToEdit} /> : children}
                </DragNDropProvider>

            } else {
                dispatch(setError({ message: "Вы не авторизованы, поэтому не можете изменять объявления!", errorType: ERROR_TYPES.WARNING }))
                return <Redirect to={{ pathname: `/offer/${category}/${id}`, wasTryEditingOffer: true, alreadyFetchedOffer: offerToEdit }} />
            }
        }
        } />
    )
}

export default ProtectedRoute
