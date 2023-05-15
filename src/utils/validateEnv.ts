export const validateEnv = () => {
  if (!process.env.DISCORD_TOKEN) {
    console.log('Missing DISCORD_TOKEN environment variable')
    return false
  }

  if (!process.env.CLIENT_ID) {
    console.log('Missing CLIENT_ID environment variable')
    return false
  }

  return true
}
