const fs = require('node:fs/promises');
const path = require('node:path');
const pcolors = require('picocolors');

const folder = process.argv[2] || '.'

async function ls(folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.log(pcolors.red(`Error al leer el directorio ${folder}`));
    process.exit(1)
  }

  const filePromises = files.map(async file => {
    const filePath = path.join(folder, file)

    let stats
    try {
      stats = await fs.stat(filePath)
    } catch {
      console.log(`Error al leer el archivo ${filePath}`);
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const fileTipe = isDirectory ? 'd' : 'f'
    const fileSize = stats.size.toString()
    const fileModified = stats.atime.toLocaleString();

    return `${pcolors.cyan(fileTipe)} ${pcolors.green(file).padEnd(40)} ${pcolors.bold(fileSize).padStart(15)} ${pcolors.cyan(fileModified)}`
  })

  const filesInfo = await Promise.all(filePromises)

  filesInfo.forEach(fileInfo => console.log(fileInfo));
}

ls(folder);
