import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import firebaseApp from '../../services/firebase.js';
import { cloneElement } from 'react';

const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence);


const Auth = ({ children }) => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    // const [signOut] = useSignOut(auth);

    console.log(user);
  
    if (error) {
      return (
        <div>
          <p>Error: {error.message}</p>
        </div>
      );
    }
    if (loading) {
      return <p>Loading...</p>;
    }
    if (user) {
      const clonedElement = cloneElement(children, {user: user.user});
      return (
        <div>
          <p>Signed In User: {user.user.email}, {user.user.displayName}</p>
          {clonedElement}
          {/* <button onClick={() => signOut()}>signOut</button> */}
        </div>

      );
    }
    return (
      <div className="App">
        <button onClick={() => signInWithGoogle()}>Sign In</button>
      </div>
    );
  };

export default Auth;