import "./ItemDescription.scss"

const ItemDescription = ({ story }) => {


    return (
        <p className="ItemDescription">
            {/* В продаже 3-комнатная евро квартира в новом доме жилого комплекса "ДМИТРОВСКОЕ НЕБО". Квартира в корпусе "Очередь 1, Этап 2" на 6 этаже, общая площадь трехкомнатной квартиры 80.71 м.кв., кухня 5.59 м.кв. Жилой комплекс "ДМИТРОВСКОЕ НЕБО" */}
            {story}

        </p>
    )
}

export default ItemDescription