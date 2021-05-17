import { useEffectOnceWhen } from './useEffectOnceWhen';
import { useUpdateEffect } from './useUpdateEffect';
import { useWillUnmount } from './useWillUnmount';

/**
 * useLifecycleLogger hook
 *
 * @param componentName Name of the component
 * @param rest
 */
const useLifecycleLogger = (componentName: string = 'Component', ...rest) => {
  useEffectOnceWhen(() => {
    console.log(`${componentName} mounted`, ...rest);

    return () => console.log(`${componentName} unmounted`);
  });

  useUpdateEffect(() => {
    console.log(`${componentName} updated`, ...rest);
  });

  useWillUnmount(() => {
    console.log(`${componentName} will unmount`, ...rest);
  });
};

export { useLifecycleLogger };
