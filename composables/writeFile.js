import { join } from 'path'
import { writeFileSync } from 'fs'
import { copyFile } from './copyFile.js'
/**
 *
 * @param {string} file Filename
 * @param {string} sourcePath Source path
 * @param {string} root Root path
 * @param {string | null} content File content
 */
export const writeFile = (file, sourcePath, root, content = null) => {
  const targetPath = join(root, file)
  if (content) {
    writeFileSync(targetPath, content)
  } else {
    copyFile(join(sourcePath, file), targetPath)
  }
}
