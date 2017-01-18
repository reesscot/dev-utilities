#!/usr/bin/env node
'use strict';

var chalk = require('chalk');
var clear = require('clear');
var CLI = require('clui');
var figlet = require('figlet');
var inquirer = require('inquirer');
var Spinner = CLI.Spinner;
var git = require('simple-git')();
var fs = require('fs');
var createNewFeature = require('./create-new-feature');

var exec = require('child_process').exec;

clear();
console.log(chalk.yellow(figlet.textSync('WVUS DEV', { horizontalLayout: 'half' })));

function initCommand(callback) {
  var questions = [{
    name: 'initCommand',
    type: 'rawlist',
    message: 'What would you like to do?',
    choices: ['create new feature', 'get code review', 'prep feature for qa testing'],
    default: ['create new feature']
  }];

  inquirer.prompt(questions).then(callback);
}

initCommand(function () {
  if (arguments[0].initCommand === 'create new feature') {
    createNewFeature.execute();
  }
});