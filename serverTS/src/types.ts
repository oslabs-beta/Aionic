
export type error = {
    message: string,
    status: number,
    log: string
  }

export interface ApiKey {
  _id?: any,
  api_key: string,
  url: string,
  __v?: number
}

export interface User {
  _id?: any,
  githubId: string,
  githubToken: string,
  argo_tokens: ApiKey[],
  __v?: number
}

export interface App {
  _id?: any,
  name: string,
  uid: string,
  source: {
    repoURL: string,
    path:string,
    targetRevision: string
  },
  date?: Date,
  head?: string,
  tail?: string,
  __v?: number
}

export interface Node {
  _id?: any
  manifest: string,
  revision: string,
  sourceType:string,
  prev?: string,
  next?: string
}

interface GithubPhoto {
  value: string
}

export interface GithubProfile extends GithubPhoto {
  id: string,
  nodeId: string,
  displayName?: string,
  username: string,
  profileUrl: string,
  photos: GithubPhoto[],
  provider: string
}

export interface AppData {
  name: string,
  uid: string,
}

export interface AppList {
  metadata?: AppData
  spec?: any
}