var _Environments = {
  DEVELOPMENT: {
    DOMAIN: 'http://192.168.1.46:8000/api/',
    IMG_DOMAIN: 'http://192.168.1.46:8000/storage/uploades/',
    APP_NAME: 'Trend',
  },
  PRODUCTION: {
    DOMAIN: 'http://nextstageksa.com/mytrend/api/',
    IMG_DOMAIN: 'https://nextstageksa.com/mytrend/storage/uploades/',
    Video: 'http://nextstageksa.com/mytrend/storage/',
    APP_NAME: 'Trend',
  },
};

module.exports = _Environments['PRODUCTION'];
