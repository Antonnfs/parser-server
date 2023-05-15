export interface FeedItem {
   creator: string;
   title: string;
   pubDate: string;
   content: string;
   contentSnippet: string;
   guid: string;
   categories: string[];
   isoDate: string;
}
export interface FeedProps {
   items: FeedItem[];
   feedUrl: string;
   title: string;
   description: string;
   link: string;
   language: string;
}
