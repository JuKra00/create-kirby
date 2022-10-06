import { runCommand } from '../composables/runCommand.js'
import { yellow } from 'kolorist'
/*--------------------------------------------------------------
# Configure possible choices
--------------------------------------------------------------*/
export const choices = [
  {
    name: yellow('E-Mail'),
    value: 'fhr/kirby-email',
  },
  {
    name: yellow('Sitemap'),
    value: 'fhr/kirby-sitemap',
  },
  {
    name: yellow('Cookie Consent'),
    value: 'jukra00/kirby-cookie-consent',
  },
]
/*--------------------------------------------------------------
# Install script
--------------------------------------------------------------*/
export const install = async (plugins, root) => {
  await runCommand('composer', ['--working-dir=backend', 'install', '-q'], {
    cwd: `${root}`,
  })
  await plugins.map(async (p) => {
    await runCommand(
      'composer',
      ['--working-dir=backend', 'require', p, '-q'],
      {
        cwd: `${root}`,
      }
    )
  })
}
