const environments = {
  local: {
    baseURL: 'http://localhost:8080',
    timeout: 5000
  },
  radmin: {
    baseURL: 'http://26.70.60.171:8080', // Coloque seu IP do Radmin aqui
    timeout: 10000
  }
};

// Mude apenas esta linha para trocar o ambiente
const CURRENT_ENV = 'local'; // Opções: 'local', 'radmin'

const config = environments[CURRENT_ENV];

export const buildURL = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${config.baseURL}${cleanEndpoint}`;
};

export const baseURL = config.baseURL;
export const API_BASE_URL = config.baseURL;
export const timeout = config.timeout;
export const API_TIMEOUT = config.timeout;
export const currentEnvironment = CURRENT_ENV;

export default config;