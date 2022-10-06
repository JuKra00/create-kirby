import enquirer from 'enquirer'
import { red } from 'kolorist'
const { prompt } = enquirer
/**
 * Get valid package name
 * @param {string} projectName Name of project
 * @returns {Promise<string>} Valid package name
 */
export const getValidPackageName = async (projectName) => {
  const packageNameRegExp =
    /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/
  if (packageNameRegExp.test(projectName)) {
    return projectName
  } else {
    const suggestedPackageName = projectName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/^[._]/, '')
      .replace(/[^a-z0-9-~]+/g, '-')

    /**
     * @type {{ inputPackageName: string }}
     */
    console.log(red('Your input does not seem to be valid.'))
    const { inputPackageName } = await prompt({
      type: 'input',
      name: 'inputPackageName',
      message: `Maybe use this one?:`,
      initial: suggestedPackageName,
      validate: (input) =>
        packageNameRegExp.test(input)
          ? true
          : 'Please do not use spaces or special characters.',
    })
    return inputPackageName
  }
}
