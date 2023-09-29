export interface EnvironmentVariables {
  /* Environments */
  ENVIRONMENT: Environment;

  /* DB Variables */
  DB_PORT: number;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_AUTOLOADENTITIES: boolean;
  DB_SYNCHRONIZE: boolean;
  DB_MIGRATIONS_RUN: boolean;

  /* Application Variables */
  JWT_SECRET: string;
  PORT: number;
}

type Environment = 'development' | 'production' | 'test' | 'debug';
