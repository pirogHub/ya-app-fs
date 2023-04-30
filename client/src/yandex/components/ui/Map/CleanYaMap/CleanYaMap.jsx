import React, { useEffect, useRef, useState } from "react";
import { Placemark, YMaps } from "react-yandex-maps";
import { GeolocationControl, Map, ZoomControl } from "react-yandex-maps";
import GenTextInput from "../../Inputs/GenTextInput";


import "./CleanYaMap.scss";
import FormRow from "../../../FormComponents/FormRow";


const mapOptions = {
    modules: ["geocode", "SuggestView"],
    defaultOptions: { suppressMapOpenBlock: true },
    width: "100%",
    height: "100%",
};

const geolocationOptions = {
    defaultOptions: { maxWidth: 128 },
    defaultData: { content: "Determine" },
};

const initialState = {
    title: "",
    center: [undefined, undefined],
};

const defaultMapState = {
    zoom: 12,
    title: "",
    center: [55.749451, 37.542824],
}


const CleanYaMap = ({ formState, name, onChange, randomState, errorsState, isNotRequired }) => {
    const [state, setState] = useState(formState
        ? name
            ? formState?.[name]
            : { ...formState }
        : { ...initialState });

    useEffect(() => {
        console.log("CleanYaMap errorsState", errorsState);
    }, [errorsState])

    const [mapConstructor, setMapConstructor] = useState(null);
    const refMap = useRef(null);
    const refSearch = useRef(null);

    const isLookingOfferObj = useRef(false)


    const getTitleByCoords = (coordsArr) => {

        mapConstructor.geocode(coordsArr).then((res) => {

            const nearest = res.geoObjects.get(0);
            const foundAddress = nearest.properties.get("text");
            let data = { ...state, title: foundAddress }

            const [centerX, centerY] = nearest.geometry.getCoordinates();
            if (centerX !== data.center[0] && centerY !== data.center[1]) {
                data = { ...data, center: [centerX, centerY] }
            }

            if (refSearch.current.value !== data.title) refSearch.current.value = data.title

            isLookingOfferObj.current = false
            setState(prev => ({ ...data }))
        })
    }


    const refThatRandomStateInited = useRef(false)
    const refRandomPromise = useRef(undefined)

    useEffect(() => {

        if (randomState
            && refThatRandomStateInited.current !== (
                name
                    ? randomState?.[name]
                    : randomState
            )
        ) {
            refThatRandomStateInited.current = name
                ? randomState?.[name]
                : randomState

            console.log("Map RandomState", `<${name}>`, randomState);
            const { coords, title } =
                refThatRandomStateInited.current
                    ? refThatRandomStateInited.current
                    : { coords: { value: defaultMapState.center, promise: () => { } }, title: { value: "", promise: () => { } } }


            let data = { center: coords?.value, title: title?.value }
            refRandomPromise.current = [coords?.promise, title?.promise]

            if (data.title === "random" && data.center.length) {
                isLookingOfferObj.current = true
                if (mapConstructor) getTitleByCoords(data.center)
            }

        }

    })


    useEffect(() => {
        console.log("useEffect data", state);
        onLoad(state)
    }, [state])

    const onLoad = (state) => {
        console.log("onLoad");
        if (randomState && refRandomPromise.current && refThatRandomStateInited.current) {
            refRandomPromise.current.forEach(promise => {
                if (Promise.prototype.isPrototypeOf(promise)) {
                    if (promise?.resolve) {
                        console.log("MAP resolve promise");
                        promise.resolve()
                    }
                }
            })
            refRandomPromise.current = undefined
            return
        }
        console.log("onLoad onChange");
        if (name) { onChange({ [name]: { title: state.title, center: state.center } }) }
        else {
            onChange({ title: state.title, center: state.center })
        }
    }

    // submits



    // reset state & search
    const handlerInputReset = () => {
        console.log("handlerInputReset");
        refMap.current.setZoom(defaultMapState.zoom);
        setState(prev => ({ title: "", center: [undefined, undefined] }))

    };

    const getCoordsByName = (selectedName) => {
        console.log("getCoordsByName");
        if (!selectedName || selectedName === state.title) return

        mapConstructor.geocode(selectedName).then((result) => {
            const newCoords = result.geoObjects.get(0).geometry.getCoordinates();

            setState(prev => ({ title: selectedName, center: newCoords }))
        });
    }

    const handleClickSearch = () => {
        console.log("handleClickSearch");
        const selectedName = refSearch.current.value
        if (selectedName) getCoordsByName(selectedName)
    }

    // search popup
    useEffect(() => {
        console.log("useEffect mapConstructor");
        if (mapConstructor) {
            new mapConstructor.SuggestView(refSearch.current).events.add("select", function (e) {
                const selectedName = e.get("item").value;
                console.log("useEffect mapConstructor getCoordsByName");
                getCoordsByName(selectedName)
            });

            if (isLookingOfferObj.current) {
                console.log("useEffect mapConstructor getTitleByCoords");
                getTitleByCoords(state.center)
            }
        }
    }, [mapConstructor]);

    // change title
    const handleBoundsChange = (e) => {
        console.log("handleBoundsChange");


    };



    const tmpFunc = () => {
        console.log("(state.center[0] && state.center[1]) ? state.center : defaultMapState.center", (state.center[0] && state.center[1]) ? state.center : defaultMapState.center);
        return (state.center[0] && state.center[1]) ? state.center : defaultMapState.center
    }

    return (<>
        {isNotRequired
            && <div className="Map__isNotRequired__title">

                *Необязательно для заполнения*

            </div>
        }
        <YMaps query={{ apikey: "29294198-6cdc-4996-a870-01e89b830f3e", lang: "ru_RU" }}>
            <div className={"ymaps__container" + (errorsState ? " invalid" : "")}>

                {/* {errorsState && <div className="error-wrapper">Поле обязательно для заполнения</div>} */}
                <FormRow errorsState={errorsState}>
                    <div className="ymaps__input-wrapper">

                        <GenTextInput
                            // name="title"
                            formState={state.title ? state.title : ""}
                            onClear={handlerInputReset}
                            refForInput={refSearch}
                            isWidth100={true}
                            size={4}
                            maxLength={100}
                            // onChange_flag={true}
                            loadValToForm={getCoordsByName}
                            notRemoveSpaces={true}
                            placeholder="Укажите адрес"
                        />

                        <button type="button" onClick={handleClickSearch} className={"btn btn-yellow" + (errorsState ? "" : "-outline")}>Найти</button>
                    </div>
                </FormRow>

                <div className="ymaps__map-wrapper">
                    <Map
                        {...mapOptions}
                        state={{ center: tmpFunc(), zoom: defaultMapState.zoom }}
                        onLoad={setMapConstructor}
                        onBoundsChange={handleBoundsChange}
                        instanceRef={refMap}
                    >
                        {state?.title && state?.center[0] && state?.center[1] && <Placemark
                            modules={['geoObject.addon.balloon']}
                            geometry={state.center}
                            properties={{
                                balloonContentHeader: "Этот объект вы выбрали для объявления:",
                                balloonContentBody: state.title,
                                balloonContentFooter: state.center
                            }}
                            options={{ iconColor: '#00f', preset: 'islands#dotIcon', }}
                        />}
                        <GeolocationControl {...geolocationOptions} />
                        <ZoomControl />
                    </Map>
                </div>
            </div>
        </YMaps>
    </>
    )
}

export default CleanYaMap