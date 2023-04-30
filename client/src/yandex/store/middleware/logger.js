export function logger(storeAPI) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            // Do anything here: pass the action onwards with next(action),
            // or restart the pipeline with storeAPI.dispatch(action)
            // Can also use storeAPI.getState() here
            // console.log(storeAPI);
            // console.log(next);
            // console.log("logger", action);
            // console.log("logger");
            return next(action)
        }
    }
}