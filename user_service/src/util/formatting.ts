export function connectionString (config: any): string {
  return `mongodb+srv://${config.username}:${config.password}@${config.host}/${config.name}?retryWrites=true&w=majority`
}
