
import { addDoc, collection, getFirestore } from "firebase/firestore"
import app from "@/firebaseconfig"

interface BudgetsItemInterface {
  name: string;
  price: string;
  description?: string;
  category?: string;
  date?: string;
  id?: string;
  // userId: string;
  // createdAt: string;
  // updatedAt: string;
}
const db = getFirestore(app);
const budgetsCollection = collection(db,"budgets");

export async function createBudget(budget: BudgetsItemInterface) {
  const dbData = {
    name: budget.name,
    price: budget.price,
    description: budget.description,
    category: budget.category,
    date: budget.date,
    id: budget.id,
  }
  return await addDoc(budgetsCollection, dbData)
}
