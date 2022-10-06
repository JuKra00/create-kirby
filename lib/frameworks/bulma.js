import { runCommand } from '../../composables/runCommand.js'
import { appendFileSync } from 'fs'
/**
 * Install Bulma
 * @param {string} root root path
 */
export const install = async (root) => {
  await runCommand('pnpm', ['add', 'bulma', '--silent'], {
    cwd: root,
  })
  const bulmaScss = `
/*--------------------------------------------------------------
# Bulma
--------------------------------------------------------------*/
@import 'bulma/bulma.sass';

`
  appendFileSync(`${root}/frontend/styles/index.scss`, bulmaScss, 'utf-8')
  const bulmaGlobalScss = `
/*--------------------------------------------------------------
# Bulma
--------------------------------------------------------------*/
/* stylelint-disable */
@import 'bulma/sass/utilities/_all.sass';
/* stylelint-enable */

`
  appendFileSync(`${root}/frontend/global.scss`, bulmaGlobalScss, 'utf-8')
}
