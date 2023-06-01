import * as Parser from "rss-parser";
import * as jsdom from "jsdom";
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
         const dom = new jsdom.JSDOM(`<!DOCTYPE html>${item.content}`);
         const image = dom.window.document.querySelector("img")?.src;
         const content = item.contentSnippet?.replace(
            new RegExp("Read more...", "g"),
            ""
         );
         const postData = {
            guid: item.guid,
            creator: item.creator,
            title: item.title,
            content,
            isoDate: item.isoDate,
            categories: item.categories,
            link: item.link,
            image,
         };
         postsSnap.doc(item.guid).set(postData);
      }
   });
};
