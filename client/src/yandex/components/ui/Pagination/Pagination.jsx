import React, { useCallback, useEffect, useRef, useState } from "react";


import "./Pagination.scss"
import Button from "../Button/Button";
import Loader from "../Loader";



const generatePagesButtons = ({
    currentPageIdx,
    pagesCount,
    onClick,
}) => {
    const componentsArr = []
    if (pagesCount < 2) {
        return componentsArr
    }
    componentsArr.push(
        <Button
            key={"В начало"}
            className={
                "btn btn-white btn-little-rectangle"
                + (currentPageIdx > 0 ? "" : " disabled")
            }
            label={"В начало"}
            onClick={currentPageIdx > 0 ? () => onClick("start") : undefined}
        />
    )
    componentsArr.push(
        <Button
            key={"Назад"}
            className={
                "btn btn-white btn-little-rectangle"
                + (currentPageIdx > 0 ? "" : " disabled")
            }
            label={"Назад"}
            onClick={currentPageIdx > 0 ? () => onClick("prev") : undefined}
        />
    )

    let idxForRender = currentPageIdx

    for (
        let i = idxForRender - 1 > 0 ? idxForRender - 1 : 0;
        i < idxForRender + 2 && i < pagesCount;
        i++
    ) {
        componentsArr.push(
            <Button
                key={i}
                className={
                    "btn btn-white btn-little-square"
                    + (currentPageIdx === i ? " active" : "")
                }
                label={i + 1}
                onClick={() => onClick(i)}
            />
        )
    }

    componentsArr.push(
        <Button
            key={"Вперед"}
            className={
                "btn btn-white btn-little-rectangle"
                + (currentPageIdx + 1 < pagesCount ? "" : " disabled")
            }
            label={"Вперед"}
            onClick={currentPageIdx + 1 < pagesCount ? () => onClick("next") : undefined}
        />
    )
    componentsArr.push(
        <Button
            key={"В конец"}
            className={
                "btn btn-white btn-little-rectangle"
                + (currentPageIdx + 1 < pagesCount ? "" : " disabled")
            }
            label={"В конец"}
            onClick={currentPageIdx + 1 < pagesCount ? () => onClick("end") : undefined}
        />
    )

    return componentsArr
}

const data = [
    "Валерия",
    "Ксения",
    "Мария",
    "Айлин",
    "Варвара",
    "Милана",
    "Ника",
    "Сафия",
    "Дарья",
    "Светлана",
    "Анастасия",
    "Вероника",
    "Майя",
    "Алина",
    "Ярослава",
    "София",
    "Амалия",
    "Елена",
    "Мирослава",
    "Марьям",
    "Арина",
    "Наталья",
    "Вера",
    "Елизавета",
    "Аделина",
    "Эмилия",
    "Диана",
    "Анна",
    "Алиса",
    "Софья",
    "Александра",
    "Лидия",
    "Ариана",
    "Маргарита",
    "Кристина",
    "Агния",
    "Виктория",
    "Ясмина",
    "Екатерина",
    "Полина",
    "Ева",
    "Амина",
    "Злата",
]


const Pagination = ({
    // data,
    data,
    Component,
    className_of_container,
    is_divider_need,
    className_of_divider,
    fieldForReactKey,
    funcForTransformEveryItem,
    // isAuthUserPage
    ...rest
}) => {

    const currentFuncForTransformEveryItem = useCallback(
        funcForTransformEveryItem
            ? (item, currentIdx) => funcForTransformEveryItem(item, currentIdx)
            : (item, currentIdx) => item
        , [funcForTransformEveryItem])

    const pageSize = 10
    const currentFrom = useRef(0)
    const currentTo = useRef(pageSize)
    const currentPageIdx = useRef(0)

    const pagesCount = useRef(0)

    const buttonsWrapper_ref = useRef()
    const is_changeByButtons = useRef(false)

    const [slicedData, setSlicedData] = useState(Array.isArray(data) ? data.slice(currentFrom.current, currentTo) : data.current)

    const toSlice = (newIdx) => {
        let newFrom = currentFrom.current
        let newTo = currentTo.current
        let newSlicedData = slicedData



        if (newIdx === "end") {
            currentPageIdx.current = pagesCount.current - 1
            newTo = data.length
            newFrom = (Math.floor(data.length / pageSize)) * pageSize
        } else if (newIdx === "start") {
            currentPageIdx.current = 0
            newFrom = 0
            newTo = pageSize
        } else if (newIdx === "next") {
            currentPageIdx.current++
            newFrom = newFrom + pageSize
            newTo = newTo + pageSize
        } else if (newIdx === "prev") {
            currentPageIdx.current--
            newFrom = newFrom - pageSize
            newTo = newTo - pageSize
        } else if (newIdx > currentPageIdx.current) {
            currentPageIdx.current = newIdx
            newFrom = newIdx * pageSize
            newTo = newIdx * pageSize + pageSize


        } else if (newIdx < currentPageIdx.current) {
            currentPageIdx.current = newIdx
            newFrom = newIdx * pageSize
            newTo = newIdx * pageSize + pageSize

        }



        newSlicedData = data.slice(newFrom, newTo)
        return [newFrom, newTo, newSlicedData]
    }

    useEffect(() => {
        is_changeByButtons.current = false
        currentFrom.current = 0
        currentTo.current = pageSize
        const tmp = data
        pagesCount.current = Array.isArray(data) ? Math.ceil(data.length / pageSize) : 0
        let newslicedData = Array.isArray(data) ? data.slice(currentFrom.current, currentTo.current) : data
        setSlicedData(newslicedData)

    }, [data])

    const changePage = (newIdx) => {
        const [newFrom, newTo, newSlicedData] = toSlice(newIdx)
        currentFrom.current = newFrom
        currentTo.current = newTo
        is_changeByButtons.current = true
        setSlicedData(newSlicedData)

    }

    useEffect(() => {
        if (is_changeByButtons.current) {
            buttonsWrapper_ref.current.scrollIntoView({ block: "center" })

        }
    }, [slicedData])


    return (
        <>
            <ul className={
                className_of_container ? className_of_container : "UserOffers-list"
            }>
                {
                    slicedData === null
                        ? <Loader size="50px" />
                        : slicedData && slicedData?.length !== 0
                        && slicedData.map((oneItem, index) => {

                            const currentIdx = currentPageIdx.current * pageSize + index
                            const transformedItem = currentFuncForTransformEveryItem(oneItem, currentIdx)
                            return <React.Fragment key={fieldForReactKey ? oneItem[fieldForReactKey] : oneItem}>
                                {/* <div
                                    className={
                                        "Debug_TableItem"
                                    }
                                >
                                    {`${link} ${currentPageIdx.current * pageSize + index}`}
                                </div> */}

                                <Component
                                    {...transformedItem}
                                    {...rest}
                                />

                                {is_divider_need && index + 1 < slicedData.length && <div className={className_of_divider ? className_of_divider : "UserOffers-divider"}></div>}
                            </React.Fragment>
                        })
                }
                <div
                    ref={buttonsWrapper_ref}
                    className="PagesButtons__wrapper">
                    <div

                        className="PagesButtons__container"
                    >
                        {generatePagesButtons({ currentPageIdx: currentPageIdx.current, pagesCount: pagesCount.current, onClick: changePage })}

                    </div>
                    <div className="pagesCount__label">
                        {`всего страниц: ${pagesCount.current}`}
                    </div>
                </div>
            </ul>

        </>
    )
}


export default Pagination