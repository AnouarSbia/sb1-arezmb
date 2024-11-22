import type { APIRoute } from 'astro';
import { db } from '../../../../db/client';
import { isAuthenticated } from '../../../../utils/auth';
import { z } from 'zod';

const productSchema = z.object({
  title: z.string().min(1),
  category_id: z.string().min(1),
  price: z.string().min(1),
  image: z.string().url(),
  description: z.string().optional()
});

export const POST: APIRoute = async ({ request }) => {
  if (!await isAuthenticated(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const formData = await request.formData();
    const data = {
      title: formData.get('title'),
      category_id: formData.get('category_id'),
      price: formData.get('price'),
      image: formData.get('image'),
      description: formData.get('description')
    };

    const validated = productSchema.parse(data);

    await db.execute({
      sql: 'INSERT INTO products (title, category_id, price, image, description) VALUES (?, ?, ?, ?, ?)',
      args: [
        validated.title,
        validated.category_id,
        parseFloat(validated.price),
        validated.image,
        validated.description || null
      ]
    });

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/admin/products'
      }
    });
  } catch (error) {
    console.error('Create product error:', error);
    return new Response('Error creating product', { status: 500 });
  }
};