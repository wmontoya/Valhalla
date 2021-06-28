import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Context } from "../interfaces/context.interface"; 
import  enviroment   from "../config/enviroments.config";
import { VHL_Users } from "../entities/users"; 

export const isAuthenticated: MiddlewareFn<Context> = ({ context }, next) => {

  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authenticated"+ authorization);
  }
  if (authorization.indexOf("bearer ",0) < 0) {
    throw new Error("Not authenticated"+authorization);
  }
  try { 
    const token = authorization.replace("bearer ",""); 
    const payload = verify(token, enviroment.jwtSecretKey ?? ''); 
    context.user = payload as VHL_Users;
  } catch (err) {
    throw new Error("Not authenticated");
  }
  return next();
};