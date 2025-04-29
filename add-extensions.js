import fs from 'fs';
import path from 'path';

const serverDirectoryPath = path.join(process.cwd(), 'dist',);

function processDirectory(directory) {
  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log('Unable to scan directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file.name);
      if (file.isDirectory()) {
        processDirectory(filePath); // Recursively process directories within 'server'
      } else if (file.isFile() && file.name.endsWith('.js')) {
        console.log(`Processing file: ${filePath}`);
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.log('Error reading file:', err);
            return;
          }
          const result = data.replace(/import (.*?) from '(\.?\.\/.*?)(?<!\.js)';/g, (match, p1, p2) => {
            return `import ${p1} from '${p2}.js';`;
          });

          fs.writeFile(filePath, result, 'utf8', (err) => {
            if (err) console.log('Error writing file:', err);
            else console.log(`Updated file: ${filePath}`);
          });
        });
      }
    });
  });
}

console.log(`Processing directory: ${serverDirectoryPath}`);
processDirectory(serverDirectoryPath); // First pass
processDirectory(serverDirectoryPath); // Second pass
