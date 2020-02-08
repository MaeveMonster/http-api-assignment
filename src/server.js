const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const apiHandler = require('./apiHandler.js');
const query = require('querystring');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    GET: {
        '/': htmlHandler.getIndex,
        '/style.css': htmlHandler.getCSS,
        '/success': apiHandler.getSuccess,
        '/badRequest': apiHandler.getBadRequest,
        '/unauthorized': apiHandler.getUnauthorized,
        '/forbidden': apiHandler.getForbidden,
        '/internal': apiHandler.getInternal,
        '/notImplemented': apiHandler.getNotImplemented,
        notFound: apiHandler.getNotFound,
    }
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);

    if (urlStruct[request.method][parsedUrl.pathname]) {
        if(!request.headers.accept || (request.headers.accept.split(',')[0] !== 'application/json' && request.headers.accept.split(',')[0] !== 'text/xml')){
            urlStruct[request.method][parsedUrl.pathname](request, response, 'application/json', query.parse(parsedUrl.query));
        } else {
            urlStruct[request.method][parsedUrl.pathname](request, response, request.headers.accept.split(',')[0], query.parse(parsedUrl.query));
        }
    } else {
        if(!request.headers.accept || (request.headers.accept.split(',')[0] !== 'application/json' && request.headers.accept.split(',')[0] !== 'text/xml')){
            urlStruct[request.method].notFound(request, response, 'application/json', query.parse(parsedUrl.query));
        } else {
            urlStruct[request.method].notFound(request, response, request.headers.accept.split(',')[0], query.parse(parsedUrl.query));
        }
    }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);