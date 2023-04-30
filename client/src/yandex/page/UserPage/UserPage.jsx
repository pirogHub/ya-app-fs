import React, { useEffect, useState } from "react";
import Content from "../../layouts/MainLayout/components/Content";
import { useHistory, useParams } from "react-router-dom";

import "./UserPage.scss"

import userService from "../../services/user.service";
import { useAuth } from "../../providers/AuthProvider/AuthProvider";
import Loader from "../../components/ui/Loader/Loader";

import Button from "../../components/ui/Button/Button";

import OfferLittleRow from "./components/OfferLittleRow"
import ToTopScroller from "../../components/ToTopScroller/ToTopScroller";
import AvatarComponent from "./components/AvatarComponent";

import Pagination from "../../components/ui/Pagination/Pagination";
import { ERROR_TYPES, setError } from "../../store/errors";
import { useDispatch } from "react-redux";
import offerService from "../../services/offer.service";

const getTitle = (isAuthUserPage) => {
    return `Число ${isAuthUserPage ? "ваших" : ""} активных объявлений: `
}
const getCountOrLoader = (offersLinks) => {
    return offersLinks === null
        ? <Loader />
        : Array.isArray(offersLinks) ? offersLinks.length : ""
}

const UserPage = () => {

    const { isSinged, currentUser, loadingStatus } = useAuth()

    const dispatch = useDispatch()
    const history = useHistory()
    const { id, edit } = useParams()

    const [userOffersLinks, setUserOffersLinks] = useState(null)
    const [isAuthUserPage, setIsAuthUserPage] = useState(false)

    const [user, setUser] = useState("loading")

    async function fetchUser() {
        let user

        if (loadingStatus !== "loading") {
            if (loadingStatus == "signed" && id === currentUser.userId) {
                // user = currentUser
                setIsAuthUserPage(true)
            } else {

            }
        }
        user = await userService.getUserById(id)
        setUser(user)


    }

    useEffect(() => {

        if (user) setUserOffersLinks(prev => user?.offerList ? user?.offerList : false)
    }, [user])

    useEffect(() => {
        console.log("UserPage useEffect first Render");
        fetchUser()


    }, [loadingStatus])



    const removeOffer = async (offerLink) => {
        const [, category, id] = offerLink.split("/")

        const isSuccess = await offerService.removeOffer({ category, id })

        let newUserOffersLinks = userOffersLinks
        if (isSuccess) {

            newUserOffersLinks = userOffersLinks.filter(l => l !== offerLink)
            dispatch(setError({ message: "Объявление удалено успешно!", errorType: ERROR_TYPES.VALID }))
        }
        else {

            dispatch(setError({ message: "Ошибка при удалении. Попробуйте позже.", errorType: ERROR_TYPES.ERROR }))

        }

        setUserOffersLinks(newUserOffersLinks)

    }



    if (!user) return <Content>
        <div className="UserPage__wrapper card">
            <ToTopScroller />
            {`Пользователя c id <"${id}"> нет:(`}
        </div>
    </Content>

    if (user === "loading") return <Content>
        <ToTopScroller />
        <div className="UserPage__wrapper card">
            <Loader />
        </div>
    </Content>


    return <Content>

        <ToTopScroller />
        <div className="UserPage__wrapper card">

            <h2 className="UserPage__name">{user.userName}</h2>
            <AvatarComponent
                isAuthUserPage={isAuthUserPage}
                avatarLink={user?.avatarLink}
            />

            <div className="divider" />

            <div className="UserOffers-wrapper">
                <div className="UserOffers-title">
                    {
                        userOffersLinks === false
                            ? "Объявлений пока нет"
                            : <> {getTitle()}
                                {getCountOrLoader(userOffersLinks)}
                            </>
                    }
                </div>


                <div className="UserOffers-content">

                    <Pagination
                        // fieldForReactKey={ }
                        data={userOffersLinks}
                        className_of_container="UserOffers-list"
                        className_of_divider="UserOffers-divider"
                        is_divider_need={true}
                        Component={OfferLittleRow}
                        funcForTransformEveryItem={(item, currentIdx) => {
                            return {
                                offerLink: item,
                                index: currentIdx + 1
                            }
                        }}
                        isAuthUserPage={isAuthUserPage}
                        removeOffer={removeOffer}
                    />


                    {
                        isAuthUserPage
                        && <div className="UserOffers-actions-wrapper">
                            <div className="UserOffers-actions">
                                <Button
                                    onClick={() => history.push("/add")}
                                    className="btn btn-yellow"
                                    label="Добавить объявление"
                                />
                            </div>
                        </div>
                    }
                </div>

            </div >




        </div>
    </Content>
}

export default UserPage