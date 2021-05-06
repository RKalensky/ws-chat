import { useEffect, useRef } from 'react';

export default (cb, dependencies) => {
  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      cb();
    }
  }, dependencies);
};
