
# :rocket: Aionic :rocket:
![Aionic Logo](https://www.aionic.app/_next/image?url=%2FAionic-Logo.png&w=1920&q=75)
## Aionic is a historical registry and rollback tool of your Argo CD managed apps
### Beta start instructions - App will be Dockerized before launch

**NOTE:** Aionic requires a URI to your own MongoDB database. Aionic does not provide hosting for data, but *WILL* manage the MongoDB database for you.

<!-- Create a GitHub token that has repo access. This will be used in the setup process and to revert and revert changes to manifests. Also create an ArgoCD access token that has access to all of the apps managed, so Aionic can monitor all of the apps running in your Argo instance. Each user will provide their own account's ArgoCD access token, keeping their individual permissions. Once that is done -->

<!-- * Open two terminal windows
  * CD to client in one and run:
    * npm install
    * npm run dev
  * CD to serverTS and run:
    * npm install
    * npm start

This will launch a website running on localhost:5173. Please log in through GitHub, which will then prompt you to enter an ArgoCD key and url. This is the access token you generate for your account, and the url your ArgoCD is accessible through currently. The second input field is for the GitHub token generated before the setup process. Once both are inputted, refreshing the page will show you all of the apps available. Please note that Aionic *does not* have access to the history of your ArgoCD apps before Aionic has been setup.

After selecting an app you would like to revert a manifest for, please input the branch you want to force push the specific manifest to. Keep in mind that the branch must exist for the revert to be successful. Once ArgoCD picks up the changes (dependant on how your organization has set it up) those changes will appear in Aionic as well. -->

Thanks!

## How to install

### Pre-Requisite  
- Get Client_ID/Secret and calback url from Github
  - Go to github and create new OAuth App  
  <img src=./IMG/github_Oauth_app.png width=800px></img>  
  - callback URL must be forwarded to [www.example.com]**/server/auth/callback**  
  <img src=./IMG/img3.png width=900px></img>
  - GITHUB_ID This can be found at github under setting/Developer settings/[Aionic]
  - GITHUB_SECRET=
  - GITHUB_CALLBACK_URL=
  - url=https://host.docker.internal:1995
  - api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJ0aW1vdGh5OmFwaUtleSIsIm5iZiI6MTY3NzY4ODI4NSwiaWF0IjoxNjc3Njg4Mjg1LCJqdGkiOiIzZDA0YmE2OS1kOTc1LTQzNTgtYjNjMS05MzQzZWYxZDQ3ZjgifQ.87DLheXEYF8D3mpDb3QsilNsQ11MARNzY6qeFPYDvdU
  - mongodb_uri=mongodb+srv://timothy:GqaPQRkAs298yaY1@cluster0.axjjrae.mongodb.net/?retryWrites=true&w=majority
  - PORT=3000
<img src=./IMG/git_repo.png width=400px ></img>  
  
Clone the repo to your local machine
