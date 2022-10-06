import { statSync, copyFileSync } from 'fs'
import { copyDir } from './copyDir.js'
/**
 * Copy a file from source to destination
 * @param {string} src Source path of file to copy
 * @param {string} dest Destination path
 */
export const copyFile = (src, dest) => {
  const stat = statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    copyFileSync(src, dest)
  }
}
