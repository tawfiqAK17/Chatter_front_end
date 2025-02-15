import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRout({ child }) {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(null);
    useEffect(() => {
        const verifyAuth = async () => {
            const server_url = import.meta.env.VITE_SERVER_URL;
            const res = await axios.post(server_url + '/check-auth', {}, {
                withCredentials: true
            });
            if(res.data.isAuth === true) {
                setIsAuth(true);
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
    
    if (isAuth) {
        return (
            child
        )
    }
}

export default ProtectedRout;
