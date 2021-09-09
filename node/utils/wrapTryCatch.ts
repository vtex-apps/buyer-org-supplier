export default async function wrapTryCatch<T>(promise: Promise<T>) {
  try {
    const response = await promise
    console.log('try', { response } )
    return {
      response,
      error: null,
    }
  } catch (error) {
    console.log({ error })
    return {
      response: null,
      error: 'ERROR',
    }
  }
}
