import { Request, Response } from "express";
import { VHL_Users } from "../entities/users";

export interface Context {
  req: Request;
  res: Response;
  user?: VHL_Users;
}