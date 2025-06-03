export interface ICronTask {
  readonly name: string;
  readonly intervalMs: number;
  readonly timeoutMs: number;
  handler: () => Promise<void>;
}

export default class BaseTask {
  static async run() {
    throw new Error('Not implemented');
  }
}
