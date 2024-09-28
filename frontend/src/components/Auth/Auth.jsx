import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import firebaseApp from '../../services/firebase.js';
import { cloneElement } from 'react';
import SignIn from '../SignIn/SignIn.js';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../utils/theme.js';

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
    const clonedElement = cloneElement(children, { user: user.user });
    return (
      <div>
        {clonedElement}
      </div>

    );
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="Auth">
        <SignIn signInWithGoogle={signInWithGoogle} />
      </div>
    </ThemeProvider>
  );
};

export default Auth;