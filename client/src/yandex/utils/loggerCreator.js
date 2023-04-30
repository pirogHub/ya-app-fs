// export const loggerCreator = (delimeter, compName, debug = true, MainPostFix) => {
//     return ({ prop, action, data, functionName, postFix }) => {
//         if (debug) console.log(`${delimeter}${compName}`,
//             functionName ? `<F: ${functionName}>` : "",
//             action ? `<${action}>` : "",
//             prop ? `"${prop}"` : "",
//             data ? data : "",
//             postFix ? `-----by${postFix}` : "",
//             MainPostFix ? `-----by${MainPostFix}` : "MainPostFix"
//         );
//     }
// }