import {useRef} from 'react';
import _ from '../@lodash/@lodash';

function useDebounce(func: any, wait: any, options?: any) {
  return useRef(_.debounce(func, wait, options)).current;
}

export default useDebounce;
