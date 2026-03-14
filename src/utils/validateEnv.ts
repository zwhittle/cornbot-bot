export const validateEnv = () => {
  const required = ['BOT_TOKEN', 'CLIENT_ID', 'API_DOMAIN', 'STATIC_URL', 'AWS_REGION', 'BRAVE_SEARCH_API_KEY']
  let valid = true

  for (const name of required) {
    if (!process.env[name]) {
      console.error(`Missing required environment variable: ${name}`)
      valid = false
    }
  }

  return valid
}
