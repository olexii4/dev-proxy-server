/*
 * Copyright (c) 2021 Oleksii Orel
 * This program is made available under the terms of the MIT License
 * which is available at https://opensource.org/licenses/MIT/
 *
 * SPDX short identifier: MIT
 */

import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import { createProxyServer, ServerOptions } from 'http-proxy';
import { PUBLIC_CRT_PATH, SS_CRT_PATH } from './che-server-const';

function getCertificateAuthority(): Buffer[] | undefined {
  const certificateAuthority: Buffer[] = [];
  if (fs.existsSync(SS_CRT_PATH)) {
    certificateAuthority.push(fs.readFileSync(SS_CRT_PATH));
  }
  if (fs.existsSync(PUBLIC_CRT_PATH)) {
    const publicCertificates = fs.readdirSync(PUBLIC_CRT_PATH);
    for (const publicCertificate of publicCertificates) {
      if (publicCertificate.endsWith('.crt')) {
        const certPath = path.join(PUBLIC_CRT_PATH, publicCertificate);
        certificateAuthority.push(fs.readFileSync(certPath));
      }
    }
  }
  return certificateAuthority.length > 0 ? certificateAuthority : undefined;
}

const ca = getCertificateAuthority();

const proxy = createProxyServer({ target: { ca } } as ServerOptions);
// const proxy = httpProxy.createProxyServer({ secure: false });
proxy.on('error', (err: Error) => {
  console.log('Proxy server error: \n', err);
});

const app = express();
app.all('/api/*', (req, res) => {
  const options = {
    target: 'https://che-eclipse-che.192.168.49.2.nip.io/',
  };
  proxy.web(req, res, options);
});
app.use(err => {
  console.log('App server error: \n', err);
});
app.listen(3000, () => {
  console.log('listening on port ' + 3000);
});
