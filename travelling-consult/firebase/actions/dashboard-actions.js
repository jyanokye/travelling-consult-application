import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, getCountFromServer, limit, startAfter, endBefore, getAggregateFromServer, sum } from "firebase/firestore";
import {db} from "../firebase-config";

export const getBookingNumber = async () =>{
    try{
        const bookingsCollection = collection(db, 'bookings');
        const q = query(bookingsCollection, where('bookingStatus', '==', 'confirmed'));
        const count = await getCountFromServer(q);
        console.log(count.data().count);
        return count.data().count;
    } catch (error){
        console.log('Error getting number of confirmed bookings: ', error);
    }
}

export const getRevenue = async () =>{
    try{
        const bookingsCollection = collection(db, 'bookings');
        const q = query(bookingsCollection, where('paymentStatus', '==', 'paid'));
        const revenue = await getAggregateFromServer(q, {
            totalPrice: sum('totalPrice')
        });
        console.log(revenue.data().totalPrice);
        return revenue.data().totalPrice;
    } catch(error){
        console.log('Error getting revenue: ', error);
    }
}

export const getTourNumber = async () =>{
    try{
        const bookingsCollection = collection(db, 'tours');
        const count = await getCountFromServer(bookingsCollection);
        console.log(count.data().count);
        return count.data().count;

    } catch (error){
        console.log('Error getting number of confirmed bookings: ', error);
    }
}

export const getUserNumber = async () =>{
    try{
        const usersCollection = collection(db, 'users');
        const count = await getCountFromServer(usersCollection);
        console.log(count.data().count);
        return count.data().count;
    } catch (error){
        console.log('Error getting number of confirmed bookings: ', error);
    }
}
