"use client"

import React, { useRef, useEffect, useState } from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "cn"
import { ArrowRight } from "lucide-react"

interface CTAButtonProps extends ButtonPrimitive.Props {
  children: React.ReactNode
  className?: string
}

export function CTAButton({ children, className, ...props }: CTAButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const needleRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  const handleMouseEnter = () => {
    if (hasPlayed || !buttonRef.current || !needleRef.current || !arrowRef.current) return

    // 1. Needle Pass (440ms --ease-in-out)
    const needleAnim = needleRef.current.animate(
      [
        { left: "-10%", opacity: 0 },
        { left: "10%", opacity: 1, offset: 0.2 },
        { left: "110%", opacity: 1 },
        { left: "120%", opacity: 0 },
      ],
      {
        duration: 440,
        easing: "cubic-bezier(0.77, 0, 0.175, 1)", // --ease-in-out from tokens.css
      }
    )

    // 2. Pull-through Arrow (WAAPI)
    const arrowOut = arrowRef.current.animate(
      [
        { transform: "translateX(0)", opacity: 1 },
        { transform: "translateX(20px)", opacity: 0 },
      ],
      {
        duration: 200,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)", // --ease-out
        delay: 220,
      }
    )

    const arrowIn = arrowRef.current.animate(
      [
        { transform: "translateX(-20px)", opacity: 0 },
        { transform: "translateX(0)", opacity: 1 },
      ],
      {
        duration: 200,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)", // --ease-out
        delay: 420,
      }
    )

    // 3. Letter Rolling (handled by CSS transitions triggered by a class)
    // We apply a class to the label to start the roll.
    const label = buttonRef.current.querySelector(".cta-label")
    if (label) {
      label.classList.add("is-rolling")
      setTimeout(() => {
        label.classList.remove("is-rolling")
      }, 660) // needle duration approx
    }

    setHasPlayed(true)
  }

  return (
    <ButtonPrimitive
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "group relative overflow-hidden inline-flex items-center justify-center px-6 py-3 bg-accent text-on-accent font-medium transition-colors hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-focus outline-none",
        className
      )}
      {...props}
    >
      {/* Needle */}
      <div
        ref={needleRef}
        className="absolute top-0 bottom-0 w-[2px] bg-ink pointer-events-none z-10 opacity-0"
        style={{ left: "-10%" }}
      />

      {/* Label Container */}
      <div className="relative flex items-center gap-2 overflow-hidden">
        <span className="cta-label relative inline-block">
          {/* We split children into letters for the roll effect */}
          {typeof children === "string" ? (
            Array.from(children).map((char, i) => (
              <span
                key={i}
                className="relative inline-block overflow-hidden"
                style={{ verticalAlign: "top" }}
              >
                <span className="inline-block transition-transform duration-[260ms] ease-out group-hover:is-rolling:translate-y-full">
                  {char === " " ? " " : char}
                </span>
                <span className="absolute top-full left-0 inline-block transition-transform duration-[260ms] ease-out group-hover:is-rolling:translate-y-0">
                  {char === " " ? " " : char}
                </span>
              </span>
            ))
          ) : (
            children
          )}
        </span>

        {/* Arrow */}
        <div ref={arrowRef} className="relative">
          <ArrowRight className="size-4" />
        </div>
      </div>

      <style jsx>{`
        .cta-label span {
          display: inline-block;
        }
        .is-rolling > span:first-child {
          transform: translateY(100%);
        }
        .is-rolling > span:last-child {
          transform: translateY(0);
        }
      `}</style>
    </ButtonPrimitive>
  )
}
