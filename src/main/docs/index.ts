import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'EasyChat - Self-Service Chats',
    description: 'API to EasyChat service',
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
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }, {
    name: 'Chat',
    description: 'APIs relacionadas a Chat'
  }],
  paths,
  schemas,
  components
}
