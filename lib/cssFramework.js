import { runCommand } from '../composables/runCommand.js'
import { yellow, white } from 'kolorist'
import { appendFileSync } from 'fs'
/*--------------------------------------------------------------
# Configure possible choices
--------------------------------------------------------------*/
export const choices = [white('none'), yellow('bulma')]
/*--------------------------------------------------------------
# Install choice
--------------------------------------------------------------*/
export const install = async (name) => {
  if (name === 'bulma') {
    await installBulma()
  }
}
/*--------------------------------------------------------------
# Install bulma
--------------------------------------------------------------*/
const installBulma = async () => {
  await runCommand('npm', ['install', 'bulma', '--silent'], {
    cwd: root,
  })
  const bulmaScss = `
/*--------------------------------------------------------------
# Bulma
--------------------------------------------------------------*/
@import 'bulma/bulma.sass';

`
  appendFileSync(`${root}/src/index.scss`, bulmaScss, 'utf-8')
  const bulmaGlobalScss = `
/*--------------------------------------------------------------
# Bulma
--------------------------------------------------------------*/
/* stylelint-disable */
@import 'bulma/sass/utilities/_all.sass';
/* stylelint-enable */

`
  appendFileSync(`${root}/src/global.scss`, bulmaGlobalScss, 'utf-8')
}
