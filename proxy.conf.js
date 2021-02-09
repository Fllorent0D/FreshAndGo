const HttpsProxyAgent = require('https-proxy-agent');

const proxyConfig = [
  {
    context: '/hello-fresh',
    pathRewrite: { '^/hello-fresh': '' },
    target: 'https://gw.hellofresh.com/api',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
  },
  {
    context: '/hello-fe',
    pathRewrite: { '^/hello-fe': '' },
    target: 'https://www.hellofresh.be/',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
  },
  {
    context: '/colruyt',
    pathRewrite: { '^/colruyt': '' },
    target: 'https://cogomw.colruyt.be/cogomw/rest/fr/4/',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
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
    proxyConfig.forEach((entry) => {
      entry.agent = agent;
    });
  }

  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
