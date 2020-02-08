// Note this object is purely in memory
const users = {};

const respondJSON = (request, response, status, object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

const respondXML = (request, response, status, string, id) => {
    const headers = {
        'Content-Type': 'text/xml',
    };

    response.writeHead(status, headers);
    if(id){
        response.write(`<response><message>${string}</message><id>${id}</id></response>`);
    }else{
        response.write(`<response><message>${string}</message></response>`);
    }
    response.end();
}

const getSuccess = (request, response, header, queryParams) => {
    if(header === 'application/json'){
        const responseJSON = {
            message: "This is a successful response."
        };
        return respondJSON(request, response, 200, responseJSON);
    } else if (header === 'text/xml') {
        const responseXML = 'This is a successful response.'
        return respondXML(request, response, 200, responseXML);
    }
};

const getBadRequest = (request, response, header, queryParams) => {
    if(header === 'application/json'){
        if(queryParams.valid && queryParams.valid === 'true'){
            const responseJSON = {
                id: "badRequest",
                message: "This is a successful response."
            };
            return respondJSON(request, response, 200, responseJSON);
        } else {
            const responseJSON = {
                id: "badRequest",
                message: "Missing valid query parameter set to true."
            };
            return respondJSON(request, response, 400, responseJSON);
        }
    } else if (header === 'text/xml') {
        if(queryParams.valid && queryParams.valid === 'true'){
            const responseXML = 'This is a sucessful response.';
            return respondXML(request, response, 200, responseXML, "badRequest");
        } else {
            const responseXML = "Missing valid query parameter set to true.";
            return respondXML(request, response, 400, responseXML, "badRequest");
        }
    }
};

const getUnauthorized = (request, response, header, queryParams) => {
    if(header === 'application/json'){
        if(queryParams.loggedIn && queryParams.loggedIn === 'yes'){
            const responseJSON = {
                id: "unauthorized",
                message: "This is a successful response."
            };
            return respondJSON(request, response, 200, responseJSON);
        } else {
            const responseJSON = {
                id: "unauthorized",
                message: "Missing loggedIn query parameter set to yes."
            };
            return respondJSON(request, response, 401, responseJSON);
        }
    } else if (header === 'text/xml') {
        if(queryParams.loggedIn && queryParams.loggedIn === 'yes'){
            const responseXML = 'This is a sucessful response.';
            return respondXML(request, response, 200, responseXML, "unauthorized");
        } else {
            const responseXML = "Missing loggedIn query parameter set to yes.";
            return respondXML(request, response, 401, responseXML, "unauthorized");
        }
    }
};

const getForbidden = (request, response, header, queryParams) => {
    if(header === 'application/json'){
        const responseJSON = {
            id: "forbidden",
            message: "You do not have access to this content."
        };
        return respondJSON(request, response, 403, responseJSON);
    } else if (header === 'text/xml') {
        const responseXML = 'You do not have access to this content.'
        return respondXML(request, response, 403, responseXML, "forbidden");
    }
};

const getInternal = (request, response, header, queryParams) => {
    if(header === 'application/json'){
        const responseJSON = {
            id: "internalError",
            message: "Internal Server Error. Something went wrong."
        };
        return respondJSON(request, response, 500, responseJSON);
    } else if (header === 'text/xml') {
        const responseXML = 'Internal Server Error. Something went wrong.'
        return respondXML(request, response, 500, responseXML, "internalError");
    }
};

const getNotImplemented = (request, response, header, queryParams) => {
    if(header === 'application/json'){
        const responseJSON = {
            id: "notImplemented",
            message: "A get request for this page has not been implemented yet. Check again later for updated content."
        };
        return respondJSON(request, response, 501, responseJSON);
    } else if (header === 'text/xml') {
        const responseXML = 'A get request for this page has not been implemented yet. Check again later for updated content.'
        return respondXML(request, response, 501, responseXML, "notImplemented");
    }
};

const getNotFound = (request, response, header, queryParams) => {
    console.log(header);
    if(header === 'application/json'){
        const responseJSON = {
            id: "notFound",
            message: "The page you were looking for was not found."
        };
        return respondJSON(request, response, 404, responseJSON);
    } else if (header === 'text/xml') {
        const responseXML = 'The page you were looking for was not found.'
        return respondXML(request, response, 404, responseXML, "notFound");
    }
};

module.exports = {
    getSuccess,
    getBadRequest,
    getUnauthorized,
    getForbidden,
    getInternal,
    getNotImplemented,
    getNotFound,
};
