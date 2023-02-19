// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: 'AIzaSyBQOdv6KZ8hoHMCAaPs4SpJLx58a75u8NY',
  authDomain: 'lavlus.firebaseapp.com',
  projectId: 'lavlus',
  storageBucket: 'lavlus.appspot.com',
  messagingSenderId: '687722612491',
  appId: '1:687722612491:web:9b1ecd644ad5d2d969040e',
  measurementId: 'G-C6ZTCVMF64',
};

// Initialize Firebase
export const app = initializeApp(config);
export const auth = getAuth(app);

// Firebaseの初期化を待機してFirebaseUserを返す非同関数
export const getFirebaseUserAsync = () => {
  return new Promise<User | null>((resolve) => {
    // 初期化を待機
    auth.onAuthStateChanged((user) => {
      if (user) resolve(user);
      else resolve(null);
    });
  });
};

export const getFirebaseIdToken = async (): Promise<string | null> => {
  // Firebaseの初期化を待機してUserを取得
  const user = await getFirebaseUserAsync();
  // ログイン済みならトークンを返す
  if (user) return await user.getIdToken();
  // 未ログインならnullを返す
  return null;
};
