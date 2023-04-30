import randomTools from "../templateData/random/randomTools";
import offerTransform from "../utils/offerTransform";
import myHttp from "./http.service";

const categoriesArr = [
    "flat",
    "room",
    "house",
    "garage",
    "commercial",
    "land",
]
const getRandomCategory = () => {
    const randomIdx = randomTools.getRandomNumber(categoriesArr.length - 1, 0, 0)
    const randomCategory = categoriesArr?.[randomIdx]
    return randomCategory
}


const offerService = {
    getByCategoryAndId: async ({ category, id, link }) => {

        let path
        if (link) path = link
        else path = "/" + category + "/" + id
        try {
            const { data } = await myHttp.get('/offer' + path)
            console.log("offerService getByTypeAndId data", data);
            const originalOffer = data?.[0]

            if (!originalOffer) throw new Error("")
            const generalViewOffer = offerTransform.toGeneralView(originalOffer.category, originalOffer)

            return generalViewOffer

        } catch (error) {
            console.log("Err offerService getAll", error);
            return false
        }
    },
    getByFilters: async ({ filters, from = 0, to }) => {
        // console.log("offerService filters", filters);
        try {
            // let reqType
            const { data } = await myHttp.post(`/offer/slice?` + filters, { from, to })

            //  {from: data.from, to: data.to, allCount: data.alLCount, offersSlice: data.offersSlice}
            return data

        } catch (error) {
            console.error("Err offerService getByFilters", error);
            throw new Error(error)
        }
    },
    getRandomByCategory: async ({ category }) => {
        // console.log("offerService filters", filters);
        try {
            // let reqType
            let realCategory = category
            if (!realCategory) {
                realCategory = getRandomCategory()
            }
            const { data } = await myHttp.get(`/offer/${realCategory}/random/${Math.random()}`)

            console.log("offerService getRandomByCategory data", data);
            const originalOffer = data?.[0]

            if (!originalOffer) throw new Error("")
            const generalViewOffer = offerTransform.toGeneralView(originalOffer.category, originalOffer)

            return generalViewOffer
        } catch (error) {
            console.error("Err offerService getRandomByCategory", error);
            return null
        }
    },
    uploadOne: async (offer, type) => {
        try {
            if (!offer || !type) {
                console.log("uploadOne", "type", type, "Offer", offer);

                throw new Error("offerService uploadOne need offer and type")
                // return
            }
            console.log(" uploadOne offer", offer);
            // 
            const { data } = await myHttp.post('/offer/create' + `/${type}`, JSON.stringify(offer), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return data // link
        } catch (error) {
            // todo if unauthorized
            console.error("Err offerService uploadOne", error);
            return undefined
        }
    },
    getByUserId: async (userId) => {

        try {
            const { data } = myHttp.get("/offer/byUser/" + userId)
            return data

        } catch (error) {
            return []
        }
    },
    removeOffer: async ({ category, id }) => {

        try {
            const { data } = await myHttp.delete(`/offer/${category}/${id}`)
            return true
        } catch (error) {
            return false
        }
    }



}

export default offerService