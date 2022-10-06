import enquirer from 'enquirer'
const { prompt } = enquirer
import { choices } from '../lib/composerPlugins.js'
/**
 * Prompt user to select composer plugins
 * @returns {Promise<string[]>} Array of chosen plugins
 */
export let selectComposerPlugins = async () => {
  /**
   * @type {{ p: string[] }}
   */
  const { p } = await prompt({
    type: 'multiselect',
    name: 'p',
    message: 'Choose plugins: (use space to toggle your selection)',
    choices,
    result(names) {
      // @ts-ignore
      return this.map(names)
    },
  })

  let plugins = Object.values(p)
  return plugins
}
