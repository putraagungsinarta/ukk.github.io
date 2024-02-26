import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [Users, setUser] = useState(null);
    useEffect(() => {
        if(!Users) {
            axios.get('/profile').then(({data}) => {
                setUser(data)
            })
        }
    }, [])
    return (
        <UserContext.Provider value={{Users, setUser}}>
            {children}
        </UserContext.Provider>
    )
}