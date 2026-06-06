revoke all on function public.handle_new_user() from public;
grant execute on function public.handle_new_user() to postgres, service_role;
