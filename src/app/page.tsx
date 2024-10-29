"use client";
import { Button } from "@/components/ui/button"

export default function Home() {
  return(
    <div>
      <Button onClick={() => {alert("Welcome to JCOLESCANVAS")}}>
        JColesCanvas
      </Button>
    </div>
  )
}