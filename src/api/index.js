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

  get() {
    return this.id
      ? doc(db, this.relativePath(), this.id)
      : getDocs(collection(db, this.relativePath()));
  }

  createDoc() {
    return addDoc(collection(db, this.relativePath()), this.item);
  }

  updateDoc() {
    return updateDoc(doc(db, this.relativePath(), this.id), this.item);
  }

  delete() {
    return deleteDoc(doc(db, this.relativePath(), this.id));
  }
}

export default ApiService;
