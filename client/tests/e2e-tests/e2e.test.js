module.exports = new (function () {
  const testCase = this;
  testCase['shows the landing page'] = function (client) {
    client
      .url('http://localhost:8000/')
      .waitForElementVisible('.container', 1500)
      .expect.element('.container').to.be.present;
    client.end();
  };
  testCase['landing page should have button text GET STARTED'] = function (client) {
    client
      .url('http://localhost:8000/')
      .waitForElementVisible('.container', 1500)
      .waitForElementVisible('#download-button', 1500)
      .expect.element('#download-button').text.to.equal('GET STARTED');
    client.end();
  };
  testCase['SignUp page should have heading text SIGN UP'] = function (client) {
    client
      .url('http://localhost:8000/login')
      .waitForElementVisible('.container-fluid', 1500)
      .waitForElementVisible('.signUp h4', 1500)
      .expect.element('.signUp h4').text.to.equal('SIGN UP');
    client.end();
  };
  // testCase['SignUp page should successfully signUp a new user'] = function (client) {
  //   client
  //     .url('http://localhost:8000/login')
  //     .waitForElementVisible('.container-fluid', 1500)
  //     .waitForElementVisible('.signUp h4', 1500)
  //     .waitForElementVisible('.row', 1500)
  //     .waitForElementVisible('.input-field', 1500)
  //     .waitForElementVisible('.name', 3500)
  //     .setValue('.name', 'Guy Richards')
  //     .pause(2000)
  //     .setValue('.user-name', 'Richie2')
  //     .pause(3000)
  //     .setValue('.email', 'Richie1@testing.com')
  //     .pause(3000)
  //     .setValue('.password', 'abc123')
  //     .pause(3000)
  //     .setValue('.confirm-password', 'abc123')
  //     .pause(3000)
  //     .waitForElementVisible('.btn-large', 1500)
  //     .pause(2000)
  //     .click('.btn-large')
  //     .pause(5000)
  //     .waitForElementVisible('.wrapper', 2500)
  //     .expect.element('.wrapper').to.be.visible;
  //   client.end();
  // };
  testCase['SignIn page should successfully signIn registered user'] = function (client) {
    client
      .url('http://localhost:8000/login')
      .waitForElementVisible('.container-fluid', 1500)
      .waitForElementVisible('.row', 1500)
      .waitForElementVisible('.message', 1500)
      .waitForElementVisible('.toggler2', 3500)
      .click('.toggler2')
      .pause(3500)
      .waitForElementVisible('.input-field', 2500)
      .waitForElementVisible('.email', 1500)
      .pause(3000)
      .setValue('.email', 'Richie1@testing.com')
      .pause(3000)
      .setValue('.password', 'abc123')
      .pause(3000)
      .waitForElementVisible('.btn-large', 1500)
      .pause(2000)
      .click('.btn-large')
      .pause(5000)
      .waitForElementVisible('.wrapper', 2500)
      .expect.element('.wrapper').to.be.visible;
    client.end();
  };
  testCase['Signed In users should be able to create an Idea'] = function (client) {
    client
      .url('http://localhost:8000/login')
      .waitForElementVisible('.container-fluid', 1500)
      .waitForElementVisible('.row', 1500)
      .waitForElementVisible('.message', 1500)
      .waitForElementVisible('.toggler2', 1500)
      .pause(2000)
      .click('.toggler2')
      .pause(3000)
      .waitForElementVisible('.input-field', 1500)
      .waitForElementVisible('.email', 1500)
      .pause(3000)
      .setValue('.email', 'Richie1@testing.com')
      .pause(3000)
      .setValue('.password', 'abc123')
      .pause(3000)
      .waitForElementVisible('.btn-large', 1500)
      .pause(2000)
      .click('.btn-large')
      .pause(5000)
      .waitForElementVisible('.wrapper', 2500)
      .pause(2000)
      .waitForElementVisible('#menu-toggle', 2000)
      .pause(2000)
      .click('#menu-toggle')
      .pause(2000)
      .waitForElementVisible('.toggled', 2000)
      .pause(1500)
      .waitForElementVisible('.title', 2000)
      .setValue('.title', 'e2e Testing')
      .pause(1000)
      .waitForElementVisible('#category', 2000)
      .setValue('#category', 'Information Technology')
      .pause(1000)
      .waitForElementVisible('#textarea1', 3000)
      .setValue('#textarea1', 'e2e testing is sweet sha!!')
      .pause(1500)
      .waitForElementVisible('#create', 3000)
      .expect.element('#create').to.be.visible;
    client.end();
  };
})();


// module.exports = {
//   'shows the landing page': function (client) {
//     client
//       .url('http://localhost:8000/')
//       .waitForElementVisible('.container', 1500)
//       .expect.element('.container').to.be.present;
//     client.end();
//   },
// };

