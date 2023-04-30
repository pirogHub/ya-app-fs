import localStorageService from "./localStorage.service"

const AuthExistingService = {
    isExisitingAuth: (authState) => {
        const isAuthExist =
            authState?.tokens?.accessToken &&
            authState?.tokens?.refreshToken &&
            authState?.tokens?.userId &&
            authState?.user?.userId &&
            authState?.user?.userName
            || authState !== "loading"

        const tokens = localStorageService.getTokens()
        if (isAuthExist) {
            if (!tokens) return false
        } else {
            if (tokens) {
                localStorageService.removeAllTokens()
                return false
            }
        }

        return true
    }
}
export default AuthExistingService