import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SearchComponent() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input
          id={id}
          className="pe-11"
          placeholder="Search..."
          type="search"
        />
      </div>
    </div>
  )
}