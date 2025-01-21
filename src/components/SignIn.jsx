import { Link, useNavigate } from 'react-router-dom';
import './SignInUp.css'
function SignIn() {
    const navigate = useNavigate();
    return(
        <div className="sign-in-up-container">
            <div className="logo">
                <h1>Logo</h1>
            </div>
            <form>
                <label>Email</label><br/>
                <input type="email" id="email" placeholder="Enter your email"/><br/>
                <label>Password</label><br/>
                <input type="password" id="password" placeholder="Enter your password" /><br/>
                <button type="submit" className="btn btn-primary" onClick={() => navigate('/main/messages')}>Sign In</button><br/>
            </form>
            <div className="continue-with">
                <div className="divider">
                    <hr/><p>or continue with:</p><hr/>
                </div>
                <button className="btn btn-secondary"><img src="../../../public/google.svg" style={{width:'28px', height:'28px'}}/>
</button><br/>
            </div>
            <div className="new-user">
                <p>Don't have an account?&emsp;</p><Link to="/sign-up">Sign Up</Link>
            </div>
        </div>
    )
}

export default SignIn;
