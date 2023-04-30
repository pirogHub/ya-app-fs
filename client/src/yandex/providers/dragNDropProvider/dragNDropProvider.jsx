import React, { useContext } from "react";


const DragNDropContext = React.createContext()



export const useDragNDrop = () => {
    return useContext(DragNDropContext)
}


const DragNDropProvider = ({ children }) => {


    const handleOnDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("handlerOnDrop", e);

        console.log("e.dataTransfer", e.dataTransfer);
        if (e.dataTransfer.files && e.dataTransfer.files?.length) {
            console.log("dataTransfer files");
            console.log("e.dataTransfer.files", e.dataTransfer.files);
            return (e.dataTransfer.files)
        }
        else if (e.dataTransfer.items) {
            console.log("dataTransfer items");
            const dti = e.dataTransfer.items;
            console.log("dti", dti[0]);
            return (dti)
        }

        return null
    }

    const ignoreOnDragOver = (e) => {
        e.stopPropagation()
        e.preventDefault();
        return false
    }

    const checkWorkingAtConsole = () => {

        console.log("DragNDropProvider works");
    }


    return (
        <DragNDropContext.Provider value={{ handleOnDrop, ignoreOnDragOver, checkWorkingAtConsole }}>
            {children}
        </DragNDropContext.Provider>
    )
}

export default DragNDropProvider