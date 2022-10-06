import { yellow, white } from 'kolorist'
import { install as installBulma } from './frameworks/bulma.js'
import { install as installCleacss } from './frameworks/cleacss.js'
/*--------------------------------------------------------------
# Configure possible choices
--------------------------------------------------------------*/
export const choices = [white('none'), yellow('bulma'), yellow('cleacss')]
/**
 * Install frontend Framework
 * @param {string} name Name of Framework
 * @param {string} root root path
 */
export const install = async (name, root) => {
  if (name === 'bulma') {
    await installBulma(root)
  }
  if (name === 'cleacss') {
    await installCleacss(root)
  }
}
