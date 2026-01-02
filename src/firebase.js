
// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSy...YOUR_WEB_API_KEY...", // must be your real Web API key
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123xyz456",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/**
 * Creates a new invisible reCAPTCHA anchored to a button DOM id.
 * Clears any existing instance to avoid 'stale/expired' verifier errors.
 * Modular signature: new RecaptchaVerifier(auth, containerOrId, params)
 * Docs: https://firebase.google.com/docs/auth/web/phone-auth
 */
export function setupInvisibleRecaptcha(anchorId = "send-otp-button") {
  try {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear?.();
      window.recaptchaVerifier = null;
    }
  } catch (_) {}

  const verifier = new RecaptchaVerifier(auth, anchorId, {
    size: "invisible",
    // Optional debug callbacks
    "expired-callback": () => {
      console.warn("reCAPTCHA expired; a new one will be created on next attempt.");
    },
  });

  // Pre-render so the next click is snappy; ignore render errors quietly.
  verifier.render().catch(() => {});
  window.recaptchaVerifier = verifier;
  return verifier;
}

export { signInWithPhoneNumber, onAuthStateChanged, EmailAuthProvider, linkWithCredential };
