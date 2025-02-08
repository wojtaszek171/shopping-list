import { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Authentication = () => {
  const [register, setRegister] = useState(false);

  return (
    <div className="authentication-component">
      {register ? <SignUp /> : <SignIn />}
      <button onClick={() => setRegister(!register)}>
        {register
          ? 'Already have an account? Login'
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default Authentication;
