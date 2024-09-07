import { db } from '../firebase-config';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

export const getBookings = async () =>{
    try{
        const bookingsCollection = collection(db, 'bookings');
        const bookingsSnapshot = await getDocs(bookingsCollection);
        const bookingsList = bookingsSnapshot.docs.map(doc => doc.data());
        return bookingsList;
    } catch (error){
        console.log('Error getting bookings: ', error);
    }
}

export const addBooking = async (booking) =>{
    try{
        const bookingsCollection = collection(db, 'bookings');
        const newBooking = await addDoc(bookingsCollection, booking);
        return newBooking;
    }catch(error){
        console.log('Error adding booking: ', error);
    }
}

export const updateBooking = async( id, user ) =>{
    try{
        const bookingDoc = doc(db, 'bookings', id);
        await updateDoc(bookingDoc, booking);
    } catch(error){
        console.log('Error updating booking: ', error);
    }
}

export const deleteBooking = async (id) =>{
    try{
        const bookingDoc = doc(db, 'bookings', id);
        await deleteDoc(bookingDoc);
    } catch(error){
        console.log('Error deleting booking: ', error);
    }
}

export const getBooking = async (id) =>{
    try{
        const bookingDoc = doc(db, 'bookings', id);
        const bookingSnapshot = await getDoc(bookingDoc);
        const booking = bookingSnapshot.data();
        return booking;
    } catch(error){
        console.log('Error getting booking: ', error);
    }
}
