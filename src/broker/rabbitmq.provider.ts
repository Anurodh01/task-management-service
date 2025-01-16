import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import {
  RABBITMQ_CLIENT,
  RABBITMQ_QUEUE,
  RABBITMQ_URL,
} from 'src/constants/constants';

//RabbitMQ provider

export const RabbitMQClientProvider = {
  provide: RABBITMQ_CLIENT,
  useFactory: (config: ConfigService) => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [config.get<string>(RABBITMQ_URL)],
        queue: config.get<string>(RABBITMQ_QUEUE),
        queueOptions: { durable: true },
      },
    });
  },
  inject: [ConfigService],
};
