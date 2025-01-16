import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import {
  REDIS_CACHE_TTL,
  REDIS_HOST,
  REDIS_PORT,
} from 'src/constants/constants';

const config = new ConfigService();

//Redis Cache Config

export const RedisConfigs: CacheModuleOptions = {
  isGlobal: true,
  store: redisStore,
  ttl: config.get<number>(REDIS_CACHE_TTL), //Time to live(Cache Expiration)
  host: config.get<string>(REDIS_HOST),
  port: config.get<number>(REDIS_PORT),
};
