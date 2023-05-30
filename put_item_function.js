// Importar o SDK da AWS
var AWS = require('aws-sdk');

// Criar uma instância do cliente do DynamoDB
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Exportar a função handler
exports.handler = async (event) => {
    
    // Inicializar variáveis
    let responseBody = "";
    let statusCode = 0;
    
    // Extrair as propriedades 'id' e 'price' do corpo da solicitação
    let {id, price} = JSON.parse(event.body);
    
    // Criar objeto 'params' com os detalhes da inserção no DynamoDB
    const params = {
      TableName : 'Items',
      /* As propriedades do item dependem das necessidades da sua aplicação */
      Item: {
         id: id,
         price: price
      }
    }
    
    try {
        // Executar a operação de inserção no DynamoDB
        await dynamodb.put(params).promise();
        statusCode = 200;
        responseBody = JSON.stringify('Item inserido com sucesso!');
    } catch (err) {
        // Lidar com erros, caso ocorram
        statusCode = 200;
        responseBody = JSON.stringify(err);
    }
      
    // Criar objeto de resposta com o código de status e corpo da resposta
    const response = {
        statusCode: statusCode,
        body: responseBody,
    };
    
    // Retornar a resposta
    return response;
};
