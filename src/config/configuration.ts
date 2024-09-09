import { Configuration } from './config.type';

export default (): Configuration => ({
  port: +process.env.PORT || 3003,
  databaseUri: process.env.DB_URI || 'mongodb://localhost:27019/nest-auth',
  ipifyUri: 'https://api.ipify.org/?format=json',
});
