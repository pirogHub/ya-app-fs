import myHttp from "./http.service";



const imgService = {
    loadImg: async ({ file, type = 'plan', isToRandomDb = false }) => {
        let data = new FormData();
        data.append('file', file, file.name);
        try {
            const response = await myHttp.post(
                `/img/${isToRandomDb ? "random/" : ""}${type}`
                , data
                , {
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    }
                })

            console.log("imgService response", response);
            // return response.data

            const myLink = response.data
            if (!myLink) throw new Error("ERRRR imgService loadImg")
            // if (true) throw new Error("ERRRR imgService loadImg")
            return Promise.resolve(myLink)
            // return new Promise((res, rej) => {

            //     setTimeout(() => {
            //         
            //         res(myLink)

            //     }, 4000)
            // })

        } catch (error) {

            console.log("ERRRR imgService loadImg", error);
            return Promise.reject(false)
        }
    },
    // getRandomImgs: async (type = "photo") => {
    //     try {
    //         const { data } = await myHttp.get(`/img/${type}/randomList`,)
    //         // console.log(`getRandomImgs ${what} data`, data);
    //         return data
    //     } catch (error) {
    //         console.log("ERRRR imgService getRandomImgs", error);
    //         return []
    //     }
    // },
    //     loadRandomImg: async (file, type = "plan") => {
    //         let data = new FormData();
    //         data.append('file', file, file.name);
    //         try {
    //             const response = await myHttp.post(`/img/random/${type}`, data, {
    //                 headers: {
    //                     'accept': 'application/json',
    //                     'Accept-Language': 'en-US,en;q=0.8',
    //                     'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    //                 }
    //             })
    //             console.log("imgService response", response);
    //             if (!response?.data) throw new Error("loadRandomImg: null at success response")
    //             return response?.data

    //         } catch (error) {
    //             console.log("loadRandomImg: server error", error);
    //             return null
    //         }
    //     },

}

export default imgService