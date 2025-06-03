/* eslint-disable no-console */
import cluster from 'node:cluster';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

enum AnsiColor {
  Reset = '\x1b[0m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',

  // For variable format pids
  Pink = '\x1b[38;5;13m',
  Orange = '\x1b[38;5;208m',
  CyanBright = '\x1b[38;5;14m',
  Violet = '\x1b[38;5;135m',
  Lime = '\x1b[38;5;10m',
  Aqua = '\x1b[38;5;51m',
  Peach = '\x1b[38;5;216m',
  Teal = '\x1b[38;5;30m',
  Olive = '\x1b[38;5;100m',
  Indigo = '\x1b[38;5;54m',
  Maroon = '\x1b[38;5;52m',
  Turquoise = '\x1b[38;5;44m',
  Gold = '\x1b[38;5;220m',
  SkyBlue = '\x1b[38;5;117m',
  Lavender = '\x1b[38;5;183m',
  Salmon = '\x1b[38;5;209m',
  Mint = '\x1b[38;5;121m',
  Steel = '\x1b[38;5;67m',
}

const COLORS_FOR_PIDS = [
  AnsiColor.Pink,
  AnsiColor.Orange,
  AnsiColor.CyanBright,
  AnsiColor.Violet,
  AnsiColor.Lime,
  AnsiColor.Aqua,
  AnsiColor.Peach,
  AnsiColor.Teal,
  AnsiColor.Olive,
  AnsiColor.Indigo,
  AnsiColor.Maroon,
  AnsiColor.Turquoise,
  AnsiColor.Gold,
  AnsiColor.SkyBlue,
  AnsiColor.Lavender,
  AnsiColor.Salmon,
  AnsiColor.Mint,
  AnsiColor.Steel,
];

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
  return `${COLORS_FOR_PIDS[pid % COLORS_FOR_PIDS.length]}[${time}] [${role}] [PID ${pid}]`;
}

function log(level: LogLevel, ...args: any[]) {
  const prefix = formatPrefix();
  const message = [prefix, getColorByLevel(level), ...args];

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
