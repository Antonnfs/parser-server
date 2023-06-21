import { Request, Response } from "express";
import { FeedItem } from "../types/feed";
import Firestore from "../services/index";

export const getPosts = async (req: Request, res: Response) => {
   try {
      const last = req.query.last as string;
      const first = req.query.first as string;
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 1;
      const sort = (req.query.sort as "asc" | "desc") || "desc";
      const result = await Firestore.getPosts({
         last,
         first,
         limit,
         page,
         sort,
      });
      res.status(200).json(result);
   } catch (error) {
      res.status(400).json(error);
   }
};

export const getPost = async (req: Request, res: Response) => {
   try {
      const guid: string = req.query.guid as string;
      const result = await Firestore.getPost(guid);
      res.status(200).json(result);
   } catch (error) {
      res.status(400).json(error);
   }
};

export const createPost = async (req: Request, res: Response) => {
   try {
      const data: FeedItem = req.body;
      const result = await Firestore.createPost(data);
      res.status(200).send(result);
   } catch (error) {
      res.status(400).json(error);
   }
};

export const updatePost = async (req: Request, res: Response) => {
   try {
      const guid: string = req.params.id;
      const data: FeedItem = req.body;
      const result = await Firestore.updatePost({ ...data, guid });
      res.status(200).send(result);
   } catch (error) {
      res.status(400).json(error);
   }
};

export const deletePost = async (req: Request, res: Response) => {
   try {
      const guid: string = req.params.id;
      console.log(guid);
      const result = await Firestore.deletePost(guid);
      res.status(200).send(result);
   } catch (error) {
      res.status(400).json(error);
   }
};
