import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const streamFile = (filePath: string, res: NextApiResponse) => {
  try {
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = res.req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'audio/mp3',
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'audio/mp3',
      });
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred while streaming the file.');
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePathFromQuery = req.query.path;

  // not the safest thing, but this is just an example
  const filePath = path.resolve(`/${filePathFromQuery}`);

  streamFile(filePath, res);
}
