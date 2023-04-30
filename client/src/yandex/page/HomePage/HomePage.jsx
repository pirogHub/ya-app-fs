import React, { useState } from "react";
// import HomeHeader from "./components/HomeHeader";

import Content from "../../layouts/MainLayout/components/Content";
import HomeContent from "./components/HomeContent";
import Header from "../../layouts/MainLayout/components/Header/Header";
// import SearchHeader from "../../components/searchComponents/searchHeader";
// import SearchMain from "../../components/searchComponents/searchMain";
import Filters from "./components/Filters";
// import SearchFooter from "../../components/searchComponents/searchFooter";
import ActionsAndStatus from "../TablePage/components/ActionsAndStatus/ActionsAndStatus";
// import { useFilters } from "../../hooks/useFilters/useFilters"
import dataStructService from "../../services/dataStruct.service";
// import { useFormHandlers } from "../../hooks/useFormHandlers/useFormHandlers";
import { useFilters } from "../../hooks/useFilters/useFilters";
import { useHistory } from "react-router-dom";


const HomePage = () => {
    // const [syntheticState, setSyntheticState] = useState({})
    const history = useHistory()

    // const [sekeerNewCategory, setSekeerNewCategory] = useState(refFiltersState.current?.category?.[0])

    // const sekeerNewCategory_ref = useRef(refFiltersState.current?.category?.[0])

    // const beforeStateChangedMiddlewareBlock = (newState, isSaveFirstInitingState, isFirstInit, stateFromUrl) => {

    //     let isNotBlock = true
    //     sekeerNewCategory_ref.current = newState?.category?.[0]
    //     setSekeerNewCategory(prev => newState?.category?.[0])





    //     return [newState, isNotBlock]
    // }






    const {
        refFiltersState,
        loadValToFiltersState,
        syntheticState,
        // getAndSetSyntheticState
    } = useFilters({
        // syntheticRandomStateGetter: (type, category) => dataStructService.getRandom({ type, structName: category, toWhoom: "seeker" })
        syntheticRandomStateGetter: undefined,
        isLoadFromUrl: false,
        isParsingQueryBeforeFirstFetch: true,
        simpleDefaultStateIfNotStateAtQuery: { category: ["flat"], type: ["sell"] },
        // beforeStateChangedMiddlewareBlock: beforeStateChangedMiddlewareBlock

    }
    )

    const link = "https://realty.ya.ru/_crpd/v289qQ453/a2d9ef-S/JFiCVGtD6KSYLHspR3chKdrprWUnQIsqyIoXn__u6W8hVpT4R2JYCwHLTS2uh0FbXn3L2E_t-8RWadgAcecbdhU5BlUbBiixK8_PSNXi0oktnavDQze_bynYNv28Cr2YNhPTbfCjuipRG13PqAcB259eCxrdv0tmZXvLwHBG2Ub2C8MkCaCpcQtMSHlXwlJKrPx4giIG3I-723ZffPj8-BTT4_-Aw_naMdkODlsGYTpvDqrpPPyaRufImKOzR3gEZdqy1nnh2UFazAgpRLNS-76smILSdd0NG8gEvW_qTwjE0sFu4qKIetK4XE14l0B7XS7qq85NKCf2KqvRkBfJ9dV6EMebQivx6C1L-fdhYMr-nntA0HecLLnI5q2cuG57F5MQrwIy2FpwuM3eCOcDOh4M-IgvT0l2BFrIgsNXySa1eQOWKVOZAQmciTtH8IMaTz7J45EGHK77iid-neteaveA4U8ikDgZQQjPLOilABgMrkvrTy77p6QbCxEAJWgV1GrTJFiS2DN5DAhLZ7BSqZ1_6KDDN-__OKi1rj84TGklQxF-QWL7qeFqTE3LF5I6rh5pGH5uWjf3u2qDsNW6xqb6MkYokZmwi38Z6MfRMUvsfjrRQXb9Hgn4912fOq8qx-MxH6EACMsjGb-f-HVTWTzM6-v_72vVNhoIsYDlGnY1SQB320IYoDq_mAjHYSGYHKzLYBL2r327u2b_XhktewRj8z-Dc7o6kzq9_esXcou-rmj6fW0Zh6RLC7DiZBkkxJmB5BoQmUM63QrLBDNyu6zfy2NRxS8smctGrg1YbLoGkQHcQBBZ6gOZ_Z0JZMD7zQ6Kam39eJflayiD46TpJlQ6UbYpYJnTGlxp2KfiwrjPH-pRcdbMf1n6B46cuO1KBAICnZAweYlAa7-8ehcjOg79KXsc3ip19LkKAOD1KzT3CMBFi8OJwrsOWsjUk_LqDIxq0PNFzOx6itRvP-kcmDeRAW_SEih4YYk97ztlwLqNL2rq_IzJpVZpurMztjm19KszhjshiQCobJmrxCHQyh1d2oMix20Ne9rW3Z8KfWpmoKPOItAbCMHLH02bd3CrnL97-A8NipZ2qLvSoGXZlhRqQkZ5w-jCOl7oGBXTYJgeLlligMTs7qi6BUwPObxql5HhDGEi24gi-Y_sCrcxKk_uWJk8_Mp2NArL8OJFq3SmOkO2qXCqESk8GGlGUsKZDgwow7AUnwxYqMceP0q_ePQgMV0QMPh5Ysi_LVg0Qqs_LUrrfs96VvV5e9GA5DvENAhTJBgAuvMqrJk49CMQGt6f2rIAtQxc-bskfh4I3Ps2YvFPwWIoaWMrjPx75sDJPZ14uX1cSQXXegpRsCTp58dYAGQbocqh-K4ZGjWhsQp9nknzULWsjSgYhn4cSR041iFzXuDymwgzm6ztqgeiiryealh-vru3ZDsYU5AluuRGG6Dl6-GJshgsW7uG4xEZLX37QwNUDM16utUNrjg-6vWy0sxiMIoIczkdbaoGkjocLQvZXr7It8Y5aiCw1AuEVAjiRqnQevCLHpnp9FEhaN7NyAIgpK_9uZjGzD5YnBhVsIDfA2L5GUF7Xe-L5OJIT3zoqh2O2FVVW8jyw6WaFXSZEZRqEFvhSE5b-MeC4lv9LlgBQjQuvJpZNJ4--P1olFPRz4MAqelTazzf-XdD-dwtmlg-jCmFNWt4YMOFa8REGIG1izCpoysvKyk3gyK7jl_6EHDUn20qyoVv3CrPG3WhgxxAkApLcGr9b4tG0mp_zLlqDW8YZQX4ukMAlwuGRJpTJQtSSeL6DygYp9HxCGzvOgJTVS5_C4qlXqxZjslk0bGNouC6uWC7ry2IJPIb3t8Im08_mfWEy-pAwoUrpCdpkzQacEkiSi0IKRej0Ip-T_uDk1T9zljJBT5-K4xaljFjrlPw2snD2v__GIUA6C_8-3jdHFtmNmroQsK3eSSV-QIUqjKaovlMu9kGY3EJDFz6AkFnrtz4u1XMbCu9G1dCk8wigXh7I5mPXwll8UsdfmrI_O8p9_Qba7BxVZm1ptgi1xvCCjIZDwpZJ_CQuF99qpCj58yPqihlL5wovIqlgfMt4-DaetLZ_vwKRWBrno24ys5NS0XUKemCMYTKJrTJMEaaAdii6nzJCxZTcWneTNuDcPUc7Wi5Fnx8qw1ql4KR3QHSKdpjm30sWWWie99tqrkN36tFtpqbMADlqkQ0qcKWODAbMQkuCHmnwmKKfj_poiFXDO4ai0XerFl-WpQCMNzTcbmYA5uv73sHIqo_nqrq79xKJNd7WkKydlnENCkyNMhgi1NaTzvrNKEiOr4OanCRRO9cmmiHff0LLjh3ouDfIYAYOJPZjFxadZFYrr1rep1u-DZWKrvQcHQrpEbac6UJ0trBGN17e2YTopisTsuggoTcD5nrBv_9-44a9EEyvaPCG_hyqv4_uzbAGr6fWVhtfVkmJbmI4CK22EVWKlHmWBOI0OkeaCkkUVJ6fx-ZoNDH_o-oKLacfii-yWQTEx3TEqoaoemvbtr0o9hNbujYHE-r16ZZmtDh9erF1iiw1LsiC-Ba3Loa1kJRWS2NyWFh538-mahEz835HIm2YoFt0hALmtGaXiwJFzIr3bxpS_68uxYVmqhhsffaZ6ULs8Z7oOlzSE-4Ofdi8Jms3mqRUPUMfRj6Zz5OKmyYFuPTzeCAWciTCa08OjWhGEy9qvl8nNnV9birkQI12_fleRJkGSGpozmva4sk0sAaXJ570SLnnN146tavX8ltKxez0N0yEKhaYmn_LGo3Unvc3SpYf4159uZoiZMRpAmmxmsxhsixmeEanxmrF6KRam196kJh1I58uev3Xp9bXHm2UCHv08HqqCDabOxqFcA7Xbx5u9zOexZUCOnAUlWpdacrMjWbw5qw-u9beeZT4Gv87cpgcJTe7QuYh11-6n-LJBLB38DD6itAW20eCXRjSh6sCkn_rGslF5g58"
    // const loadValToForm = () => { }
    // console.log("HomePage link", link);
    return (
        <>
            <Header
                bannerSizeWhenImgLoading={382}
                bannerLink={link}
                // bannerLink={"https://realty.ya.ru/_crpd/v289qQ453/a2d9ef-S/JFiCVGtD6KSYLHspR3chKdrprWUnQIsqyIoXn__u6W8hVpT4R2JYCwHLTS2uh0FbXn3L2E_t-8RWadgAcecbdhU5BlUbBiixK8_PSNXi0oktnavDQze_bynYNv28Cr2YNhPTbfCjuipRG13PqAcB259eCxrdv0tmZXvLwHBG2Ub2C8MkCaCpcQtMSHlXwlJKrPx4giIG3I-723ZffPj8-BTT4_-Aw_naMdkODlsGYTpvDqrpPPyaRufImKOzR3gEZdqy1nnh2UFazAgpRLNS-76smILSdd0NG8gEvW_qTwjE0sFu4qKIetK4XE14l0B7XS7qq85NKCf2KqvRkBfJ9dV6EMebQivx6C1L-fdhYMr-nntA0HecLLnI5q2cuG57F5MQrwIy2FpwuM3eCOcDOh4M-IgvT0l2BFrIgsNXySa1eQOWKVOZAQmciTtH8IMaTz7J45EGHK77iid-neteaveA4U8ikDgZQQjPLOilABgMrkvrTy77p6QbCxEAJWgV1GrTJFiS2DN5DAhLZ7BSqZ1_6KDDN-__OKi1rj84TGklQxF-QWL7qeFqTE3LF5I6rh5pGH5uWjf3u2qDsNW6xqb6MkYokZmwi38Z6MfRMUvsfjrRQXb9Hgn4912fOq8qx-MxH6EACMsjGb-f-HVTWTzM6-v_72vVNhoIsYDlGnY1SQB320IYoDq_mAjHYSGYHKzLYBL2r327u2b_XhktewRj8z-Dc7o6kzq9_esXcou-rmj6fW0Zh6RLC7DiZBkkxJmB5BoQmUM63QrLBDNyu6zfy2NRxS8smctGrg1YbLoGkQHcQBBZ6gOZ_Z0JZMD7zQ6Kam39eJflayiD46TpJlQ6UbYpYJnTGlxp2KfiwrjPH-pRcdbMf1n6B46cuO1KBAICnZAweYlAa7-8ehcjOg79KXsc3ip19LkKAOD1KzT3CMBFi8OJwrsOWsjUk_LqDIxq0PNFzOx6itRvP-kcmDeRAW_SEih4YYk97ztlwLqNL2rq_IzJpVZpurMztjm19KszhjshiQCobJmrxCHQyh1d2oMix20Ne9rW3Z8KfWpmoKPOItAbCMHLH02bd3CrnL97-A8NipZ2qLvSoGXZlhRqQkZ5w-jCOl7oGBXTYJgeLlligMTs7qi6BUwPObxql5HhDGEi24gi-Y_sCrcxKk_uWJk8_Mp2NArL8OJFq3SmOkO2qXCqESk8GGlGUsKZDgwow7AUnwxYqMceP0q_ePQgMV0QMPh5Ysi_LVg0Qqs_LUrrfs96VvV5e9GA5DvENAhTJBgAuvMqrJk49CMQGt6f2rIAtQxc-bskfh4I3Ps2YvFPwWIoaWMrjPx75sDJPZ14uX1cSQXXegpRsCTp58dYAGQbocqh-K4ZGjWhsQp9nknzULWsjSgYhn4cSR041iFzXuDymwgzm6ztqgeiiryealh-vru3ZDsYU5AluuRGG6Dl6-GJshgsW7uG4xEZLX37QwNUDM16utUNrjg-6vWy0sxiMIoIczkdbaoGkjocLQvZXr7It8Y5aiCw1AuEVAjiRqnQevCLHpnp9FEhaN7NyAIgpK_9uZjGzD5YnBhVsIDfA2L5GUF7Xe-L5OJIT3zoqh2O2FVVW8jyw6WaFXSZEZRqEFvhSE5b-MeC4lv9LlgBQjQuvJpZNJ4--P1olFPRz4MAqelTazzf-XdD-dwtmlg-jCmFNWt4YMOFa8REGIG1izCpoysvKyk3gyK7jl_6EHDUn20qyoVv3CrPG3WhgxxAkApLcGr9b4tG0mp_zLlqDW8YZQX4ukMAlwuGRJpTJQtSSeL6DygYp9HxCGzvOgJTVS5_C4qlXqxZjslk0bGNouC6uWC7ry2IJPIb3t8Im08_mfWEy-pAwoUrpCdpkzQacEkiSi0IKRej0Ip-T_uDk1T9zljJBT5-K4xaljFjrlPw2snD2v__GIUA6C_8-3jdHFtmNmroQsK3eSSV-QIUqjKaovlMu9kGY3EJDFz6AkFnrtz4u1XMbCu9G1dCk8wigXh7I5mPXwll8UsdfmrI_O8p9_Qba7BxVZm1ptgi1xvCCjIZDwpZJ_CQuF99qpCj58yPqihlL5wovIqlgfMt4-DaetLZ_vwKRWBrno24ys5NS0XUKemCMYTKJrTJMEaaAdii6nzJCxZTcWneTNuDcPUc7Wi5Fnx8qw1ql4KR3QHSKdpjm30sWWWie99tqrkN36tFtpqbMADlqkQ0qcKWODAbMQkuCHmnwmKKfj_poiFXDO4ai0XerFl-WpQCMNzTcbmYA5uv73sHIqo_nqrq79xKJNd7WkKydlnENCkyNMhgi1NaTzvrNKEiOr4OanCRRO9cmmiHff0LLjh3ouDfIYAYOJPZjFxadZFYrr1rep1u-DZWKrvQcHQrpEbac6UJ0trBGN17e2YTopisTsuggoTcD5nrBv_9-44a9EEyvaPCG_hyqv4_uzbAGr6fWVhtfVkmJbmI4CK22EVWKlHmWBOI0OkeaCkkUVJ6fx-ZoNDH_o-oKLacfii-yWQTEx3TEqoaoemvbtr0o9hNbujYHE-r16ZZmtDh9erF1iiw1LsiC-Ba3Loa1kJRWS2NyWFh538-mahEz835HIm2YoFt0hALmtGaXiwJFzIr3bxpS_68uxYVmqhhsffaZ6ULs8Z7oOlzSE-4Ofdi8Jms3mqRUPUMfRj6Zz5OKmyYFuPTzeCAWciTCa08OjWhGEy9qvl8nNnV9birkQI12_fleRJkGSGpozmva4sk0sAaXJ570SLnnN146tavX8ltKxez0N0yEKhaYmn_LGo3Unvc3SpYf4159uZoiZMRpAmmxmsxhsixmeEanxmrF6KRam196kJh1I58uev3Xp9bXHm2UCHv08HqqCDabOxqFcA7Xbx5u9zOexZUCOnAUlWpdacrMjWbw5qw-u9beeZT4Gv87cpgcJTe7QuYh11-6n-LJBLB38DD6itAW20eCXRjSh6sCkn_rGslF5g58"}
                title="Property at the Town"
                isTitleCenter={true}
                isContentAtCenter={true}
            >


                <div className="card transparent">


                    <Filters
                        // seekerCategory={sekeerNewCategory}
                        syntheticState={syntheticState}
                        onChange={loadValToFiltersState}

                    />
                </div>



                <ActionsAndStatus
                    isTransparent={true}
                    isShort={true}
                    onShowOffersClick={() => {
                        history.push({
                            pathname: "/table",
                            search: history.location.search
                        }, {
                            isScrollToOffers: true
                        })
                    }}
                // getRandomSeekerAndLoad={getAndSetSyntheticState}
                />



            </Header>
            <Content>
                <HomeContent />
            </Content>
        </>
    )
}

export default HomePage