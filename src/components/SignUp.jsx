import { Link } from 'react-router-dom';
import './SignInUp.css'
function SignUp() {
    return(
        <div className="sign-in-up-container">
            <div className="logo">
                <h1>Logo</h1>
            </div>
            <form>
                <label>Full Name</label><br/>
                <input type="text" id="name" placeholder="Enter your full name"/><br/>
                <label>Email</label><br/>
                <input type="email" id="email" placeholder="Enter your email"/><br/>
                <label>Password</label><br/>
                <input type="password" id="password" placeholder="Enter your password" /><br/>
                <label>Password check</label><br/>
                <input type="password" id="password-check" placeholder="Enter your password again" /><br/>
                <button type="submit" className="btn btn-primary">Sign Up</button><br/>
            </form>
            <div className="continue-with">
                <div className="divider">
                    <hr/><p>or continue with:</p><hr/>
                </div>
                <button className="btn btn-secondary"><img src="../../../public/google.svg" style={{width:'28px', height:'28px'}}/></button>
            </div>
            <div className="new-user">
                <p>Already have an account?&emsp;</p><Link to="/sign-in">Sign In</Link>
            </div>
        </div>
    )
}

export default SignUp;
