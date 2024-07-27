# `useReferenceState`

You don't always want to spread your business logic all over your components. Sometimes you want to keep it in one place. `useReferenceState` is a hook that allows you to use state from a reference value (such as an object, an array, or a class) inside your React application. Essentially, this hook will trigger a re-render when any property is set on the object.

## Usage

```tsx
class Counter {
  count = 0
  increment() {
    this.count++
  }
}

export function Count() {
  const counter = useReferenceState(new Counter())
  return (
    <div>
      <p>Count: {counter.count}</p>
      <button onClick={() => counter.increment()}>Increment</button>
    </div>
  )
}
```
