import React from 'react';
import { signInWithGoogle } from '../firebase';

const SignInWithGoogle = () => {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <h2>Welcome to the AI RPG Game</h2>
          <p className="text-muted">Sign in to save your progress</p>
          <button onClick={signInWithGoogle} className="btn btn-primary mt-3">
            Sign in with Google
          </button>
        </div>
      </div>
    );
  };

export default SignInWithGoogle;
