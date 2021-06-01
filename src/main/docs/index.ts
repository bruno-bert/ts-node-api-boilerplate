export default {
  openapi: '3.0.0',
  info: {
    title: 'TS Node API Boilerplate',
    description: 'API Documentation for TS Node Boilerplate',
    version: '1.0.0',
    contact: {
      name: 'Bruno Bertoni de Paula',
      email: 'bruno.bert.jj@gmail.com',
      url: 'https://www.linkedin.com/in/bdepaula'
    },
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html'
    }
  },
  externalDocs: {
    description: 'My portfolio',
    url: 'https://brunodeveloper.netlify.app'
  },
  servers: [{
    url: '/api',
    description: 'Main Route'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs related to Login'
  }, {
    name: 'Other',
    description: 'APIs related to Others'
  }]
}
