'use strict';

/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
    async modify(ctx) {
        try {
          const { id } = ctx.params;
      
          const post = await strapi.entityService.findOne('api::post.post', id, {
            populate: ['author'],
          }) as any;
          if (!post) {
            return ctx.notFound('Post non trouvé');
          }
      
          if (!post.author || post.author.id !== ctx.state.user.id) {
            return ctx.unauthorized("Vous n’êtes pas l’auteur de ce post");
          }
      
          const updated = await strapi.entityService.update(
            'api::post.post',
            id,
            {
              data: {
                ...ctx.request.body,
                publishedAt: new Date().toISOString(),
              },
            }
          );
      
          return ctx.send({ data: updated });
        } catch (error) {
          ctx.status = 500;
          return ctx.send({ error: error.message });
        }
      },
      async delete(ctx) {
        try {
          const { id } = ctx.params;
      
          const post = await strapi.entityService.findOne('api::post.post', id, {
            populate: ['author'],
          }) as any;
      
          if (!post) {
            return ctx.notFound('Post non trouvé');
          }
      
          if (!post.author || post.author.id !== ctx.state.user.id) {
            return ctx.unauthorized("Vous n’êtes pas l’auteur de ce post");
          }
      
          const deleted = await strapi.entityService.delete('api::post.post', id);
      
          return ctx.send({ data: deleted });
        } catch (error) {
          ctx.status = 500;
          return ctx.send({ error: error.message });
        }
      },  
      async create(ctx) {
        try {
          const { title, username, media, profile_pictures, description } = ctx.request.body;
      
          const created = await strapi.entityService.create('api::post.post', {
            data: {
              title,
              username,
              media,
              profile_pictures,
              description,
              author: ctx.state.user.id,
              publishedAt: new Date().toISOString(),
            },
            populate: ['author'],
          });
      
          if (!created) {
            return ctx.notFound('Problème lors de la création du post');
          }
          return ctx.send({ data: created });
        } catch (error) {
          ctx.status = 500;
          return ctx.send({ error: error.message });
        }
      }  
}));