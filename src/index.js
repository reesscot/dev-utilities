#!/usr/bin/env node
const chalk       = require('chalk');
const clear       = require('clear');
const CLI         = require('clui');
const figlet      = require('figlet');
const inquirer    = require('inquirer');
const Spinner     = CLI.Spinner;
const git         = require('simple-git')();
const fs          = require('fs');
const createNewFeature  = require('./create-new-feature');

const exec = require('child_process').exec;

clear();
console.log(
  chalk.yellow(
    figlet.textSync('WVUS DEV', { horizontalLayout: 'half' })
  )
);

function initCommand(callback) {
  const questions = [
    {
      name: 'initCommand',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: ['create new feature', 'get code review', 'prep feature for qa testing'],
      default: ['create new feature']
    }
  ];

  inquirer.prompt(questions).then(callback);
}

initCommand(function(){
  if(arguments[0].initCommand === 'create new feature') {
    createNewFeature.execute();
  }
})
