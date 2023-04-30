import myHttp from "./http.service";



const dataStructService = {
    getComponentsStruct: async ({ structType, structName, toWhoom = "author" }) => {
        try {
            const { data } = await myHttp.get("/dataStructs"
                + `/${structType}`
                + `/${structName}`
                + `/${toWhoom}`
            )

            return data
        } catch (e) {
            return { error: e }
        }
    },
    getRandom: async ({ type, structName, toWhoom = "author", isToCurrentTypeAndCategory }) => {

        try {
            const { data } = await myHttp.get("/dataStructs"
                + `/${type}`
                + `/${structName}`
                + `/${toWhoom}`
                + "/random",
                + (isToCurrentTypeAndCategory ? "notForce" : "")
            )

            return data
        } catch (e) {
            return { error: e }
        }
    }
}

export default dataStructService