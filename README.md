# Aionic
## Aionic is a historical registry and rollback tool of your Argo CD managed apps
### Beta start instructions - App will be Dockerized before launch

**NOTE:** Aionic requires a URI to your own MongoDB database. Aionic does not provide hosting for data, but *WILL* manage the MongoDB database for you.

Create a GitHub token that has repo access. This will be used in the setup process and to revert and revert changes to manifests. Also create an ArgoCD access token that has access to all of the apps managed, so Aionic can monitor all of the apps running in your Argo instance. Each user will provide their own account's ArgoCD access token, keeping their individual permissions. Once that is done

* Open two terminal windows
  * CD to client in one and run:
    * npm install
    * npm run dev
  * CD to serverTS and run:
    * npm install
    * npm start

This will launch a website running on localhost:5173. Please log in through GitHub, which will then prompt you to enter an ArgoCD key and url. This is the access token you generate for your account, and the url your ArgoCD is accessible through currently. The second input field is for the GitHub token generated before the setup process. Once both are inputted, refreshing the page will show you all of the apps available. Please note that Aionic *does not* have access to the history of your ArgoCD apps before Aionic has been setup.

After selecting an app you would like to revert a manifest for, please input the branch you want to force push the specific manifest to. Keep in mind that the branch must exist for the revert to be successful. Once ArgoCD picks up the changes (dependant on how your organization has set it up) those changes will appear in Aionic as well.

Thanks!

