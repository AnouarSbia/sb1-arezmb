import type { MiddlewareResponseHandler } from 'astro';
import { isAuthenticated } from '../utils/auth';

export const authMiddleware: MiddlewareResponseHandler = async ({ request }, next) => {
  const url = new URL(request.url);
  const adminPaths = ['/admin', '/api/admin'];
  const isAdminRoute = adminPaths.some(path => url.pathname.startsWith(path));
  const isLoginPage = url.pathname === '/admin/login';

  if (!isAdminRoute || isLoginPage) {
    return await next();
  }

  if (!await isAuthenticated(request)) {
    return Response.redirect(new URL('/admin/login', request.url));
  }

  return await next();
};