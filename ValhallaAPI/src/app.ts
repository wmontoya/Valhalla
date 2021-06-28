import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import { buildSchema } from "type-graphql"

import { UserResolver } from "./resolvers/user.resolver";
import { isAuthorizated } from "./middleware/is-authorizated";
import { PersonResolver } from './resolvers/person.resolver';
import { AccessResolver } from './resolvers/access.resolver';
import { RolResolver } from './resolvers/rol.resolver';
import { PermissionResolver } from './resolvers/permission.resolver';
import { OfferResolver } from './resolvers/offer.resolver';
import { ReviewsResolver } from './resolvers/reviews.resolver';
import { RatingResolver } from './resolvers/rating.resolver';
import { ContactsResolver } from './resolvers/contact.resolve';
import { BadguesResolver } from './resolvers/badges.resolver';
import { TypeBadguesResolver } from './resolvers/typebadgest.resolver';
import { TitleResolver } from './resolvers/titles.resolver';
import { TypeOfferResolver } from './resolvers/typeoffer.resolver';
import { ImageResolver } from './resolvers/image.resolver';
import { FriendResolver } from './resolvers/friend.resolver';

export async function startServer() {
    const app = express();
    var bodyParser = require('body-parser');
    app.use(bodyParser.json({ limit: '200mb' }));
    app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ContactsResolver,
                RatingResolver,
                UserResolver,
                PersonResolver,
                AccessResolver,
                RolResolver,
                PermissionResolver,
                OfferResolver,
                ReviewsResolver,
                BadguesResolver,
                TypeBadguesResolver,
                TitleResolver,
                TypeOfferResolver,
                ImageResolver,
                FriendResolver
            ],
            authChecker: isAuthorizated
        }),
        context: ({ req, res }) => ({ req, res }),

    });
    server.applyMiddleware({ app, path: '/valhalla_API' });
    return app;
}


