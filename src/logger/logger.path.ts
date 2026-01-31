import * as fs from 'fs';
import * as path from 'path';

export function ensureLogDir(dir = 'logs') {
  const logDir = path.resolve(dir);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}
