import type { APIRoute } from 'astro';
import { db } from '../../../../db/client';
import { isAuthenticated } from '../../../../utils/auth';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1),
  image: z.string().url()
});

export const POST: APIRoute = async ({ request }) => {
  if (!await isAuthenticated(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const formData = await request.formData();
    const data = {
      name: formData.get('name'),
      image: formData.get('image')
    };

    const validated = categorySchema.parse(data);

    await db.execute({
      sql: 'INSERT INTO categories (name, image) VALUES (?, ?)',
      args: [validated.name, validated.image]
    });

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/admin/categories'
      }
    });
  } catch (error) {
    console.error('Create category error:', error);
    return new Response('Error creating category', { status: 500 });
  }
};