import { PaginationProps } from "../types/pagination";

const getInitPage = async ({ ref, limit, sort }: PaginationProps) => {
   return await ref!.orderBy("isoDate", sort).limit(limit).get();
};

const getNextPage = async ({ ref, last, limit, sort }: PaginationProps) => {
   return await ref!
      .orderBy("isoDate", sort)
      .startAfter(last)
      .limit(limit)
      .get();
};

const getPrevPage = async ({ ref, first, limit, sort }: PaginationProps) => {
   return await ref!
      .orderBy("isoDate", sort)
      .endBefore(first)
      .limitToLast(limit)
      .get();
};

const getPage = async ({
   ref,
   limit,
   first,
   last,
   sort,
}: PaginationProps): Promise<
   FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
> => {
   if (last) return await getNextPage({ ref, last, limit, sort });
   if (first) return await getPrevPage({ ref, first, limit, sort });
   return await getInitPage({ ref, limit, sort });
};

export const getPaginatedData = async ({
   ref,
   last,
   first,
   limit,
   page,
   sort,
}: PaginationProps) => {
   const count = (await ref!.count().get()).data().count;
   const pages = Math.ceil(count / limit);
   if (!page || page < 1) page = 1;
   if (page > count) page = count;
   const pageSnapshot = await getPage({ ref, limit, first, last, sort });
   const items = pageSnapshot.docs.map((item) => item.data());
   return { items, count, page, pages };
};
