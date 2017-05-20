import {makeExecutableSchema} from 'graphql-tools';

import resolvers from './resolvers';

const schema = `
type Author {
  id: Int! # the ! means that every author object _must_ have an id
  name: String
  articles: [Article] # the list of Articles by this author
}

type Post {
  id: Int!
  title: String
  author: Author
  votes: Int
}

type Image {
  mobile_tab_photos: String
  mobile_top_stories: String
  high_res: String
  caption: String
}

type Article {
  id: Int!
  title: String
  author: String
  url: String
  comment_count: Int
  image: [Image]
}

# the schema allows the following query:
type Query {
  authors: [Author]
  posts: [Post]
  articles: [Article]
}

# this schema allows the following mutation:
type Mutation {
  upvotePost (
    postId: Int!
  ): Post
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});