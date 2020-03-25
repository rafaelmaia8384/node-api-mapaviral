const express = require('express');
const rateLimit = require("express-rate-limit");
const app = express();
const fs = require('fs');
const https = require('https');
const port = process.env.PORT || 443;
const router = require('./routes/index.js');

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100, // 100 solicitacoes por minuto
});

const key  = fs.readFileSync('https/selfsigned.key', 'utf8');
const cert = fs.readFileSync('https/selfsigned.crt', 'utf8');
const options = { key: key, cert: cert };
  
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/data', express.static('data'));

router(app);

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log("App listening on port: " + port);
});

//Editar os termos de uso
//Criar icone do app