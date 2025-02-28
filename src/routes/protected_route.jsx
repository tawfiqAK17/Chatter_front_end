import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const userContext = createContext()

function ProtectedRout({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            const server_url = import.meta.env.VITE_SERVER_URL;
            const res = await axios.post(server_url + '/check-auth', {}, {
                withCredentials: true
            });
            if(res.data.user) {
                setUser(res.data.user);
            } else {
                navigate('/sign-in');
            }
        }

        try {
            verifyAuth();
        } catch (err) {
            console.log(err);
        }

    }, [])
    
    if (user) {
        return (
            <userContext.Provider value={user}>
                { children }
            </userContext.Provider>
        )
    }
}

export default ProtectedRout;
