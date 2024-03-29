import { DataSource, ObjectLiteral, EntityTarget } from 'typeorm';
import { env } from '../../configs/env';
import { User } from './entities/user';
import { Service } from './entities/service';
import { Category } from './entities/category';
import { ServiceToCategory } from './entities/service-to-category';
import { Favorite } from './entities/favorites';
let _connection: undefined | DataSource;

const entities = [
  User,
  Service,
  Category,
  ServiceToCategory,
  Favorite
];

interface IConnectionOptions {
  synchronize?: boolean;
  logging?: boolean;
}

const _getDBConnection = () =>{
  return {
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database
  }
};

const _initConnection = async (options: IConnectionOptions) => {
  console.log('START_INIT_DB_CONNECTION');
  const dbInfo: any = _getDBConnection();
  const dataSource = new DataSource({
    ...options,
    legacySpatialSupport: false,
    entities,
    type: 'mysql',
    ...dbInfo,
  });
  if (dataSource.isInitialized && _connection) {
    console.log('USE_DB_CONNECTION_EXISTED');
    return _connection;
  }
  console.log('START_CONNECT_TO_DB');
  return dataSource
    .initialize()
    .then((dataSource) => {
      _connection = dataSource;
      console.log('INIT_DB_CONNECTION_SUCCESS');
      return _connection;
    })
    .catch((error) => {
      console.error('INIT_DB_CONNECTION_ERROR', error);
      process.exit();
    });
};

const getRepo = async <Entity extends ObjectLiteral>(entity: EntityTarget<Entity>) => {
  const connection = await getConnection();
  return connection.getRepository(entity);
};

const getConnection = async (options: IConnectionOptions = {}) => {
  if (_connection) {
    console.log('USE_DB_CONNECTION_EXISTED');
    return _connection;
  }
  return _initConnection(options);
};

const closeConnection = () => _connection && _connection?.destroy();

export default {
  getRepo,
  getConnection,
  closeConnection,
};
