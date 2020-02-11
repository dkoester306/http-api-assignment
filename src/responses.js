const getResponse = (request, response, content, type, status) => {
    response.writeHead(status, { "Content-Type": type });
    response.write(content);
    response.end();
};

const getSuccess = (request, response, type) => {
    const successJSON = {
        message: "This is a successful response"
    };

    if (type[0] === "text/xml") {
        let responseXML = "<response>";
        responseXML = `${responseXML} <message>This is a successful response </message>`;
        responseXML = `${responseXML} </response>`;

        return getResponse(request, response, responseXML, "text/xml", 200);
    }

    const successString = JSON.stringify(successJSON);
    return getResponse(request, response, successString, "application/json", 200);
};

const badRequest = (request, response, type, params) => {
    const responseJSON = {
        message: "This request has the required parameters"
    };

    if (!params.valid || params.valid !== "true") {
        if (type[0] === "text/xml") {
            let responseXML = "<response>";
            responseXML = `${responseXML} <message>Missing valid query parameter set to true</message>`;
            responseXML = `${responseXML} <id>badRequest</id>`;
            responseXML = `${responseXML} </response>`;
            return getResponse(request, response, responseXML, "text/html", 400);
        }
        else{
            responseJSON.message = "Missing valid query parameter set to true";
            responseJSON.id = "badRequest";
            return getResponse(request, response, responseJSON, "application/json", 400); // BROKEN
        }
    }

    // need to think of a way to get rid of the repeated code
    if (type[0] === "text/xml") {
        let responseXML = "<response>";
        responseXML = `${responseXML} <message>This request has the required parameters</message>`;
        responseXML = `${responseXML} </response>`;

        return getResponse(request, response, responseXML, "text/xml", 200);
    }

    return getResponse(request, response, responseJSON, "application/json", 200);
};

module.exports = {
    getSuccess,
    badRequest
};