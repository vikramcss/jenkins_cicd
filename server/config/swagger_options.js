exports.options = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
        info: {
            title:  'Excise APIs',
            description: 'State Excise Auth APIs',
            version: '1.0.0',
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'find more information here'
        },
        host: 'localhost:5000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    }
}