<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && auth()->user()->admin) {
            return $next($request);
        }

        // Verifica si ya estamos en la ruta '/'
        if ($request->is('/')) {
            // Si ya estamos en la ruta '/', simplemente deja pasar la solicitud sin redireccionar
            return $next($request);
        }

        // Si el usuario no está autenticado o no es un administrador, redirige a '/'
        return redirect('/');
    }
}
