import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, limit, startAfter, endBefore } from "firebase/firestore";
import {db} from "../firebase-config";


export const addBooking = async (booking) =>{
    try{
        const newBooking = await addDoc(collection(db, 'bookings'), booking);
        return newBooking;
    }catch(error){
        console.log('Error adding booking: ', error);
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

export const getUserByBooking = async (userId) =>{
    try{
        const bookingCollection = collection(db, 'users');
        const bookingSnapshot = await getDocs(query(bookingCollection, where('userId', '==', userId)));
        const bookingList = bookingSnapshot.docs.map(doc => doc.data());
        return bookingList;
    } catch(error){
        console.log('Error getting bookings: ', error);
    }
}

export const getTourByBooking = async (tourId) =>{
    try{
        const tourCollection = collection(db, 'tours');
        const tourSnapshot = await getDocs(query(tourCollection, where('tourId', '==', tourId)));
        const tour = tourSnapshot.docs.map(doc => doc.data());
        return tour;
    } catch(error){
        console.log('Error getting bookings: ', error);
    }
}

export const updateBooking = async( id, booking ) =>{
    try{
        const bookingDoc = doc(db, 'bookings', id);
        await updateDoc(bookingDoc, booking);
    } catch(error){
        console.log('Error updating tour: ', error);
    }
}

export const deleteBooking = async (id) =>{
    try{
        const bookingDoc = doc(db, 'bookings', id);
        await deleteDoc(bookingDoc);
    } catch(error){
        console.log('Error deleting bookings: ', error);
    }
}

export const getBookings = async (startAtDoc = null, direction = "forward") => {
    try {
      const bookingsCollection = collection(db, "bookings");
      let bookingsQuery;

      if (direction === "forward") {
        bookingsQuery = startAtDoc
          ? query(bookingsCollection, startAfter(startAtDoc), limit(20))
          : query(bookingsCollection, limit(20));
      } else if (direction === "backward") {
        bookingsQuery = startAtDoc
          ? query(bookingsCollection, endBefore(startAtDoc), limit(20))
          : query(bookingsCollection, limit(20));
      }

      const bookingsSnapshot = await getDocs(bookingsQuery);

      if (bookingsSnapshot.empty) {
        return { bookingsList: [], lastVisible: null }; // Return empty users and no lastVisible if none are found
      }

      const bookingsList = bookingsSnapshot.docs.map(doc => doc.data());
      const lastVisible = bookingsSnapshot.docs[bookingsSnapshot.docs.length - 1]; // For pagination

      return { bookingsList, lastVisible };
    } catch (error) {
      console.error("Error getting tours: ", error);
      return { bookingsList: [], lastVisible: null }; // Return empty structure on error
    }
};
