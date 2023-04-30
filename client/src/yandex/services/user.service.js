import myHttp from "./http.service";


const AVATAR_METHODS = {
    post: "post",
    patch: "patch"
}


const avatarManipulator = async (file, method) => {
    let data = new FormData();
    data.append('file', file, file.name);
    try {
        const response = await myHttp[method](`/user/avatar`, data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        })

        console.log("userService Avatar response", response);
        const myLink = response.data
        if (!myLink) throw new Error("ERRRR imgService loadImg")
        // if (true) throw new Error("ERRRR imgService loadImg")
        return Promise.resolve(myLink)
        // return new Promise((res, rej) => {
        //     setTimeout(() => {
        //         res(myLink)
        //     }, 3000)
        // })

    } catch (error) {
        console.log("userService Avatar Error", error);
        return Promise.reject(false)
    }
}


const userService = {
    getUserById: async (userId) => {
        try {
            const { data } = await myHttp.get(`/user/${userId}`)
            // return data
            const { user } = data
            console.log("userService getUserById data", data);
            return user
        } catch (error) {
            return null
        }
    },
    patchAvatar: async ({ file }) => await avatarManipulator(file, AVATAR_METHODS.patch),
    removeAvatar: async () => {
        try {
            const response = await myHttp.delete(`/user/avatar`)
            console.log("userService removeAvatar response", response);
            return null

        } catch (error) {
            console.log("userService removeAvatar Error", error);
            return false
        }
    },
    getRandomUser: async () => {
        try {
            const { data } = await myHttp.get(`/user/random`)
            const { user } = data

            return user?.[0]

        } catch (error) {
            console.log("userService removeAvatar Error", error);
            return false
        }
    },
}


export default userService