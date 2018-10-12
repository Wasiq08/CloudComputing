// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,

  // authBaseUrl: 'http://192.168.1.116/qa/api/',
  // apiBaseUrl: 'http://192.168.1.116/qa/api/',

  authBaseUrl : 'http://devops/identityserver_qa/',
  apiBaseUrl : 'http://devops/qa.webapi/api/',

  webAppUrl: '',
  // webAppUrl : 'nbp-lcms-app-qa',
  device: 'web',
  grant_type: 'password',
  client_id: 'ro.web.client',
  client_secret: 'secret',
  scope: 'API'
};

