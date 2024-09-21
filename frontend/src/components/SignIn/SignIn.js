import './SignIn.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';


function SignIn({ signInWithGoogle }) {

    const [showSignInInputs, setShowSignInInputs] = useState(false);

    function signInWithEmail() {
        console.log("sign in with email")
    }
    return (
        <div
            className="SignIn"
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/initial_background2.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
        >
            <div className="SignIn-content">
                <div className="SignIn-header">Sign in to your account</div>
                <Button
                    onClick={() => signInWithGoogle()}
                    sx={{ display: "block", margin: "10px auto", width: "200px" }}
                    variant="outlined">
                    Sign in with Google
                </Button>
                <Button
                    onClick={() => setShowSignInInputs(true)}
                    sx={{ display: "block", margin: "10px auto", width: "200px" }}
                    variant="outlined">
                    Sign in with Email
                </Button>
                {showSignInInputs && <div className="SignIn-emailForm">
                    <TextField id="outlined-basic" label="Email address" variant="outlined"  sx={{ display: "block", width: "100%" }} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" sx={{ display: "block", margin: "10px auto" }} />
                    <Button
                        variant="contained"
                        className="SignIn-emailBtn"
                        onClick={() => signInWithEmail(true)}
                        sx={{ color: "white", backgroundColor: "black", width: "100%", margin: "5px 0 10px 0" }}>
                        Continue
                    </Button>
                </div>}
                <Button 
                sx={{ display: "block", margin: "10px auto", width: "200px" }}
                variant="outlined"
                >Create an account</Button>
            </div>
        </div>
    )
}

export default SignIn