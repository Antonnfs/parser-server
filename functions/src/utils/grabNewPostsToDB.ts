import * as Parser from "rss-parser";
import { FeedItem, FeedProps } from "../types/feed";
import { COLLECTIONS } from "../constants";
import { db } from "..";

export const grabNewPostsToDB = async () => {
   const parser: Parser<FeedProps, FeedItem> = new Parser();
   const postsSnap = db.collection(COLLECTIONS.POSTS);
   const feed = await parser.parseURL("https://lifehacker.com/rss");
   const docsSnap = await postsSnap.get();
   const docsIds = docsSnap.docs.map((doc) => doc.id);
   feed.items.forEach((item) => {
      if (!docsIds.includes(item.guid)) {
         postsSnap.doc(item.guid).set(item);
      }
   });
};
