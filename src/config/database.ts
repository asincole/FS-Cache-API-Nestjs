import * as dotenv from 'dotenv';

dotenv.config();

export default {
    type: 'mongodb',
    host: process.env.TYPEORM_HOST,
    // username: process.env.TYPEORM_USERNAME,
    // password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    // logging: process.env.TYPEORM_LOGGING === 'true',
    entities: [
      './../**/**.entity{.ts,.js}',
    ],
    useNewUrlParser: true,
    // migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
};
