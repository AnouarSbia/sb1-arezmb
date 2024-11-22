import type { APIRoute } from 'astro';
import { db } from '../../../../../db/client';
import { isAuthenticated } from '../../../../../utils/auth';

export const POST: APIRoute = async ({ request, params }) => {
  if (!await isAuthenticated(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    await db.execute({
      sql: 'DELETE FROM products WHERE id = ?',
      args: [params.id]
    });

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/admin/products'
      }
    });
  } catch (error) {
    console.error('Delete product error:', error);
    return new Response('Error deleting product', { status: 500 });
  }
};