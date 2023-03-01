
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
<!-- Create a GitHub token that has repo access. This will be used in the setup process and to revert and revert changes to manifests. Also create an ArgoCD access token that has access to all of the apps managed, so Aionic can monitor all of the apps running in your Argo instance. Each user will provide their own account's ArgoCD access token, keeping their individual permissions. Once that is done

* Open two terminal windows
  * CD to client in one and run:
    * npm install
    * npm run dev
  * CD to serverTS and run:
    * npm install
    * npm start

This will launch a website running on localhost:5173. Please log in through GitHub, which will then prompt you to enter an ArgoCD key and url. This is the access token you generate for your account, and the url your ArgoCD is accessible through currently. The second input field is for the GitHub token generated before the setup process. Once both are inputted, refreshing the page will show you all of the apps available. Please note that Aionic *does not* have access to the history of your ArgoCD apps before Aionic has been setup.

After selecting an app you would like to revert a manifest for, please input the branch you want to force push the specific manifest to. Keep in mind that the branch must exist for the revert to be successful. Once ArgoCD picks up the changes (dependant on how your organization has set it up) those changes will appear in Aionic as well.

Thanks! -->
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
