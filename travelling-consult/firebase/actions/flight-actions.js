import { db } from '../firebase-config';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

export const getFlights = async () =>{
    try{
        const flightsCollection = collection(db, 'flights');
        const flightsSnapshot = await getDocs(flightsCollection);
        const flightsList = flightsSnapshot.docs.map(doc => doc.data());
        return flightsList;
    } catch (error){
        console.log('Error getting flights: ', error);
    }
}

export const addFlights = async (flight) =>{
    try{
        const flightsCollection = collection(db, 'flights');
        const newFlight = await addDoc(flightsCollection, flight);
        return newFlight;
    }catch(error){
        console.log('Error adding flight: ', error);
    }
}

export const updateFlight = async( id, flight ) =>{
    try{
        const flightDoc = doc(db, 'flights', id);
        await updateDoc(flightDoc, flight);
    } catch(error){
        console.log('Error updating flight: ', error);
    }
}

export const deleteFlight = async (id) =>{
    try{
        const flightDoc = doc(db, 'flights', id);
        await deleteDoc(flightDoc);
    } catch(error){
        console.log('Error deleting flight: ', error);
    }
}

export const getFlight = async (id) =>{
    try{
        const flightDoc = doc(db, 'flights', id);
        const flightSnapshot = await getDoc(flightDoc);
        const flight = flightSnapshot.data();
        return flight;
    } catch(error){
        console.log('Error getting flight: ', error);
    }
}
