class ServerResponse {

    static searchLimit = 12;

	static success(response, msg, data) {
        try {
            response.status(200).send({
                error: 0,
                msg: msg,
                data: data,
            });
        }
        catch (error) {
            console.log('error: ' + error);
        }
    }
    
    static error(response, msg) {
        try {
            response.status(200).send({
                error: 1,
                msg: msg,
                data: [],
            });
        }
        catch (error) {
            console.log('error: ' + error);
        }
    }

    static expiredConnection(response) {
        try {
            response.status(200).send({
                error: 2,
                msg: 'Conexão expirada.',
                data: [],
            });
        }
        catch (error) {
            console.log('error: ' + error);
        }
    }
    
    static rateLimit() {
        var limit = {
            error: 3,
            msg: 'Você atingiu o limite de solicitações. Tente novamente em alguns minutos.',
            data: [],
        };
        return limit;
    }

    static needUpdate(response) {
        try {
            response.status(200).send({
                error: 4,
                msg: 'Atualização necessária.',
                data: [],
            });
        }
        catch (error) {
            console.log('error: ' + error);
        }
    }
}

module.exports = ServerResponse;