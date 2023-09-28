import { DynamicModule, Module, Provider } from '@nestjs/common';
import { KnexService } from './knex.service';
import { KNEX_CONNECTION, KNEX_OPTIONS } from './constants';
import {
  KnexAsyncOptions,
  KnexOptions,
  KnexOptionsFactory,
} from './interfaces';

export const connectionFactory = {
  provide: KNEX_CONNECTION,
  useFactory: async (knexService) => {
    return knexService.getConnection();
  },
  inject: [KnexService],
};

@Module({
  providers: [KnexService, connectionFactory],
  exports: [KnexService, connectionFactory, KNEX_CONNECTION, KNEX_OPTIONS],
})
export class KnexModule {
  public static forRoot(options: KnexOptions): DynamicModule {
    return {
      module: KnexModule,
      providers: [
        {
          provide: KNEX_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  public static forRootAsync(options: KnexAsyncOptions): DynamicModule {
    return {
      module: KnexModule,
      providers: [...this.createProviders(options)],
    };
  }

  private static createProviders(options: KnexAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(options: KnexAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: KNEX_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: KNEX_OPTIONS,
      useFactory: async (optionsFactory: KnexOptionsFactory) =>
        await optionsFactory.createKnexOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
