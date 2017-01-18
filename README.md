# feature-qa-ready
A simple NPM command line interface for preparing a branch for QA testing in a Pantheon Multidev Environment.

## What does it do?
* Moves ticket to QA on JIRA
* Creates Pantheon multidev (optional)
* Adds custom QA Testing Plan on JIRA ticket
* Adds 'ready to test' comment on JIRA ticket
* Adds Code review by: (added as comment to JIRA)


## Requirements
* Node v6.x
* [Terminus 0.13+](https://github.com/pantheon-systems/terminus)


## Installation Steps
1. Clone down the repo into your home folder:

  `git clone https://github.com/reescott/dev-utilities.git dev-utilities`
2. Browse to `dev-utilities` folder and install globally by running the following command:

  `npm install -g`

## Example usage:
1. Browse to the repo where your feature is ready to be prepared for QA testing.
2. Run the following command and answer the prompts

  `$ dev-utils`
