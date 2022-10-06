/**
 * Let application sleep for x milliseconds
 * @param {number} sleep Milliseconds of timeout
 * @returns {Promise<boolean>}
 */
export const sleep = async (sleep = 400) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, sleep)
  })
}
