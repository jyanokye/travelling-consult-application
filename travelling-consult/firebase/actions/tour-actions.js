import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, limit, startAfter, endBefore } from "firebase/firestore";
import {db} from "../firebase-config";


export const addTour = async (tour) =>{
    try{
        const newTour = await addDoc(collection(db, 'tours'), tour);
        return newTour;
    }catch(error){
        console.log('Error adding tour: ', error);
    }
}

export const getTour = async (id) =>{
    try{
        const tourDoc = doc(db, 'tours', id);
        const tourSnapshot = await getDoc(tourDoc);
        const tour = tourSnapshot.data();
        return tour;
    } catch(error){
        console.log('Error getting tour: ', error);
    }
}

export const updateTour = async( id, tour ) =>{
    try{
        const tourDoc = doc(db, 'tours', id);
        await updateDoc(tourDoc, tour);
    } catch(error){
        console.log('Error updating tour: ', error);
    }
}

export const deleteTour = async (id) =>{
    try{
        const tourDoc = doc(db, 'tours', id);
        await deleteDoc(tourDoc);
    } catch(error){
        console.log('Error deleting tour: ', error);
    }
}

export const getTours = async (startAtDoc = null, direction = "forward") => {
    try {
      const toursCollection = collection(db, "tours");
      let toursQuery;

      if (direction === "forward") {
        toursQuery = startAtDoc
          ? query(toursCollection, startAfter(startAtDoc), limit(20))
          : query(toursCollection, limit(20));
      } else if (direction === "backward") {
        toursQuery = startAtDoc
          ? query(toursCollection, endBefore(startAtDoc), limit(20))
          : query(toursCollection, limit(20));
      }

      const toursSnapshot = await getDocs(toursQuery);

      if (toursSnapshot.empty) {
        return { toursList: [], lastVisible: null }; // Return empty users and no lastVisible if none are found
      }

      const toursList = toursSnapshot.docs.map(doc => doc.data());
      const lastVisible = toursSnapshot.docs[toursSnapshot.docs.length - 1]; // For pagination

      return { toursList, lastVisible };
    } catch (error) {
      console.error("Error getting tours: ", error);
      return { toursList: [], lastVisible: null }; // Return empty structure on error
    }
};
