import { db } from '../firebase-config';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

export const getUsers = async () =>{
    try{
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => doc.data());
        return usersList;
    } catch (error){
        console.log('Error getting users: ', error);
    }
}

export const addUser = async (user) =>{
    try{
        const usersCollection = collection(db, 'users');
        const newUser = await addDoc(usersCollection, user);
        return newUser;
    }catch(error){
        console.log('Error adding user: ', error);
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
