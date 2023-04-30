import AuthExistingService from "../../services/authExisting.service"
import { signOut } from "../auth"

export function logOuter(storeApi) {
    return function wrapDispatch(next) {
        return function handleAction(action) {

            const auth = storeApi.getState
            const is = AuthExistingService.isExisitingAuth(auth)
            if (is) return next(action)
            else {

                console.log("storeApi", storeApi, "next", next, "action", action);
                // return next(signOut)
                return next(action)
            }



        }
    }
}