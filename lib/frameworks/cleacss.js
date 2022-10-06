import { runCommand } from '../../composables/runCommand.js'
import { appendFileSync } from 'fs'
/**
 * Install Bulma
 * @param {string} root root path
 */
export const install = async (root) => {
  await runCommand('pnpm', ['add', 'cleacss', '--silent'], {
    cwd: root,
  })
  const cleacss = `
/*--------------------------------------------------------------
# Bulma
--------------------------------------------------------------*/
@import 'cleacss';

`
  appendFileSync(`${root}/frontend/styles/index.scss`, cleacss, 'utf-8')
  const cleacssGlobal = `
/*--------------------------------------------------------------
# Cleacss
--------------------------------------------------------------*/
@import 'cleacss/global';

`
  appendFileSync(`${root}/frontend/global.scss`, cleacssGlobal, 'utf-8')
}
