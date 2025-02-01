import { Link, useNavigate } from 'react-router-dom';
import './SignInUp.css'
import axios from 'axios';
function SignUp() {
    const navigate = useNavigate()
    return(
        <>       
            <div className="sign-in-up-container">
                <img className="logo" src="/logo.png"/>
                <form onSubmit={async (e) => {
                    e.preventDefault(); // Prevent form submission
                    const auth = await add_user(document);
                    if (auth === true) {
                        navigate('/main/messages');
                    }
                }}>
                    <label>Full Name<p className="correct-input" id="taken-user-name">this user name already used</p></label><br/>
                    <input type="text" id="user-name" placeholder="Enter your full name" onChange={() => document.getElementById('taken-user-name').className = 'correct-input'}  required/><br/>
                    <label>Email</label><br/>
                    <input type="email" id="email" placeholder="Enter your email" required/><br/>
                    <label>Password</label><br/>
                    <input type="password" id="password" placeholder="Enter your password" onChange={() => document.getElementById('password-mismatch').className = 'correct-input'} required/><br/>
                    <label id="password-check-label">Password check <p className="correct-input" id="password-mismatch">the passwords doesn't match</p></label><br/>
                    <input type="password" id="password-check" placeholder="Enter your password again" onChange={() => document.getElementById('password-mismatch').className = 'correct-input'} required/><br/>
                    <button type="submit" className="btn btn-primary">Sign Up</button><br/>
                </form>
                <div className="continue-with">
                    <div className="divider">
                        <hr/><p>or continue with:</p><hr/>
                    </div>
                    <button className="btn btn-secondary"><img src="/google.svg" style={{width:'28px', height:'28px'}}/></button>
                </div>
                <div className="new-user">
                    <p>Already have an account?&emsp;</p><Link to="/sign-in">Sign In</Link>
                </div>
            </div>
        </>
    )
}

async function add_user(document) {
    const user_name = document.getElementById('user-name');
    const password = document.getElementById('password');
    const email = document.getElementById('email');
    const password_check = document.getElementById('password-check');

    if (password.value !== password_check.value) {
        document.getElementById('password-mismatch').className = 'incorrect-input';
        return false;
    }
    try {
        await axios.post('http://localhost:5000/sign-up', {
            name: user_name.value, 
            email: email.value,
            password: password.value
        }, {
                withCredentials: true
            }
        )
        return true;
    } catch (err) {
        if (err.response.data.message === 'taken user name') {
            document.getElementById('taken-user-name').className = 'incorrect-input';
            return false;
        }
    }
}

export default SignUp;
