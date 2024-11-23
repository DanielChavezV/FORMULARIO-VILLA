import { openDB } from 'idb';

const dbName = 'investmentsDB';
const storeName = 'investments';

const db = await openDB(dbName, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
    }
  },
});

export interface Investment {
  id?: number;
  investmentType: string;
  investmentName: string;
  amount: string;
  bankType: string;
  interestRate: string;
  returnDate: string;
  description: string;
  portfolio: string;
  createdAt?: Date;
}

export const saveInvestment = async (investment: Investment): Promise<number> => {
  const investmentWithDate = {
    ...investment,
    createdAt: new Date()
  };
  
  const id = await db.add(storeName, investmentWithDate);
  return id;
};

export const getAllInvestments = async (): Promise<Investment[]> => {
  return db.getAll(storeName);
};

export default db;