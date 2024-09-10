import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, limit, startAfter, endBefore } from "firebase/firestore";
import {db} from "../firebase-config";


export const addUser = async (user) =>{
    try{
        const newUser = await addDoc(collection(db, 'users'), user);
        return newUser;
    }catch(error){
        console.log('Error adding user: ', error);
    }
}

export const getUser = async (id) =>{
    try{
        const userDoc = doc(db, 'users', id);
        const userSnapshot = await getDoc(userDoc);
        const user = userSnapshot.data();
        return user;
    } catch(error){
        console.log('Error getting user: ', error);
    }
}

export const updateUser = async( id, user ) =>{
    try{
        const userDoc = doc(db, 'users', id);
        await updateDoc(userDoc, user);
    } catch(error){
        console.log('Error updating user: ', error);
    }
}

export const deleteUser = async (id) =>{
    try{
        const userDoc = doc(db, 'users', id);
        await deleteDoc(userDoc);
    } catch(error){
        console.log('Error deleting user: ', error);
    }
}

export const getUsers = async (startAtDoc = null, direction = "forward") => {
    try {
      const usersCollection = collection(db, "users");
      let usersQuery;

      if (direction === "forward") {
        usersQuery = startAtDoc
          ? query(usersCollection, startAfter(startAtDoc), limit(20))
          : query(usersCollection, limit(20));
      } else if (direction === "backward") {
        usersQuery = startAtDoc
          ? query(usersCollection, endBefore(startAtDoc), limit(20))
          : query(usersCollection, limit(20));
      }

      const usersSnapshot = await getDocs(usersQuery);

      if (usersSnapshot.empty) {
        return { usersList: [], lastVisible: null }; // Return empty users and no lastVisible if none are found
      }

      const usersList = usersSnapshot.docs.map(doc => doc.data());
      const lastVisible = usersSnapshot.docs[usersSnapshot.docs.length - 1]; // For pagination

      return { usersList, lastVisible };
    } catch (error) {
      console.error("Error getting users: ", error);
      return { usersList: [], lastVisible: null }; // Return empty structure on error
    }
  };

export const admins = async () =>{
    try{
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('role', '==', 'admin'));
        const querySnapshot = await getDocs(q);
        const admins = querySnapshot.docs.map(doc => doc.data());
        return admins;
    }catch(error){
        console.log('Error getting admins: ', error);
    }
}
