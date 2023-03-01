
# [:rocket: Aionic :rocket:](https://www.aionic.app/) &middot; ![Github](https://img.shields.io/github/repo-size/oslabs-beta/Aionic) ![GitHub](https://img.shields.io/github/license/oslabs-beta/Aionic) ![GitHub](https://img.shields.io/badge/PRs-welcome-orange)
![Aionic Logo](https://www.aionic.app/_next/image?url=%2FAionic-Logo.png&w=1920&q=75)
## Aionic is a historical registry and rollback tool for your Argo CD managed apps
<br>

## Before setup
**NOTE:** Aionic requires you to setup your own MongoDB database and OAuth through your Github account, but Aionic ***WILL*** manage your database and OAuth user Github authenication. 
  
These are what you'll need before we begin:
* MongoDB URI
* ArgoCD Token
  * An admin ArgoCD token that has access to all apps, so Aionic can update and store all applications and kubernetes manifests in real time
  * A personal ArgoCD token for each user to gain access to specific apps based on their privileges.
* ArgoCD URL
  * For example: **https://example.com**

*For more information on how to setup up MongoDB, click [here](https://www.mongodb.com/docs/manual/tutorial/getting-started/)*

*For more information on how to setup up an OAuth app on your account, click [here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)*

## How to setup

### Pre-Requisite  
- Get Client_ID/Secret and calback url from Github
  - Go to github and create new OAuth App  
  <img src=./IMG/github_Oauth_app.png width=800px></img>
  - callback URL must be forwarded to [www.example.com]**/server/auth/callback**  
  <img src=./IMG/img3.png width=900px></img>
  - copy Client_ID and paste it onto Docker-compose-dev.yml as GITHUB_ID  
  - copy newly generated client secret paste it onto GITHUB_SECRET  
  - copy callback url from previous step paste it onto GITHUB_CALLBACK_URL

- u
  - api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJ0aW1vdGh5OmFwaUtleSIsIm5iZiI6MTY3NzY4ODI4NSwiaWF0IjoxNjc3Njg4Mjg1LCJqdGkiOiIzZDA0YmE2OS1kOTc1LTQzNTgtYjNjMS05MzQzZWYxZDQ3ZjgifQ.87DLheXEYF8D3mpDb3QsilNsQ11MARNzY6qeFPYDvdU
  - mongodb_uri=mongodb+srv://timothy:GqaPQRkAs298yaY1@cluster0.axjjrae.mongodb.net/?retryWrites=true&w=majority
  - PORT=3000
<img src=./IMG/git_repo.png width=400px ></img>  
  
Clone the repo to your local machine

<br>

## Authors
|                   |           |
|:-----------------:|:---------:|
| **Nathan Lui**    | [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png" width="40" height="40">](https://www.linkedin.com/in/nmlui/) [<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="40" height="40">](https://github.com/nathanmlui) |
| **Jian Cheng Lu** | [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png" width="40" height="40">](https://www.linkedin.com/in/jlu1932/) [<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="40" height="40">](https://github.com/jiannluu) |
| **Timothy Kwon**  | [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png" width="40" height="40">](https://www.linkedin.com/in/timothy-m-kwon/) [<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="40" height="40">](https://github.com/tk-0311) |
| **Ari Bengiyat**  | [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png" width="40" height="40">](https://www.linkedin.com/in/ari-bengiyat-4b68821a9/)  [<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="40" height="40">](https://github.com/aribengiyat/)|

## How to contribute
Encountering a bug or wanting features that are missing with our app? Please let us know by opening an issue in our Github repository on how we can improve!

If you want to contribute directly, please submit a pull request following the guidelines listed [here](https://docs.github.com/en/get-started/quickstart/contributing-to-projects?tool=webui).

## Show us your support!
If you liked our app, please show us your support by giving this repo a big :star:

## License
Aionic is released under the [MIT License](https://github.com/oslabs-beta/Aionic/blob/dev/LICENSE)
