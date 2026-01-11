## 2024-07-15 - React.memo is ineffective with JSX props

**Learning:** Applying `React.memo` to a component that accepts JSX elements as props (e.g., `illustration={<SomeIcon />}`) provides no performance benefit. The JSX element is a new object on every parent render, causing `React.memo`'s shallow prop comparison to always fail and trigger a re-render.

**Action:** Before using `React.memo`, verify that the component's props are stable. For JSX props, either the parent component must memoize the JSX with `useMemo`, or the component's API should be changed to accept a component type (`React.ComponentType`) instead of a `React.ReactNode` to ensure a stable reference.
