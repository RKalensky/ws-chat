const isProd = () => process.env.NODE_ENV === 'production';

export default () => (isProd()
  ? process.env.REACT_APP_PROD_BACKEND_URL
  : process.env.REACT_APP_DEV_BACKEND_URL
);
