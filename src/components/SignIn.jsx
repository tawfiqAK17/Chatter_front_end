import { Link, useNavigate } from 'react-router-dom';
import './SignInUp.css'
import axios from 'axios';
function SignIn() {
    const navigate = useNavigate();
    return(
        <div className="sign-in-up-container">
            <img className="logo" src="/logo.png"/>
            <form onSubmit={async (e) => {
                e.preventDefault(); // Prevent form submission
                const auth = await user_auth(document);
                if (auth === true) {
                    navigate('/main/messages');
                }
            }}>
                <p className="correct-input" id="authentication-failed">the user name or the password is incorrect</p>
                <label>User name</label><br/>
                <input type="text" id="user-name" placeholder="Enter your user name" onChange={() => document.getElementById('authentication-failed').className = 'correct-input'} required/><br/>
                <label>Password</label><br/>
                <input type="password" id="password" placeholder="Enter your password" onChange={() => document.getElementById('authentication-failed').className = 'correct-input'} required/><br/>
                <button type='submit' className="btn btn-primary" >Sign In</button><br/>
            </form>
            <div className="continue-with">
                <div className="divider">
                    <hr/><p>or continue with:</p><hr/>
                </div>
                <button className="btn btn-secondary"><img src="/google.svg" style={{width:'28px', height:'28px'}}/>
                </button><br/>
            </div>
            <div className="new-user">
                <p>Don't have an account?&emsp;</p><Link to="/sign-up">Sign Up</Link>
            </div>
        </div>
    )
}

async function user_auth(document) {
    const name = document.getElementById('user-name').value;
    const password = document.getElementById('password').value;
    const payload = {
        name: name,
        password: password 
    }
    try{
        const response = await axios.post('/sign-in', payload, {
            withCredentials: true,
        }); 
        const response_body = response.data;
        if ( response_body.message === 'authenticated') {
            sessionStorage.setItem('jwt', response_body.jwt);
            return true;
        }
    } catch (err) {
        console.log(err);
        if (err.response.data.message === 'authentication failed') {
            document.getElementById('authentication-failed').className = 'incorrect-input'; // show to the user that some thing is wrong with his input
            return false;
        } else {
            console.log(err);
        }
    }
}
export default SignIn;
