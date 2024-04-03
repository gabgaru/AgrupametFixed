import { db } from './firebase';
class FirestoreService {
    constructor() {
        if (!FirestoreService.instance) {
            this.db = db;
            FirestoreService.instance = this;
        }
        return FirestoreService.instance;
    }
}

const firestoreService = new FirestoreService();
export default firestoreService;