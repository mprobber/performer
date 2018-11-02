// @flow
import { spawn, type ChildProcess } from 'child_process';
import Model from './Model';

export default class Process extends Model {
  subprocess: ChildProcess | null = null;
  onStdOut: Buffer => void;
  onStdErr: Buffer => void;
  command: string;

  status: 'running' | 'stopped' = 'stopped';
  exitCode: number | null = null;
  error: Error | null = null;

  constructor(
    command: string,
    onStdOut: Buffer => void,
    onStdErr: Buffer => void,
  ) {
    super();
    this.command = command;
    this.onStdOut = onStdOut;
    this.onStdErr = onStdErr;
  }

  reset = () => {
    if (this.subprocess) {
      this.subprocess.kill();
      this.subprocess = null;
    }
    this.status = 'stopped';
    this.exitCode = null;
    this.error = null;
  };

  start = () => {
    const subprocess = spawn(this.command);
    this.status = 'running';
    subprocess.stdout.on('data', this.onStdOut);
    subprocess.stderr.on('data', this.onStdErr);
    subprocess.on('error', (error: Error) => {
      this.reset();
      this.error = error;
    });
    subprocess.on('close', (exitCode: number) => {
      this.reset();
      this.exitCode = exitCode;
    });
    this.subprocess = subprocess;
  };

  stop = () => {
    const { status, subprocess } = this;
    if (status !== 'running') {
      throw new Error('You must be running to stop a process');
    }

    if (!subprocess) {
      throw new Error('how did I get here?');
    }
    subprocess.kill();
  };
}
