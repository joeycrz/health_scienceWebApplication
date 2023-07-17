import React, {useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) =>{
        // sign in
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <div class='sign-in-container'>
            <form onSubmit={signUp}>

                <h3>Create Account</h3>
                <input 
                    type="email" 
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                 ></input>

                <input
                    type="password" 
                    placeholder='Enter your password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp