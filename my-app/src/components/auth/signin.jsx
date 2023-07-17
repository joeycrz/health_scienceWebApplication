import React, {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) =>{
        // sign in
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <div class='sign-in-container'>
            <form onSubmit={signIn}>

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

                <button type='submit'>Log In</button>
            </form>
        </div>
    )
}

export default SignIn