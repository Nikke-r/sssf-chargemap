import https from 'https';
import http from 'http';
import fs from 'fs';

const sslkey = fs.readFileSync('../ssl-key.pem');
const sslcert = fs.readFileSync('../ssl-cert.pem');

const options = {
    key: sslkey,
    cert: sslcert
};

const httpRedirect = (req, res) => {
    res.writeHead(301, { 'Location': `https://localhost:8000${req.url}` });
    res.end();
};

export default (app, httpsPort, httpPort) => {
    https.createServer(options, app).listen(httpsPort);
    http.createServer(httpRedirect).listen(httpPort);
};