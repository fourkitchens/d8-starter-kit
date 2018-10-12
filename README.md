# Drupal 8 Starter Kit

## Initial project setup

## Local environment setup

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
  word:
    description: "Exclaims word."
    commands:
      - "echo \"Word!\""
```

Then just run `gulp run -t yo` to execute your command.

## Code quality

This project uses linting tools provided by the [emulsify-gulp](https://github.com/fourkitchens/emulsify-gulp) package to test code quality and validate custom code using Drupal standards.

Code that doesn't pass these standards will cause the Circle CI build for your branch to fail. You can save yourself some time by testing your code locally before you commit:

`gulp lint` will test all custom PHP and Javascript code.

`gulp phpcs` will test custom PHP code.

`gulp eslint` will test custom Javascript code.
