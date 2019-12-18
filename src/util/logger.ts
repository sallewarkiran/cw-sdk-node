/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from 'winston';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'disabled';

const levels: { [key: string]: number } = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  disabled: 4
};

const defaultLevel = 'info';

class Logger {
  private logger: winston.Logger;
  private level: LogLevel;

  // Constructor is only used in getInstance
  constructor(level: LogLevel | undefined) {
    if (!level) {
      level = defaultLevel;
    }
    this.level = level;

    const loggerFormat = winston.format.printf((info) => {
      return `[${info.label}] ${info.message}`;
    });

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.label({ label: 'cw-sdk-node' }),
        winston.format.colorize({ all: true }),
        winston.format.splat(),
        winston.format.simple(),
        loggerFormat
      ),
      transports: [
        new winston.transports.Console({
          level: 'debug'
        })
      ]
    });
  }

  public setLevel(newLevel: LogLevel | undefined): void {
    this.level = newLevel || defaultLevel;
  }

  public disable(): void {
    this.level = 'disabled';
  }

  public error(message: string, ...meta: any[]): void {
    if (this.shouldLog('error')) {
      this.logger.error(message, meta);
    }
  }

  public warn(message: string, ...meta: any[]): void {
    if (this.shouldLog('warn')) {
      this.logger.warn(message, meta);
    }
  }

  public info(message: string, ...meta: any[]): void {
    if (this.shouldLog('info')) {
      this.logger.info(message, meta);
    }
  }

  public debug(message: string, ...meta: any[]): void {
    if (this.shouldLog('debug')) {
      this.logger.debug(message, meta);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return levels[this.level] <= levels[level];
  }
}

const logger = new Logger(defaultLevel);
export default logger;
