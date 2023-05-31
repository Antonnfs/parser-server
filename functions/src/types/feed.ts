export interface FeedItem {
   creator: string;
   title: string;
   content: string;
   contentSnippet: string;
   guid: string;
   categories: string[];
   isoDate: string;
   link: string;
   image: string;
}
export interface FeedProps {
   items: FeedItem[];
   feedUrl: string;
   title: string;
   description: string;
   link: string;
   language: string;
}
