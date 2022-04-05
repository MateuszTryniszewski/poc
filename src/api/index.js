import { db } from '@/firebase';
import {
  collection, getDocs, addDoc, updateDoc, doc, deleteDoc,
} from 'firebase/firestore';
import store from '../store';

class ApiService {
  constructor(entity, id = null, item) {
    this.entity = entity;
    this.id = id;
    this.item = item;
    this.user = store?.getters?.currentUser?.uid;
  }

  relativePath() {
    return `${this.entity}/${this.user}/docs`;
  }

  getCollection() {
    return collection(db, this.relativePath());
  }

  get(id) {
    return id ? doc(db, this.relativePath(), id) : getDocs(collection(db, this.relativePath()));
  }

  createDoc() {
    return addDoc(collection(db, this.relativePath()), this.item);
  }

  updateDoc(id, item) {
    return updateDoc(doc(db, this.relativePath(), id), item);
  }

  delete(id) {
    return deleteDoc(doc(db, this.relativePath(), id));
  }
}

export default ApiService;
