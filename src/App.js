import "./App.css";
import { useEffect, useState } from "react";
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

function App() {
  const provider1 = new GoogleAuthProvider();
  const auth1 = getAuth();

  const googleLogin = () => {
    signInWithPopup(auth1, provider1)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        setUser({ name: result.user.displayName, email: result.user.email });
        console.log(token, user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const provider2 = new FacebookAuthProvider();
  const auth2 = getAuth();
  const facebbokLogin=()=>{
      signInWithPopup(auth2, provider2)
        .then((result) => {
          // The signed-in user info.
          const user = result.user;

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential.accessToken;

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = FacebookAuthProvider.credentialFromError(error);

          // ...
        });
  }

  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  const updateHight = () => {
    const ele = document.getElementById("chat");
    if (ele) {
      ele.scrollTop = ele.scrollHeight;
    }
  };

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => {
        updateHight();
      }, 100);
    });
  }, []);

  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      message: msg,
    });

    setMsg("");
  };

  return (
    <div>
      {user.email ? null : (
        <div className="signincontainer">
          <div className="innersignin">
            <button onClick={() => googleLogin()}>
              <img
                alt="google icon"
                src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
              />
              SignIn with Google
            </button>
            <button onClick={() => facebbokLogin()}>
              <img
                alt="facebook icon"
                src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
              />
              SignIn with Facebook
            </button>
          </div>
        </div>
      )}
      {user.email ? (
        <div>
          <div className="heading">
            <h3>User: {user.name}</h3>
          </div>

          <div id="chat" className="chat-container">
            {chats.map((chat, index) => (
              <div
                key={index}
                className={`container ${
                  chat.user.email === user.email ? "me" : ""
                }`}
              >
                <p className="chatbox">
                  <strong style={{ color: "#0a0b42" }}>{chat.user.name}</strong>
                  <br />
                  <span>{chat.message}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="sendbox">
            <input
              type="text"
              placeholder="Message"
              onInput={(e) => setMsg(e.target.value)}
              value={msg}
            />
            <button onClick={(e) => sendChat()}>
              <img
                alt="send button"
                src="https://cdn-user-icons.flaticon.com/98241/98241772/1688527428326.svg?token=exp=1688528346~hmac=f50f14c8fe071ffbb6349fe9302588f4"
              />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
