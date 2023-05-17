export interface PaginationProps {
   ref?: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
   limit: number;
   last?: string;
   first?: string;
   page?: number;
}
