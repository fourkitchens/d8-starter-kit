## Git workflow

We will be using a modified [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) workflow on this project.

### Branch naming conventions

- `master` The master branch is for code ready to be released to the production environment.
- `develop` This branch is merged in to master when a release is ready to be deployed. It only contains code that has gone through peer review and is ready for PO review. At the the time of each release, the `develop` branch should be merged into `master` and a tag should be created with the the current date and time (example: `REL-160602-1308`). Note: this tag is generated automatically when using the `aquifer run deploy-dev` command.
- `PROJECT-##--short-description` `##` represents the Jira ticket number. Feature branches should branch from and merge back into the `develop` branch. They contain code that is currently in development. When a story/feature is complete, a pull request should be created merging the feature branch into the `develop` branch.
- `hotfix/short-description` Create a hotfix branch for quick fixes that need to bypass the `develop` branch and get merged directly into `master`. Hotfixes should only be when needed. Be sure your hotfixes are branched off of `master` and your PRs are set to merge back into `master`.

### Pull requests

Pull requests should be named with the full Jira ticket ID (if applicable) plus a brief description. Example:

> PROJECT-10: Basic page content type

The description should contain a link to the Jira ticket.

Also include a brief description of what the pull request is doing if it is more involved than what can be adequately communicated in the title.

Lastly, include complete steps to functionally test the pull request.

You will be presented with a template containing these main components when you create a new PR.

### Assignment and acceptance

All pull requests need to go through a review process. When your pull request is ready to be reviewed, label it as `needs review`. If you know who should be reviewing it, go ahead and assign that person as well. If the reviewer has questions or encounters issues, they will leave comments, apply the appropriate labels and assign back to you. If your pull request receives both `passes code review` and `passes functional review` labels, it will be assigned back to you for you to merge into the sprint branch and delete the feature branch. Ultimately, you are the owner of your pull requests and it is up to you to see that they get reviewed and merged into the develop branch.

Label pull requests that are not ready for review as `work in progress`.

### Additional pull request best practices

- Generally, pull requests should resolve a single Jira ticket. Try to avoid combining multiple tickets into a single pull request. There may be instances where it makes sense to do otherwise but please use discretion.
- Try to keep pull requests reasonably small and discrete. Following the one pull request per ticket paradigm should accomplish this by default. However, if you are beginning to work on a story and it feels like it will result in a giant pull request with lots of custom code, changes across many features, and lots of testing scenarios, think about how you might break down the story into smaller subtasks that could be incrementally developed and tested. Create subtasks or potentially even new stories within Jira. If you are unsure about how or are unable to do this, please reach out to the project Tech Lead, Product Owner, or Project Manager.

## Coding standards

Coding standards will be rigorously enforced on this project. Please save everybody time by checking for common syntax errors in your custom code and fixing them before you send your pull request into review. Aquifer provides a convenient tool for this, just run `aquifer lint` within your project and you'll get a list of coding standards errors that need to be corrected.

All custom code on this project should:

- Adhere to [Drupal coding standards](https://www.drupal.org/coding-standards) and best practices.
- Use semantic naming for code readability.
- Employ [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) principles.
- Be well commented and documented according to [Drupal standards](https://www.drupal.org/node/1354) for PHP and [JSDoc standards](http://usejsdoc.org) for Javascript.

There are Gulp tasks included in this project to help check your custom code for common errors. From within the project you can run:

- `gulp lint` to lint all of your custom code.
- `gulp phpcs` to lint only custom PHP code.
- `gulp eslint` to lint only custom Javascript code.
