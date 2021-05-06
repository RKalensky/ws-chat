export default (source = '', ...rest) => (`${source} ${rest.join(' ')}`).trim() || null;
