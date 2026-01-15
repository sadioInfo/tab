import { getFirestore } from "firebase/firestore";
import { app } from "./config";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Log pour vérifier la connexion
console.log("🔥 Firestore initialized for project:", app.options.projectId);

export { db };
