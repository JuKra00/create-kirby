import { mkdirSync, readdirSync } from 'fs'
import { resolve } from 'path'
import { copyFile } from './copyFile.js'
/**
 * Copy Directory from source to destination
 * @param {string} srcDir Path to source directory
 * @param {string} destDir Path to destination directory
 */
export const copyDir = (srcDir, destDir) => {
  mkdirSync(destDir, { recursive: true })
  for (const file of readdirSync(srcDir)) {
    const srcFile = resolve(srcDir, file)
    const destFile = resolve(destDir, file)
    copyFile(srcFile, destFile)
  }
}
