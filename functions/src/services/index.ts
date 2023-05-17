import { db } from "..";
import { FeedItem } from "../types/feed";
import { COLLECTIONS } from "../constants";
import { getPaginatedData } from "../utils/pagination";
import { PaginationProps } from "../types/pagination";

const getPosts = async ({ last, first, limit, page }: PaginationProps) => {
   try {
      const ref = db.collection(COLLECTIONS.POSTS);
      return await getPaginatedData({ ref, last, first, limit, page });
   } catch (error) {
      throw error;
   }
};

const getPost = async (id: string) => {
   try {
      return (await db.collection(COLLECTIONS.POSTS).doc(id).get()).data();
   } catch (error) {
      throw error;
   }
};

const createPost = async (data: FeedItem) => {
   try {
      const guid = (Math.random() * 10000000000).toFixed(0);
      return await db
         .collection(COLLECTIONS.POSTS)
         .doc(guid)
         .set({ ...data, guid });
   } catch (error) {
      throw error;
   }
};

const updatePost = async (data: FeedItem) => {
   try {
      return await db
         .collection(COLLECTIONS.POSTS)
         .doc(data.guid)
         .update({ ...data });
   } catch (error) {
      throw error;
   }
};

const deletePost = async (id: string) => {
   try {
      return await db.collection(COLLECTIONS.POSTS).doc(id).delete();
   } catch (error) {
      throw error;
   }
};

export default { getPosts, getPost, createPost, updatePost, deletePost };
