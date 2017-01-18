const CLI         = require('clui');
const inquirer    = require('inquirer');
const Spinner     = CLI.Spinner;
const git         = require('simple-git')();
const fs          = require('fs');
let branchName = '';
let siteName = '';

exports.execute = () => {

  getbranchName(function() {
    branchName = arguments[0].branchName.toLowerCase();
    siteName = arguments[0].siteName.toLowerCase();
    if(branchName) {
      createNewBranch(branchName, runMultiDevCreation);
    }
  });

};

function runMultiDevCreation(branchName) {

  askCreateMultidev(function() {
    // hello
    if (arguments[0].createMultidev) {
      const terminusVersion = arguments[0].terminusVersion || '';
      if (terminusVersion && terminusVersion === '0.x') {
        createMultidev(branchName, siteName);
      } else {
        console.log('Terminus version not supported at this time.');
      }
    } else {
      console.log('...No multidev will be created...')
    }
  });

}

/**
 * [createMultidev description]
 * Hattip: https://dzone.com/articles/execute-unix-command-nodejs
 * @return {[type]} [description]
 */
function createMultidev(branchName, siteName) {
  if (!branchName || !siteName) return false;

  const terminusCommand = 'terminus site create-env --site=' + siteName + ' --to-env=' + branchName + ' --from-env=live';
  console.log('Executing command: ' + terminusCommand);

  const status = new Spinner('Creating multidev on ' + siteName + ' for branch ' + branchName + '...');
  status.start();

  exec(terminusCommand, function (error, stdout, stderr) {
    console.log('Result: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    status.stop();
  });
}

function getbranchName(callback) {
  const questions = [
    {
      name: 'branchName',
      type: 'input',
      message: 'Enter your JIRA Ticket number or desired branch name:',
      validate: function( value ) {
        if (value.length && value.length <= 11) {
          return true;
        } else {
          return 'Invalid length (max 11 characters). Please';
        }
      }
    },
    {
      name: 'siteName',
      type: 'rawlist',
      message: 'Select your site name',
      choices: ['core3','wvcore2','p2p','cn'],
      default: ['core3']
    }
  ];

  inquirer.prompt(questions).then(callback);
}

function askCreateMultidev(callback) {
  const questions = [
    {
      name: 'createMultidev',
      type: 'confirm',
      message: 'Would you like a Multidev created for this feature?',
      default: true
    },
    {
      name: 'terminusVersion',
      type: 'rawlist',
      message: 'Select your Terminus version',
      choices: ['0.x', '1.x'],
      default: ['0.x'],
      when: function( value ) {
        return value.createMultidev === true;
      }
    }
  ];

  inquirer.prompt(questions).then(callback);
}

function createNewBranch(branchName, callback) {
  const status = new Spinner('Creating new branch...');
  status.start();

  git
    .checkout('master')
    .pull('all','master')
    .checkoutLocalBranch(branchName)
    .push('all', branchName)
    .then(function(){
      status.stop();
      return callback(branchName);
    });
}
