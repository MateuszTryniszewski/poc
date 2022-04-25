import { db } from '@/firebase';
import {
  collection, getDocs, addDoc, updateDoc, doc, deleteDoc,
  query, where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

class ApiService {
  constructor(entity, id = null, item) {
    this.entity = entity;
    this.id = id;
    this.item = item;
    // eslint-disable-next-line no-underscore-dangle
    this.user = auth._currentUser?.uid;
  }

  relativeUserPath() {
    return `${this.entity}/${this.user}/docs`;
  }

  getCollection() {
    return collection(db, this.relativeUserPath());
  }

  get() {
    return this.id
      ? doc(db, this.relativeUserPath(), this.id)
      : getDocs(collection(db, this.relativeUserPath()));
  }

  createDoc() {
    return addDoc(collection(db, this.relativeUserPath()), this.item);
  }

  updateDoc() {
    return updateDoc(doc(db, this.relativeUserPath(), this.id), this.item);
  }

  delete() {
    return deleteDoc(doc(db, this.relativeUserPath(), this.id));
  }
  // ==============

  async getCategories() {
    const q = query(collection(db, this.entity), where('uid', 'in', [this.user, 'global']));
    // const querySnapshot = await getDocs(q);
    return q; // querySnapshot;
  }

  createDoc2() {
    return addDoc(collection(db, this.entity), this.item);
  }

  updateDoc2() {
    return updateDoc(doc(db, this.entity, this.id), this.item);
  }

  delete2() {
    return deleteDoc(doc(db, this.entity, this.id));
  }
}

export default ApiService;
