import React from "react"



import "./ActionsContainer.scss"
import { useHistory } from "react-router-dom"
import Button from "../../../../components/ui/Button"
const ActionsContainer = ({ isSigned, children }) => {

    const history = useHistory()

    return (
        <div className="ActionsContainer-wrapper">
            {!isSigned
                &&
                <div className="ActionsContainer-title">
                    Ваше объявление сохранится и после авторизации вы сразу же окажетесь здесь
                </div>
            }
            <div className="ActionsContainer-content">
                {/* {React.Children.map(children, child => (
                <div className="ActionsContainer__item">
                    {child}
                </div>
            ))} */}
                {isSigned
                    ?

                    <Button
                        type="submit"
                        className="btn btn-green-outline"
                        label="Опубликовать"
                    />
                    : [

                        <Button
                            key={"Войти"}
                            onClick={() => {
                                history.push("/auth?redirected=add")
                            }}
                            className="btn btn-yellow"
                            label="Войти"
                        />,

                        <Button
                            key={"Зарегистрироваться"}
                            onClick={() => {
                                history.push("/auth?type=register&redirected=add")
                            }}
                            className="btn btn-gray"
                            label="Зарегистрироваться"
                        />
                    ]
                }
            </div>
        </div>
    )
}


export default ActionsContainer