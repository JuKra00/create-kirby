import { existsSync, mkdirSync, readdirSync } from 'fs'
import { join } from 'path'
import { getValidPackageName } from './getValidPackageName.js'
import enquirer from 'enquirer'
const { prompt } = enquirer

/**
 * Prompt user to select project directory
 * @returns {Promise<{root: string, name: string, domain: string}>} Project dir root and name
 */
export let setProjectDir = async () => {
  /**
   * @type {{ projectName: string }}
   */
  const { projectName } = await prompt({
    type: 'input',
    name: 'projectName',
    message: `Project name:`,
    initial: '',
  })
  const validProjectName = await getValidPackageName(projectName)

  const { domain } = await prompt({
    type: 'input',
    name: 'domain',
    message: `Local domain name (used for valet):`,
    initial: `${projectName}`,
  })

  const validDomain = await getValidPackageName(domain)

  const root = join(process.cwd(), validProjectName)
  if (!existsSync(root)) {
    mkdirSync(root, { recursive: true })
  } else {
    const existing = readdirSync(root)
    if (existing.length) {
      throw new Error(`Your project root (${root}) is not empty.`)
    }
  }
  return { root, name: validProjectName, domain: validDomain }
}
