/**
 * Format directory
 * @param {string|undefined} dir Directory to be formated
 * @returns Formated directory path
 */
export const formatDir = (dir) => {
  return dir?.trim().replace(/\/+$/g, '')
}
