import { Request, Response } from "express";
import { FeedItem } from "../types/feed";
import Firestore from "../services/index";

export const getPosts = async (req: Request, res: Response) => {
   try {
      const last =
         typeof req.query.last === "string" ? req.query.last : undefined;
      const first =
         typeof req.query.first === "string" ? req.query.first : undefined;
      const limit =
         typeof req.query.limit === "string" ? parseInt(req.query.limit) : 10;
      const page =
         typeof req.query.page === "string" ? parseInt(req.query.page) : 1;
      const result = await Firestore.getPosts({ last, first, limit, page });
      res.status(200).json(result);
   } catch (error) {
      res.status(400).json(error);
   }
};

export const getPost = async (req: Request, res: Response) => {
   try {
      const guid: string = req.params.id;
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
