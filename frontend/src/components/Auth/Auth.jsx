import { cloneElement } from 'react';
import { getAuth } from 'firebase/auth';
import { useSignInWithGoogle, useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import firebaseApp from '../../services/firebase.js';
import SignIn from '../SignIn/SignIn.js';
import Loading from '../Loading/Loading.js';


const auth = getAuth(firebaseApp);

const Auth = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <Loading/>;
  }
  if (user) {
    const clonedElement = cloneElement(children, { user: user});
    return clonedElement;
  }
  return (
      <div className="Auth">
        <SignIn signInWithGoogle={signInWithGoogle} signInWithEmailAndPassword={signInWithEmailAndPassword}/>
      </div>
  );
};

export default Auth;