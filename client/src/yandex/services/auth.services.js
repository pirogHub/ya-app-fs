
import axios from "axios";
import localStorageService from "./localStorage.service";
import config from "../../config.json"
import customHistory from "./history.service";


const httpAuth = axios.create({
    baseURL: config.apiEndpoint + "/auth"
})

const authService = {
    signUp: async ({ email, password, userName }) => {
        console.log("auth.services signUp with", email, password, userName);
        try {
            const { data } = await httpAuth.post("/signUp", { email, password, userName })
            console.log("auth.services signUp  received:", data);

            return data
        } catch (error) {
            return { error: error?.message }
            // return null
        }
    },
    signIn: async ({ email, password }) => {
        console.log("auth.services signIn with", email, password);
        try {
            const { data } = await httpAuth.post("/signIn", { email, password })

            console.log("auth.services signUp  received:", data);
            return data
        } catch (error) {
            console.log("auth.services signIn error", error);
            return { error: error?.message }
            // return null
        }
    },
    refresh: async (refreshToken) => {

        // const refreshToken = localStorageService.getRefreshToken()
        try {
            const { data } = await httpAuth.post("/refresh", { refreshToken })
            const userId = localStorageService.getUserId()

            // if (userId && userId !== data?.userId) throw new Error("Unauthorized")

            return data
        } catch (error) {
            // customHistory.push("/auth?type='relogin'")
            // localStorageService.removeAllTokens()


            return null

        }
    }
}



export default authService