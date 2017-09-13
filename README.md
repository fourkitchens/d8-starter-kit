# Drupal 8 Starter Kit

## Initial project setup

When first setting up a new project there are a few configuration variables that need to be set.

In `project.yml` set project values for:
```
env:
  default:
    project_name: "my-project"
    alias: "@my-project.local"
    database: "my-project"
```

In `config.yml` set `vagrant_machine_name` to the same value you set for `env.default.project_name` above:

```
vagrant_machine_name: my-project
```

## Local environment setup

Provided you have all of the system requirements in place you're just a couple of commands away from having the site set up locally and only one more beyond that if you want to use the virtual machine for your local environment (recommended).

**Requirements:**

- Node.js >= 4.5 (We recommend using [nvm](https://github.com/creationix/nvm) for managing Node JS versions on your machine)
- Composer

Install project Node.js dependencies by running:
`npm install` or `yarn` # NOTE: yarn is faster


Install Drupal and set up the local site by running:
```
gulp run -t setup
```

## Drupal VM

This project support Drupal VM for hosting a local development environment. If you want to use Drupal VM make sure you have the following requirements installed on your machine and follow the instructions below.

**Requirements:**

- Vagrant >= 1.8.6
- Ansible >= 2.1

Install Drupal VM, get a copy of the project database, and import configuration by running:
```
gulp run -t drupalvm
```

The VM provisioning should complete without errors. If so, you'll be able to access the site at [my-project.local](http://my-project.local).

If this is a new site without a database, go here to complete the Drupal install: [http://my-project.local/core/install.php](http://my-project.local/core/install.php).

You'll be able to access some helpful tools for the VM (like phpMyAdmin, Solr, and MailHog) at [http://my-project.local/dashboard](http://my-project.local/dashboard).

## Project run commands

There are a number of run commands configured for this project. These are essentially a series of commands that are run sequentially by gulp under a single command. The commands are defined in the `run` section of `project.yml`

You used a couple of these commands when setting up the project so you're already familiar with the syntax:
```
gulp run -t <command>
```

You can see a list of available commands by executing `gulp run` without any options.

If you'd like to create new commands or override any of the existing ones locally, you can do so in a `local.project.yml` file. Just follow the structure in `project.yml`.

For example, in your `local.project.yml` could contain:

```
run:
  yo:
    description: "Exclaims yo, yo."
    commands:
      - "echo \"Yo!\""
```

Then just run `gulp run -t yo` to execute your command.

## Code quality

This project uses linting tools provided by the [emulsify-gulp](https://github.com/fourkitchens/emulsify-gulp) package to test code quality and validate custom code using Drupal standards.

Code that doesn't pass these standards will cause the Circle CI build for your branch to fail. You can save yourself some time by testing your code locally before you commit:

`gulp lint` will test all custom PHP and Javascript code.

`gulp phpcs` will test custom PHP code.

`gulp eslint` will test custom Javascript code.
