/* eslint-disable no-console */
import cluster from 'node:cluster';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

enum AnsiColor {
  Reset = '\x1b[0m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
}

function getColorByLevel(level: LogLevel): AnsiColor {
  switch (level) {
    case 'info':
      return AnsiColor.Green;
    case 'warn':
      return AnsiColor.Yellow;
    case 'error':
      return AnsiColor.Red;
    case 'debug':
      return AnsiColor.Blue;
    default:
      return AnsiColor.Reset;
  }
}

function formatPrefix(): string {
  const role = cluster.isPrimary ? 'MASTER' : 'FORK';
  const { pid } = process;
  const time = new Date().toISOString();
  return `[${time}] [${role}] [PID ${pid}]`;
}

function log(level: LogLevel, ...args: any[]) {
  const prefix = formatPrefix();
  const message = [getColorByLevel(level), prefix, ...args];

  switch (level) {
    case 'info':
      console.info(...message);
      break;
    case 'warn':
      console.warn(...message);
      break;
    case 'error':
      console.error(...message);
      break;
    case 'debug':
      if (process.env.DEBUG === 'true') {
        console.debug(...message);
      }
      break;
    default:
      console.log(...message);
  }
}

export default {
  info: (...args: any[]) => log('info', ...args),
  warn: (...args: any[]) => log('warn', ...args),
  error: (...args: any[]) => log('error', ...args),
  debug: (...args: any[]) => log('debug', ...args),
};
