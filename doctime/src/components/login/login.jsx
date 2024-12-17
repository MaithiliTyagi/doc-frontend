import { useRef, useEffect, useState } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

// Regular expressions for validating username and password
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,24}$/; // Username must start with a letter, and be 3-24 characters
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/; // Password must have at least 8 characters, including uppercase, lowercase, number, and a special character

const Login = () => {
  // Refs for managing focus and error display
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  // State for username and its validation
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // State for password and its validation
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // State for matching password and its validation
  const [mpwd, setMpwd] = useState("");
  const [validMpwd, setValidMpwd] = useState(false);
  const [mpwdFocus, setMpwdFocus] = useState(false);

  // State for displaying error messages
  const [errmsg, setErrmsg] = useState("");

  // Focus the username input field on initial render
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Validate username whenever it changes
  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  // Validate password and confirm password whenever they change
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMpwd(pwd === mpwd);
  }, [pwd, mpwd]);

  // Clear error messages when any input field changes
  useEffect(() => {
    setErrmsg("");
  }, [user, pwd, mpwd]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Revalidate inputs before submitting
    if (!USER_REGEX.test(user) || !PWD_REGEX.test(pwd)) {
      setErrmsg("Invalid Entry");
      return;
    }

    try {
      // API call to register the user
      const response = await fetch('http://localhost:8001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          password: pwd
        })
      });

      // Handle successful registration
      if (response.ok) {
        localStorage.setItem('username', user); // Save username to localStorage
        navigate('/records'); // Redirect to the records page
      } else {
        const data = await response.json();
        setErrmsg(data.message || "Registration failed");
      }
    } catch (err) {
      setErrmsg("No Server Response"); // Handle network errors
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-8 flex flex-col gap-6 items-center justify-center">
      <h1 className="text-3xl md:text-5xl text-custombg font-bold">DOCTIME</h1>
      
      {/* Registration form container */}
      <section className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-custombg p-4 md:p-6 flex flex-col border rounded-2xl">
        {/* Display error messages */}
        <p
          ref={errRef}
          className={errmsg ? "bg-pink-100 text-red-600 font-bold p-2 mb-2 rounded text-sm md:text-base" : "sr-only"}
          aria-live="assertive"
        >
          {errmsg}
        </p>
        
        <h2 className="text-center text-white text-2xl md:text-3xl mb-4 md:mb-6">Sign Up</h2>
        
        {/* Registration form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 md:space-y-6">
          {/* Username input */}
          <div className="space-y-1">
            <label htmlFor="username" className="text-white font-bold text-lg md:text-xl flex items-center gap-1">
              Username:
              <span className={validName ? "text-lime-500" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hidden" : "text-red-500"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              className="w-full px-3 py-2 rounded-md bg-white text-black text-base md:text-lg"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={userFocus && user && !validName ? "text-xs md:text-sm text-gray-200" : "hidden"}
            >
              Must be 2 characters.<br />
              No numbers or special characters.
            </p>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-white font-bold text-lg md:text-xl flex items-center gap-1">
              Password:
              <span className={validPwd ? "text-lime-500" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hidden" : "text-red-500"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              className="w-full px-3 py-2 rounded-md bg-white text-black text-base md:text-lg"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "text-xs md:text-sm text-gray-200" : "hidden"}
            >
              Must be 8 characters long.<br />
              Include uppercase and lowercase letters, a number, and a special character.<br />
              Allowed special characters: ! @ # $ %
            </p>
          </div>

          {/* Confirm password input */}
          <div className="space-y-1">
            <label htmlFor="confirm_pwd" className="text-white font-bold text-lg md:text-xl flex items-center gap-1">
              Confirm Password:
              <span className={validMpwd && mpwd ? "text-lime-500" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMpwd || !mpwd ? "hidden" : "text-red-500"}>
                <FontAwesomeIcon icon={faTimes} />
              </span> 
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMpwd(e.target.value)}
              required
              aria-invalid={validMpwd ? "false" : "true"}
              aria-describedby="confirmnote"
              className="w-full px-3 py-2 rounded-md bg-white text-black text-base md:text-lg"
              onFocus={() => setMpwdFocus(true)}
              onBlur={() => setMpwdFocus(false)}
            />
            <p
              id="confirmnote"
              className={mpwdFocus && !validMpwd ? "text-xs md:text-sm text-gray-200" : "hidden"}
            >
              Must match the first password input field.
            </p>
          </div>

          {/* Submit button */}
          <button
            disabled={!validName || !validPwd || !validMpwd}
            className="w-full md:w-1/3 bg-white text-custombg font-bold py-2 px-4 rounded-md mt-4 self-center
              disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect to Sign In page */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-white font-semibold text-base md:text-lg">Already Registered?</p>
          <a 
            href="/signin" 
            className="text-white underline hover:text-gray-200 transition-colors text-base md:text-lg"
          >
            Sign In
          </a>
        </div>
      </section>
    </div>
  );
};

export default Login;
