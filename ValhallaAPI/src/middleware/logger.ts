import { MiddlewareFn } from "type-graphql";

import { Context } from "../interfaces/context.interface";

export const logger: MiddlewareFn<Context> = async ({ args }, next) => {
  return next();
};