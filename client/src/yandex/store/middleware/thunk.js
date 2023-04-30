import _ from "lodash";

export function thunk(storeAPI) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            // Do anything here: pass the action onwards with next(action),
            // or restart the pipeline with storeAPI.dispatch(action)
            // Can also use storeAPI.getState() here
            // console.log(storeAPI);
            // console.log(next);
            // console.log(action);

            if (typeof action === "function") {
                console.log("function action", action);
                action(storeAPI.dispatch, storeAPI.getState)
            } else {
                // console.log("object action", action.type, "keys", _.keys({ l: action.payload }));
                // storeAPI.getState()

                return next(action)
            }
        }
    }
}

