import {find, filter} from 'lodash';

import {getDives} from './divelog-api-connector';

const authors = [
  {id: 1, name: 'Johan van Boven'},
  {id: 2, name: 'Anne-Fleur Pel'},
];

const resolveFunctions = {
  Query: {
    authors() {
      return authors;
    },
    articles() {
      return getArticles();
    }
  },
  Mutation: {
    // upvotePost(_, {postId}) {
    //   const post = find(posts, {id: postId});
    //   if (!post) {
    //     throw new Error(`Couldn't find post with id ${postId}`);
    //   }
    //   post.votes += 1;
    //   return post;
    // },
  },
  Author: {
    articles(author) {
      return getArticles().then((data) => {
        return filter(data, {author: author.name});
      });
    },
  },
};

export default resolveFunctions;