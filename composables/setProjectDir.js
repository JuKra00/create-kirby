import { existsSync, mkdirSync, readdirSync } from 'fs'
import { join } from 'path'
import { getValidPackageName } from './getValidPackageName.js'
import { formatDir } from './formatDir.js'
import enquirer from 'enquirer'
const { prompt } = enquirer
import { resolve, basename } from 'path'

/**
 * Prompt user to select project directory
 * @param {minimist.ParsedArgs} argv Arguments from commandline
 * @returns {Promise<{root: string, name: string, domain: string}>} Project dir root and name
 */
export let setProjectDir = async (argv) => {
  const targetDir = formatDir(argv._[0])

  const getProjectName = () =>
    targetDir === '.' ? basename(resolve()) : targetDir

  /**
   * @type {{ projectName: string }}
   */
  const { projectName } = await prompt({
    type: 'input',
    name: 'projectName',
    message: `Project name:`,
    initial: getProjectName(),
  })
  const validProjectName = await getValidPackageName(projectName)

  const { domain } = await prompt({
    type: 'input',
    name: 'domain',
    message: `Local domain name (used for valet):`,
    initial: `${projectName}`,
  })

  const validDomain = await getValidPackageName(domain)

  const root = join(process.cwd(), targetDir ?? validProjectName)
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
