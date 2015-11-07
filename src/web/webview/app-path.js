import path from 'path';

export default function(filepath) {
  const rootDir = path.dirname(path.join(__filename, '../..'));

  return path.join(rootDir, filepath);
}
