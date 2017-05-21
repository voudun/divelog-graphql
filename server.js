'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { printSchema } from 'graphql/utilities/schemaPrinter';

import schema from './data/schema';

const PORT = 3001;

let graphQLServer = express().use('*', cors());
const env = process.env.NODE_ENV;

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress ({
  schema: schema,
}));

if (env !== 'production') {
  graphQLServer.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));
}

graphQLServer.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(printSchema(schema));
});

graphQLServer.listen(PORT, () => console.log(
  `GraphQL Server is now running on https://localhost:${PORT}/graphql`
));
