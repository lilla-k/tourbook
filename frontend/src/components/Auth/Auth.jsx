import { cloneElement } from 'react';
import { getAuth } from 'firebase/auth';
import { useSignInWithGoogle, useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import firebaseApp from '../../services/firebase.js';
import SignIn from '../SignIn/SignIn.jsx';
import Loading from '../Loading/Loading.jsx';

const auth = getAuth(firebaseApp);

function Auth({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  if (error) {
    return (
      <div>
        <p>
          Error:
          {error.message}
        </p>
      </div>
    );
  }
  if (loading) {
    return <Loading />;
  }
  if (user) {
    const clonedElement = cloneElement(children, { user });
    return clonedElement;
  }
  return (
    <div className="Auth">
      <SignIn
        signInWithGoogle={signInWithGoogle}
        signInWithEmailAndPassword={signInWithEmailAndPassword}
      />
    </div>
  );
}

export default Auth;
