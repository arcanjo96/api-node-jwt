const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env){
        case 'dev': 
        return {
            db: 'mongodb+srv://admin:suasenhaaqui@cluster0-o6huq.mongodb.net/dbMongo?retryWrites=true',
            jwt_pass: 'tokentest',
            jwt_expires_in: '7d'
        }

        case 'hml': 
        return {
            db: 'mongodb+srv://admin:suasenhaaqui@cluster0-o6huq.mongodb.net/dbHml?retryWrites=true',
            jwt_pass: 'tokenhml',
            jwt_expires_in: '7d'
        }

        case 'prod': 
        return {
            db: 'mongodb+srv://admin:suasenhaaqui@cluster0-o6huq.mongodb.net/dbProd?retryWrites=true',
            jwt_pass: 'tokenprod',
            jwt_expires_in: '7d'
        }
    }
};

console.log(env);
console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();