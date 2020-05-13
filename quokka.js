require('dotenv').config()

const shell = require('shelljs');

shell.exec(`Removing old certs and root store from ${process.env.CAROOT}/ directory...`);
shell.exec('mkcert -uninstall');
shell.exec('rimraf ssl/certs/*');

shell.echo('Updating root CA store location...')
shell.exec('mkcert -install');

shell.echo(`Creating new certificates for "localhost"...`);
shell.exec(`mkcert -key-file ${process.env.CAROOT}/localhost.key -cert-file $CAROOT/localhost.crt localhost "*.localhost.dev" 127.0.0.1 ::1`);