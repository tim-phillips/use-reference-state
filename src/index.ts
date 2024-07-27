import { useReducer, useRef } from "react"

/**
 * A hook that triggers a re-render when any property is set on an object.
 *
 * @param object The object to proxy.
 * @returns The proxied object.
 * @example
 * ```tsx
 * class Counter {
 *   count = 0
 *   increment() {
 *     this.count++
 *   }
 * }
 *
 * export function Count() {
 *   const counter = useReferenceState(new Counter())
 *   return (
 *     <div>
 *       <p>Count: {counter.count}</p>
 *       <button onClick={() => counter.increment()}>Increment</button>
 *     </div>
 *   )
 * }
 * ```
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
 */
export function useReferenceState<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string | number | symbol, any>,
>(object: T): T {
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const proxyRef = useRef(
    new Proxy(object, {
      set(target, prop, value, receiver) {
        if (target[prop] !== value) {
          const result = Reflect.set(target, prop, value, receiver)
          if (result) forceUpdate()
          return result
        }
        return Reflect.set(target, prop, value, receiver)
      },
    }),
  )
  return proxyRef.current
}
