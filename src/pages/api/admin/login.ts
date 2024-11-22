import type { APIRoute } from 'astro';
import { db } from '../../../db/client';
import { createToken, verifyPassword } from '../../../utils/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    const validated = loginSchema.parse(data);

    const result = await db.execute({
      sql: 'SELECT * FROM admins WHERE email = ?',
      args: [validated.email]
    });

    const admin = result.rows[0];
    if (!admin) {
      return new Response('Invalid credentials', { status: 401 });
    }

    const validPassword = await verifyPassword(
      validated.password,
      admin.password as string
    );

    if (!validPassword) {
      return new Response('Invalid credentials', { status: 401 });
    }

    const token = await createToken(admin.id as number);

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/admin',
        'Set-Cookie': `admin_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response('Invalid request', { status: 400 });
  }
}