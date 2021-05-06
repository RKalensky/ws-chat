import React from 'react';

export default ({
  collection = [],
  mapperCb,
  fallbackMessage,
}) => (
  <>
    { collection.length ? collection.map(mapperCb) : <p className="fallback-message">{ fallbackMessage }</p> }
  </>
);
