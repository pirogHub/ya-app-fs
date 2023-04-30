import React from "react";
import ContentCard from "../../../components/Cards/ContentCard";
import LittleCard from "../../../components/Cards/LittleOfferCard";


import { dataForSlider } from "../../../data/forSlider";
import SliderShell from "../../../components/ui/Sliders/SliderShell/SliderShell";
import OfferByCategoryGetter from "../../../hocs/OfferByCategoryGetter/OfferByCategoryGetter";


const HomeContent = ({ children }) => {


    return (
        <>
            <ContentCard>
                <h2>Можно полистать</h2>
                <SliderShell
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, illum! Consequuntur quasi ab iste quas hic nemo sint obcaecati excepturi! "
                >

                    {dataForSlider.map(
                        (i, index) =>

                            <OfferByCategoryGetter
                                key={index}
                                // category = {}
                                Component={LittleCard}
                            />
                        // <LittleCard key={i.name}  {...i} />
                    )}
                </SliderShell>
            </ContentCard>

            <ContentCard
                isWrapper={true}
                title={"Продающий текст"}
                isInRow={true}
            >
                {/* <LittleCard img={"http://localhost:8080/api/img/random/photo/oneImg"} name={"Oaks"} price={"5 mln"} location={"st. Metro"} /> */}
                {/* <LittleCard img={"http://localhost:8080/api/img/random/photo/oneImg"} name={"Oaks"} price={"5 mln"} location={"st. Metro"} /> */}
                {/* <LittleCard img={"http://localhost:8080/api/img/random/photo/oneImg"} name={"Oaks"} price={"5 mln"} location={"st. Metro"} /> */}
                <OfferByCategoryGetter Component={LittleCard} />
                <OfferByCategoryGetter Component={LittleCard} />
                <OfferByCategoryGetter Component={LittleCard} />
            </ContentCard >
            <ContentCard
                isWrapper={true}
                title={"Продающий квартиры заголовок"}
            >

                {/* 
                <LittleCard img={"http://localhost:8080/api/img/random/photo/oneImg"} name={"Oaks"} price={"5 mln"} location={"st. Metro"} />
                <LittleCard img={"http://localhost:8080/api/img/random/photo/oneImg"} name={"Oaks"} price={"5 mln"} location={"st. Metro"} />
                <LittleCard img={"http://localhost:8080/api/img/random/photo/oneImg"} name={"Oaks"} price={"5 mln"} location={"st. Metro"} /> */}
                <OfferByCategoryGetter category={"flat"} isSpaceBetween={true} Component={LittleCard} />
                <OfferByCategoryGetter category={"flat"} isSpaceBetween={true} Component={LittleCard} />
                <OfferByCategoryGetter category={"flat"} isSpaceBetween={true} Component={LittleCard} />
            </ContentCard>
            <ContentCard
                isWrapper={true}
                title={"Продающий дома заголовок"}
                isInRow={true}
                isTitleRight={true}
            >
                {/* <LittleCard img={"http://localhost:8080/api/img/random/photo/oneImg"} name={"Oaks"} price={"5 mln"} location={"st. Metro"} />
                <LittleCard img={"http://localhost:8080/api/img/random/photo/oneImg"} name={"Oaks"} price={"5 mln"} location={"st. Metro"} />
                <LittleCard img={"http://localhost:8080/api/img/random/photo/oneImg"} name={"Oaks"} price={"5 mln"} location={"st. Metro"} /> */}
                <OfferByCategoryGetter category={"house"} Component={LittleCard} />
                <OfferByCategoryGetter category={"house"} Component={LittleCard} />
                <OfferByCategoryGetter category={"house"} Component={LittleCard} />
            </ContentCard >
        </>
    )
}

export default HomeContent