import { PaginationProps } from "../types/pagination";

const getInitPage = async ({ ref, limit }: PaginationProps) => {
   try {
      return await ref!.orderBy("isoDate", "desc").limit(limit).get();
   } catch (error) {
      throw error;
   }
};

const getNextPage = async ({ ref, last, limit }: PaginationProps) => {
   try {
      return await ref!
         .orderBy("isoDate", "desc")
         .startAfter(last)
         .limit(limit)
         .get();
   } catch (error) {
      throw error;
   }
};

const getPrevPage = async ({ ref, first, limit }: PaginationProps) => {
   try {
      return await ref!
         .orderBy("isoDate", "desc")
         .endBefore(first)
         .limitToLast(limit)
         .get();
   } catch (error) {
      throw error;
   }
};

const getPage = async ({
   ref,
   limit,
   first,
   last,
}: PaginationProps): Promise<
   FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
> => {
   try {
      if (last) return await getNextPage({ ref, last, limit });
      if (first) return await getPrevPage({ ref, first, limit });
      return await getInitPage({ ref, limit });
   } catch (error) {
      throw error;
   }
};

export const getPaginatedData = async ({
   ref,
   last,
   first,
   limit,
   page,
}: PaginationProps) => {
   try {
      const count = (await ref!.count().get()).data().count;
      const pages = Math.ceil(count / limit);
      if (!page || page < 1) page = 1;
      if (page > count) page = count;
      const pageSnapshot = await getPage({ ref, limit, first, last });
      const items = pageSnapshot.docs.map((item) => item.data());
      return { items, count, page, pages };
   } catch (error) {
      throw error;
   }
};
