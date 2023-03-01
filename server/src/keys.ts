interface config {
  global: {url:string, api_key: string}
  mongodb_uri: string
}
export const config:config = {global: {
  url:process.env.url,
  api_key: process.env.api_key
  },
  mongodb_uri: process.env.mongodb_uri
}

interface env {
  GithubId: string,
  GithubSecret: string
}

const keys:env = {
  GithubId: process.env.GITHUB_ID,
  GithubSecret: process.env.GITHUB_SECRET
}

export default keys;