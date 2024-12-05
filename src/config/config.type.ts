import { DatabaseConfig } from 'src/database/config/database.config.type';
import { AppConfig } from './app.config.type';

export type AvailableConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
};
