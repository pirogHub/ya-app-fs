import React, { useEffect, useState } from "react";
import userService from "../../services/user.service";


export const useFetchUser = (id) => {

    const [user, setUser] = useState(null)

    const fetchUser = async (id, setter) => {
        let fetchedUser = null
        if (id) {
            fetchedUser = await userService.getUserById(id)

        }
        setter(fetchedUser)
    }

    // useEffect(() => {

    //     async function fetchUser() {
    //         const fetchedUser = id ? await userService.getUserById(id) : null
    //         setUser(fetchedUser)
    //     }
    //     fetchUser()
    // })

    return { user, fetchUser }
}