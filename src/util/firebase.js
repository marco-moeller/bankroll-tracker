import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

export const bankrollsRef = collection(database, "bankrolls");

export const getAllBankrollsFromDB = async () => {
  try {
    let bankrolls = [];
    const snapshot = await getDocs(bankrollsRef);
    snapshot.docs.forEach((doc) => bankrolls.push(doc.data()));
    return bankrolls;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addBankrollToDB = async (bankroll) => {
  try {
    await setDoc(doc(bankrollsRef, Object.keys(bankroll)[0]), bankroll);
  } catch (error) {
    console.log(error);
  }
};

export const removeBankrollFromDB = async (bankrollKey) => {
  try {
    await deleteDoc(doc(database, "bankrolls", bankrollKey));
  } catch (error) {
    console.log(error);
  }
};
