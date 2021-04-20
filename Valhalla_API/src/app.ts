import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import { buildSchema } from "type-graphql"

import { UserResolver } from "./resolvers/user.resolver";
import { isAuthorizated } from "./middleware/is-authorizated";
import { PersonResolver } from './resolvers/person.resolver';
import { AccessResolver } from './resolvers/access.resolver';
import { RolResolver } from './resolvers/rol.resolver';
import { PermissionResolver } from './resolvers/permission.resolver';

export async function startServer() {
    const app = express();
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver,PersonResolver,AccessResolver,RolResolver,PermissionResolver],
            authChecker: isAuthorizated
        }),
        context: ({ req, res }) => ({ req, res }),

    });
    server.applyMiddleware({ app, path: '/valhalla_API' });
    return app;
}


