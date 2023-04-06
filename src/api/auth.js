import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '../firebaseConfig';

export function apiCreateUser({ email, password }) {
  return new Promise((resolve, reject) =>
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      console.log('Error in auth : ', error.message);
      switch (error.code) {
        case 'auth/invalid-email':
          return reject({ title: 'Email', field: 'email', message: 'Wrong email' });
        case 'auth/weak-password':
          return reject({
            title: 'Password',
            field: 'password',
            message: 'Weak-password. Password should be at least 6 characters',
          });
        case 'auth/email-already-in-use':
          return reject({ title: 'Email', field: 'email', message: 'Email already in use' });
        default:
          return reject({ field: 'email', message: 'Email already in use' });
      }
    }),
  );
}

export function apiSignUser({ email, password }) {
  return new Promise((resolve, reject) =>
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        resolve(userCredential.user);
      })
      .catch((error) => {
        console.log('Error in auth : ', error.message);
        reject({ title: 'Email', field: 'email', message: 'wrong email or password' });
      }),
  );
}

export function apiLogout() {
  return new Promise((resolve) =>
    signOut(auth)
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      }),
  );
}

export function onApiAuthChanged(onStateChange) {
  onAuthStateChanged(auth, (user) => {
    onStateChange(user);
  });
}
