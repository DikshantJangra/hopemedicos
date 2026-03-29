import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  QueryConstraint,
  DocumentData,
  CollectionReference
} from 'firebase/firestore';
import { db } from './firebase';

// Generic fetch all documents from a collection
export async function fetchCollection(collectionName: string) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    throw error;
  }
}

// Fetch a single document by ID
export async function fetchDocument(collectionName: string, docId: string) {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching document ${docId}:`, error);
    throw error;
  }
}

// Fetch documents with query constraints
export async function fetchWithQuery(
  collectionName: string, 
  constraints: QueryConstraint[]
) {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error fetching with query:`, error);
    throw error;
  }
}

// Add a new document
export async function addDocument(collectionName: string, data: DocumentData) {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document:`, error);
    throw error;
  }
}

// Update a document
export async function updateDocument(
  collectionName: string, 
  docId: string, 
  data: Partial<DocumentData>
) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error(`Error updating document ${docId}:`, error);
    throw error;
  }
}

// Delete a document
export async function deleteDocument(collectionName: string, docId: string) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting document ${docId}:`, error);
    throw error;
  }
}

// Search documents (basic text search)
export async function searchDocuments(
  collectionName: string,
  field: string,
  searchTerm: string
) {
  try {
    const q = query(
      collection(db, collectionName),
      where(field, '>=', searchTerm),
      where(field, '<=', searchTerm + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error searching documents:`, error);
    throw error;
  }
}
