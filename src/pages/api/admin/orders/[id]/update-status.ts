import type { APIRoute } from 'astro';
import { db } from '../../../../../db/client';
import { isAuthenticated } from '../../../../../utils/auth';
import { z } from 'zod';

const statusSchema = z.object({
  status: z.enum(['pending', 'processing', 'completed', 'cancelled'])
});

export const POST: APIRoute = async ({ request, params }) => {
  if (!await isAuthenticated(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const formData = await request.formData();
    const data = {
      status: formData.get('status')
    };

    const validated = statusSchema.parse(data);

    await db.execute({
      sql: 'UPDATE orders SET status = ? WHERE id = ?',
      args: [validated.status, params.id]
    });

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/admin/orders'
      }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    return new Response('Error updating order status', { status: 500 });
  }
};