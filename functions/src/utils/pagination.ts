import { PaginationProps } from "../types/pagination";

const getInitPage = async ({ ref, limit }: PaginationProps) => {
   return await ref!.orderBy("isoDate", "desc").limit(limit).get();
};

const getNextPage = async ({ ref, last, limit }: PaginationProps) => {
   return await ref!
      .orderBy("isoDate", "desc")
      .startAfter(last)
      .limit(limit)
      .get();
};

const getPrevPage = async ({ ref, first, limit }: PaginationProps) => {
   return await ref!
      .orderBy("isoDate", "desc")
      .endBefore(first)
      .limitToLast(limit)
      .get();
};

const getPage = async ({
   ref,
   limit,
   first,
   last,
}: PaginationProps): Promise<
   FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
> => {
   if (last) return await getNextPage({ ref, last, limit });
   if (first) return await getPrevPage({ ref, first, limit });
   return await getInitPage({ ref, limit });
};

export const getPaginatedData = async ({
   ref,
   last,
   first,
   limit,
   page,
}: PaginationProps) => {
   const count = (await ref!.count().get()).data().count;
   const pages = Math.ceil(count / limit);
   if (!page || page < 1) page = 1;
   if (page > count) page = count;
   const pageSnapshot = await getPage({ ref, limit, first, last });
   const items = pageSnapshot.docs.map((item) => item.data());
   return { items, count, page, pages };
};
