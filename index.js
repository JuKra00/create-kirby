#!/usr/bin/env node
// @ts-check
import ora from 'ora'
import minimist from 'minimist'
import { readdirSync, renameSync } from 'fs'
import { join } from 'path'
import { bold, yellow, green, white, bgRed } from 'kolorist'
import {
  runCommand,
  sleep,
  selectCSSFramework,
  setProjectDir,
  selectFrontendFramework,
  selectComposerPlugins,
  writeFile,
} from './composables/index.js'
import { install as cssFrameworkInstall } from './lib/cssFramework.js'
import { install as composerPluginInstall } from './lib/composerPlugins.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const argv = minimist(process.argv.slice(2), { string: ['_'] })
const commonFilesDir = join(__dirname, 'templates/common')

async function init() {
  /*--------------------------------------------------------------
  # Check if composer is installed
  --------------------------------------------------------------*/
  let composer = await runCommand('composer', ['--version'])
  if (!composer) throw new Error('composer not found.')
  /*--------------------------------------------------------------
  # Set Project dir
  --------------------------------------------------------------*/
  let { root, name, domain } = await setProjectDir(argv)
  if (!root) throw new Error('Aborted')
  /*--------------------------------------------------------------
  # Select frontend framework
  --------------------------------------------------------------*/
  let framework = await selectFrontendFramework()
  let templateDir = join(__dirname, 'templates', framework)
  /*--------------------------------------------------------------
  # Select css framework
  --------------------------------------------------------------*/
  let cssFramework = await selectCSSFramework()
  /*--------------------------------------------------------------
  # Select Composer Plugins
  --------------------------------------------------------------*/
  let plugins = await selectComposerPlugins()
  /*--------------------------------------------------------------
  # Copy common files
  --------------------------------------------------------------*/
  console.log('')
  const spinner = ora({
    spinner: 'simpleDotsScrolling',
    interval: 100,
    color: 'green',
    prefixText: green(`Copying common files`),
  }).start()
  const commonFiles = readdirSync(commonFilesDir)
  for (const file of commonFiles) {
    writeFile(file, commonFilesDir, root)
  }
  await runCommand('cp', ['backend/.env.example', 'backend/.env'], {
    cwd: root,
  })
  await runCommand('cp', ['.env.example', '.env'], {
    cwd: root,
  })
  await runCommand(
    'sed',
    ['-i', '', `s|VITE_DEV_URL=|VITE_DEV_URL=https://${domain}.test|g`, '.env'],
    {
      cwd: root,
    }
  )
  await sleep(1000)
  /*--------------------------------------------------------------
  # Copy template files
  --------------------------------------------------------------*/
  spinner.prefixText = green(`Copying ${framework} template files`)
  const files = readdirSync(templateDir)
  for (const file of files.filter((f) => f !== 'package.json')) {
    writeFile(file, templateDir, root)
  }
  await sleep(1000)
  /*--------------------------------------------------------------
  # Prepare package.json
  --------------------------------------------------------------*/
  spinner.prefixText = green(`Preparing package.json`)
  const pkg = require(join(templateDir, `package.json`))
  const packagejson = { ...pkg }
  packagejson.name = name
  writeFile('package.json', root, root, JSON.stringify(packagejson, null, 2))
  await sleep(1000)
  /*--------------------------------------------------------------
  # Prepare config.php
  --------------------------------------------------------------*/
  spinner.prefixText = green(`Preparing kirby config`)
  renameSync(
    join(root, 'backend/site/config/config.domain.test.php'),
    join(root, `backend/site/config/config.${domain}.test.php`)
  )
  await sleep(1000)
  /*--------------------------------------------------------------
  # Install node modules
  --------------------------------------------------------------*/
  spinner.prefixText = green(`Installing node dependencies`)
  await runCommand('pnpm', ['install', '--silent'], {
    cwd: root,
  })
  await sleep(1000)
  /*--------------------------------------------------------------
  # Install css frameworks
  --------------------------------------------------------------*/
  if (cssFramework) {
    spinner.prefixText = green(`Installing css framework`)
    await cssFrameworkInstall(cssFramework, root)
    await sleep(1000)
  }
  /*--------------------------------------------------------------
  # Install composer plugins
  --------------------------------------------------------------*/
  spinner.prefixText = green(`Installing composer packages`)
  await composerPluginInstall(plugins, root)
  await sleep(1000)
  /*--------------------------------------------------------------
  # Ready
  --------------------------------------------------------------*/
  spinner.prefixText = ''
  spinner.succeed(bold(green('Everything ready. Happy coding!')))
  console.log('')
  console.log(white('Link your domain in valet'))
  console.log(white('Run inside www:'))
  console.log(yellow(`valet link --secure ${domain}`))
  console.log('')
  console.log(
    white(`You also need to proxy vite if you haven't already done it.`)
  )
  console.log(yellow(`valet proxy --secure vite http://localhost:3000`))
  console.log('')
  console.log(white(`Start development server`))
  console.log(white(`From your projects root:`))
  console.log(yellow(`pnpm dev`))
  console.log('')
}

init().catch((error) => {
  if (error?.message) {
    console.log(bgRed(' ' + error.message + ' '))
  } else {
    console.log(bgRed('Aborted'))
  }
})
