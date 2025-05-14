'use strict';

/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
    async modify(ctx) {
        try {
          const { documentId } = ctx.params;
      
          const post = await strapi.db.query('api::post.post').findOne({ where: { documentId }, populate: ['author', 'comments'] });
          if (!post) {
            return ctx.notFound('Post non trouvé');
          }
      
          if (!post.author || post.author.id !== ctx.state.user.id) {
            return ctx.unauthorized("Vous n’êtes pas l’auteur de ce post");
          }
      
          const updated = await strapi.entityService.update(
            'api::post.post',
            post.id,
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
        console.log("ici", ctx.params);
        const { documentId } = ctx.params;
    
        const post = await strapi.db.query('api::post.post').findOne({ where: { documentId }, populate: ['author', 'comments', ] });
        
        if (!post) {
          return ctx.notFound('Post non trouvé');
        }
    
        if (!post.author || post.author.id !== ctx.state.user.id) {
          return ctx.unauthorized("Vous n’êtes pas l’auteur de ce post");
        }
    
        const deleted = await strapi.entityService.delete('api::post.post', post.id);
    
        return ctx.send({ data: deleted });
      } catch (error) {
        ctx.status = 500;
        return ctx.send({ error: error.message });
      }
    },  
    async create(ctx) {
      try {
        const { title, username, media, profil_pictures, description, sub } = ctx.request.body;
    
        const created = await strapi.entityService.create('api::post.post', {
          data: {
            title,
            username,
            media,
            profil_pictures,
            description,
            author: ctx.state.user.id,
            sub: sub,
            publishedAt: new Date().toISOString(),
          },
          populate: ['author', 'comments', 'sub'],
        });
    
        if (!created) {
          return ctx.notFound('Problème lors de la création du post');
        }
        return ctx.send({ data: created });
      } catch (error) {
        ctx.status = 500;
        return ctx.send({ error: error.message });
      }
    },
    async findone(ctx) {
      try {
        const { documentId } = ctx.params;
    
        if (!documentId) {
          return ctx.badRequest('Le paramètre documentId est requis');
        }
    
          const post = await strapi.db
    .query('api::post.post')
    .findOne({
      where: { documentId },
      populate: ['author', 'media'],
    })
        if (!post) {
          return ctx.notFound('Post non trouvé');
        }
    
        return ctx.send({ data: post });
      } catch (error) {
        ctx.status = 500;
        return ctx.send({ error: error.message });
      }
    }
}));