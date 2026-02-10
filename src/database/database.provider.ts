import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private pool: Pool;
  private client: PoolClient | null = null;

  constructor(private readonly options) {
    this.pool = new Pool({
      host: options.config.host,
      port: options.config.port,
      database: options.config.database,
      user: options.config.user,
      password: options.config.password,
      ssl: options.config.ssl,
      max: options.config.max,
      idleTimeoutMillis: options.config.idleTimeoutMillis,
      connectionTimeoutMillis: options.config.connectionTimeoutMillis,
    });

    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }

  async query(text: string, params?: any[]) {
    const client = await this.pool.connect();
    try {
      return await client.query(text, params);
    } finally {
      client.release();
    }
  }

  async transaction(callback: (client: PoolClient) => Promise<any>) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async getClient(): Promise<PoolClient> {
    if (!this.client) {
      this.client = await this.pool.connect();
    }
    return this.client;
  }

  async release() {
    if (this.client) {
      this.client.release();
      this.client = null;
    }
  }

  async close() {
    await this.pool.end();
  }

  async onModuleDestroy() {
    await this.close();
  }

  getPool() {
    return this.pool;
  }
}
