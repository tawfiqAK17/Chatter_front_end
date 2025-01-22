import { Link, useNavigate } from 'react-router-dom';
import './SignInUp.css'
function SignIn() {
    const navigate = useNavigate();
    return(
        <div className="sign-in-up-container">
            <img className="logo" src="/logo.png"/>
            <form onSubmit={async (e) => {
                e.preventDefault(); // Prevent form submission
                const auth = await user_auth(
                    document.getElementById('user-name').value,
                    document.getElementById('password').value
                );
                if (auth) {
                    navigate('/main/messages');
                }
            }}>
                <label>User name</label><br/>
                <input type="text" id="user-name" placeholder="Enter your user name" required/><br/>
                <label>Password</label><br/>
                <input type="password" id="password" placeholder="Enter your password"  required/><br/>
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

async function user_auth(name, password) {
    const payload = {
        name: name,
        password: password 
    }
    const respons = await fetch('http://localhost:5000/sign-in', {
        method: 'POST',
        headers: {
            'content-type' : 'application/json',
        },
        body: JSON.stringify(payload),
    })
    const respons_text = await respons.text();
    if ( respons_text === 'true') {
        return true;
    }
    return false;
}
export default SignIn;
