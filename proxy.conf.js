const HttpsProxyAgent = require('https-proxy-agent');

/*
 * API proxy configuration.
 * This allows you to proxy HTTP request like `http.get('/api/stuff')` to another server/port.
 * This is especially useful during app development to avoid CORS issues while running a local server.
 * For more details and options, see https://angular.io/guide/build#using-corporate-proxy
 */
const proxyConfig = [
  {
    context: '/api',
    pathRewrite: { '^/api': '' },
    target: 'https://api.chucknorris.io',
    changeOrigin: true,
    secure: false
  },
  {
    context: '/hello-fresh',
    pathRewrite: { '^/hello-fresh': '' },
    target: 'https://gw.hellofresh.com/api',
    changeOrigin: true,
    secure: false
  },
  {
    context: '/hello-fe',
    pathRewrite: { '^/hello-fe': '' },
    target: 'https://www.hellofresh.be/',
    changeOrigin: true,
    secure: false
  },
  {
    context: '/colruyt',
    pathRewrite: { '^/colruyt': '' },
    target: 'https://cogomw.colruyt.be/cogomw/rest/fr/4/',
    changeOrigin: true,
    secure: false
  },
];

/*
 * Configures a corporate proxy agent for the API proxy if needed.
 */
function setupForCorporateProxy(proxyConfig) {
  if (!Array.isArray(proxyConfig)) {
    proxyConfig = [proxyConfig];
  }

  const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  let agent = null;

  if (proxyServer) {
    console.log(`Using corporate proxy server: ${proxyServer}`);
    agent = new HttpsProxyAgent(proxyServer);
    proxyConfig.forEach(entry => { entry.agent = agent; });
  }

  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
