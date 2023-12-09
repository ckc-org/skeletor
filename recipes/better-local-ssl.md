# better local ssl

If you setup SSL this way, you won't get nags about "trusting" self signed certs, things "just work!"

## install [mkcert](https://github.com/FiloSottile/mkcert#installation)

For Mac, if you haven't done this yest:

```bash
# Install mkcert
$ brew install mkcert

# Setup trust for mkcert
$ mkcert -install
```


## make certs

Assuming we're doing this for `local.domain.com`...

```
# Make local self signed certs that trust our local authority
$ mkdir -p volumes/ssl
$ mkcert -cert-file volumes/ssl/cert.pem -key-file volumes/ssl/key.pem local.domain.com 
```

you just made `cert.pem` and `key.pem` in the `volumes/ssl` directory.

## make django use SSL

Modify `docker-compose.yml`:

1. **command** to reference the previous output
2. **volume** in the folder so it can be seen

```yaml
command: uvicorn ... --ssl-keyfile /ssl/key.pem --ssl-certfile /ssl/cert.pem
volumes:
  ...
  - ./volumes/ssl:/ssl
```

## add the domain to `/etc/hosts`

add localhost `/etc/hosts` entry for `local.domain.com`
```
127.0.0.1	local.domain.com
```
