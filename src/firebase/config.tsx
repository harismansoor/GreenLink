import { initializeApp } from "firebase/app";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  getAuth,
  updateProfile,
} from "firebase/auth";
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

// import { useRouter } from "next/router";

const firebaseConfig = {
  apiKey: "AIzaSyCK0hnM7a1RvKG5A4P3rIGG4v9n26f2o2M",
  authDomain: "testing-2e1c6.firebaseapp.com",
  projectId: "testing-2e1c6",
  storageBucket: "testing-2e1c6.appspot.com",
  messagingSenderId: "1019278994919",
  appId: "1:1019278994919:web:9dcaff1c27b11bf0aee142",
  measurementId: "G-TX57KK0G8F",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const secondaryAuth = getAuth(app);
const storage = getStorage(app);
const db = getDatabase(app);
const firestoredb = getFirestore(app);

export const uploadImg = async (image) => {
  // const currentUser = useAuth();
  let result = { success: false, imageUrl: "" };
  const imageRef = ref(storage, Date.now() + "image");
  const snapshot = await uploadBytes(imageRef, image);

  await getDownloadURL(imageRef)
    .then((res) => {
      console.log(res);
      result.success = true;
      result.imageUrl = res;
      // toast("Profile uploaded succesfully");
      // updateProfile(currentUser, { photoURL: res });
    })
    .catch((err) => {
      console.log(err);
      result.success = false;
      result.imageUrl = "";
    });

  return result;
  // window.location.reload();
};
export const uploadImgCollection = async (image, currentUser) => {
  // const currentUser = useAuth();

  let success;
  const imageRef = ref(storage, currentUser.uid + "image" + Date.now());
  const snapshot = await uploadBytes(imageRef, image);

  await getDownloadURL(imageRef)
    .then((res) => {
      success = res;
    })
    .catch((err) => {
      console.log(err);
      success = "";
    });

  return success;
};

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(
      collection(firestoredb, "users"),
      where("uid", "==", user.uid)
    );
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(firestoredb, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  //   const router = useRouter();
  try {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        localStorage.isSigninSuccess = true;
        // navigate("/");
        return userCred;
      })
      .catch((e) => {
        toast.error(" User and Password not correct", {
          toastId: "loginError",
        });
        return "";
      });
  } catch (err) {
    console.error(err);
    toast.error(" User and Password not correct", {
      toastId: "loginError",
    });
    return userCred;
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  let error = false;
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(async () => {
            // Profile updated!
            await setDoc(doc(firestoredb, "users", email), {
              uid: user.uid,
              fullName: name,
              userEmail: email,
              isApproved: true,
              isAdmin: false,
            })
              .then((res) => {
                // signOut(auth);
                // sendEmailVerification(user).then(() => {
                //   // Email verification sent!
                //   // ...
                //   toast.success("Email Verfication sent!", {
                //     toastId: "userAdded",
                //   });
                localStorage.isSignupSuccess = true;

                let userData = {
                  email: user.email,
                  name: user.displayName,
                  uid: user.uid,
                };
                const jsonString = JSON.stringify(userData);
                localStorage.setItem("tuxnftuser", jsonString);
                toast("Signup success");
                // window.location.reload(false);
                signOut(auth)
                  .then(() => {
                    console.log("User signed out successfully.");
                  })
                  .catch((error) => {
                    console.log("Error signing out:", error);
                  });
                // });
              })
              .catch(function (error) {
                console.log(error);
                return false;
              });
          })
          .catch((error) => {
            // An error occurred

            console.log(error);
            return false;
          });
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
  } catch (err) {
    console.error(err);
    alert(err.message);
    return false;
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  app,
  storage,
  firestoredb,
  secondaryAuth,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
