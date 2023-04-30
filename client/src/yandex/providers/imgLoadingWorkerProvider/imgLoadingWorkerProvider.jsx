// import React, { useContext, useState } from "react";



// const ImgLoadingWorkerContext = React.createContext()


// export const useImgLoadingWorker = () => {
//     return useContext(ImgLoadingWorkerContext)
// }

// const ImgLoadingWorkerProvider = ({ children }) => {


//     const createImgObjList = (currentfiles, fileTypes) => {
//         const files = currentfiles
//         if (files.length === 0) return []

//         const tmp_availableFiles = []
//         // const tmp_imagePreviews = []


//         for (const file of files) {
//             if (fileTypes.includes(file.type)) {



//                 const newFile = new File([file], file.name, { type: file.type })
//                 console.log("newFile", newFile);
//                 const fileObj = { file: newFile, url: URL.createObjectURL(file), link: 0 }
//                 tmp_availableFiles.push(fileObj)
//             }
//             // tmp_imagePreviews.push(URL.createObjectURL(file))
//         }

//         return [...tmp_availableFiles]
//     }

//     const [testObj, setTestObj] = useState({ key: 3 })
//     const changeTestObj = (val) => {
//         const newObj = testObj
//         newObj.key = val
//         setTestObj(prev => newObj)
//     }
//     return (
//         <ImgLoadingWorkerContext.Provider value={{ createImgObjList, testObj, changeTestObj }}>
//             {children}
//         </ImgLoadingWorkerContext.Provider>
//     )
// }

// export default ImgLoadingWorkerProvider