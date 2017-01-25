vcl 4.0;

# VCL for mimicking Acquia hosting environments.

backend default {
   .host = "{{ varnish_default_backend_host }}";
   .port = "{{ varnish_default_backend_port }}";
   .first_byte_timeout = 2s;
}

sub vcl_recv {
  if (req.http.X-Forwarded-For) {
    set req.http.X-Forwarded-For = req.http.X-Forwarded-For + ", " + client.ip;
  } else {
    set req.http.X-Forwarded-For = client.ip;
  }
  if (req.method != "GET" && req.method != "HEAD") {
    return(pass);
  }
  if(req.url ~ "^/cron.php") {
    return(pass);
  }
  if(req.url ~ "^/xmlrpc.php") {
    return(pass);
  }
  if (req.http.Authorization) {
    return(pass);
  }
  if(req.http.cookie ~ "(^|;\s*)(SESS=)") {
    return(pass);
  }
  return(hash);
}
