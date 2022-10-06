import { spawn } from 'child_process'

/**
 *
 * @param {string} command Command to be executed
 * @param {string[]} args Optional arguments
 * @param {SpawnOptionsWithoutStdio | undefined} options Optional options
 * @returns {Promise<string | boolean>}
 */
export const runCommand = (command, args, options = undefined) => {
  const spawned = spawn(command, args, options)

  return new Promise((resolve) => {
    spawned.stdout.on('data', (data) => {
      resolve(data.toString())
    })

    spawned.stderr.on('data', (data) => {
      resolve(false)
      console.error(data.toString())
    })

    spawned.on('close', () => {
      resolve(true)
    })
  })
}
