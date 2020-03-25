const db = require('../models/index.js');
const ServerResponse = require('../helpers/ServerResponse.js');

class SistemaController {

    static async info(request, response) {
        try {
            const uf = request.params.uf;
            if (uf) {
                const info = await db.sistema.findOne({ where: { uf: uf }, attributes: ['autorizado', 'base_url', 'lat', 'lon', 'zoom'],});
                if (info) {
                    if (info.autorizado == true) {
                        ServerResponse.success(response, 'Usuário cadastrado.', [info]);   
                        return;
                    }            
                }
                ServerResponse.error(response, `Sua Unidade da Federação (${uf}) ainda não está credenciada para utilizar este sistema.`);
            }
            else {
                ServerResponse.error(response, 'Acesso negado.');
            }
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro de conexão com o servidor. Tente novamente em instantes.');
        }
    }
}

module.exports = SistemaController;
