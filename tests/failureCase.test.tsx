import React from "react"
import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

class Counter {
  count = 0
  increment() {
    this.count++
  }
}

function Count() {
  const counter = new Counter()
  return (
    <div>
      <p>Count: {counter.count}</p>
      <button onClick={() => counter.increment()}>Increment</button>
    </div>
  )
}

describe("class state", () => {
  test("does not update count when increment is clicked", async () => {
    render(<Count />)

    const button = screen.getByRole("button", { name: /increment/i })
    await userEvent.click(button)

    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
  })
})
