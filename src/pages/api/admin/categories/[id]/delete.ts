import type { APIRoute } from 'astro';
import { db } from '../../../../../db/client';
import { isAuthenticated } from '../../../../../utils/auth';

export const POST: APIRoute = async ({ request, params }) => {
  if (!await isAuthenticated(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    await db.execute({
      sql: 'DELETE FROM categories WHERE id = ?',
      args: [params.id]
    });

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/admin/categories'
      }
    });
  } catch (error) {
    console.error('Delete category error:', error);
    return new Response('Error deleting category', { status: 500 });
  }
};