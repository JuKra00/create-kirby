import enquirer from 'enquirer'
const { prompt } = enquirer
import { stripColors } from 'kolorist'
import { choices } from '../lib/frontendFramework.js'
/**
 * Prompt user to select frontend framework
 * @returns {Promise<string>} Frontend framework chosen
 */
export let selectFrontendFramework = async () => {
  let message = 'Select a javascript framework:'
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
  return framework
}
