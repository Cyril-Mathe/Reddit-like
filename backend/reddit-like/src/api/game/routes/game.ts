import { factories } from '@strapi/strapi';

export default {
  routes: [
    // Route pour créer une partie
    {
      method: 'POST',
      path: '/games',
      handler: 'game.createGame',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    // Route pour rejoindre une partie
    {
      method: 'POST',
      path: '/games/join',
      handler: 'game.joinGame',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    // Route pour effectuer un coup
    {
      method: 'POST',
      path: '/games/move',
      handler: 'game.makeMove',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
