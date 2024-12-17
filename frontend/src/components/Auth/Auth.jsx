import { cloneElement } from 'react';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { useSignInWithGoogle, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import firebaseApp from '../../services/firebase.js';
import SignIn from '../SignIn/SignIn.js';


const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence);


const Auth = ({ children }) => {

  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] = useSignInWithEmailAndPassword(auth);
  // const [signOut] = useSignOut(auth);


  if (googleError||emailError) {
    return (
      <div>
        <p>Error: {googleError?.message||emailError.message}</p>
      </div>
    );
  }
  if (googleLoading || emailLoading) {
    return <p>Loading...</p>;
  }
  if (googleUser || emailUser) {
    const clonedElement = cloneElement(children, { user: googleUser?.user || emailUser.user});
    return clonedElement;
  }
  return (
      <div className="Auth">
        <SignIn signInWithGoogle={signInWithGoogle} signInWithEmailAndPassword={signInWithEmailAndPassword}/>
      </div>
  );
};

export default Auth;