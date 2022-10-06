import enquirer from 'enquirer'
const { prompt } = enquirer
import { stripColors } from 'kolorist'
import { choices } from '../lib/cssFramework.js'
/**
 * Prompt user to select CSS framework
 * @returns {string}: Framework chosen
 */
export let selectCSSFramework = async () => {
  let message = 'Select a css framework:'
  /**
   * @type {{ t: string }}
   */
  const { t } = await prompt({
    type: 'select',
    name: 't',
    message,
    choices,
  })
  let framework = stripColors(t)
  if (framework === 'none') {
    return null
  }
  return framework
}
