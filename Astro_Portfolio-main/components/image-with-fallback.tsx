"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

type ImageWithFallbackProps = ImageProps & {
  fallbackSrc: string
}

export default function ImageWithFallback({ src, fallbackSrc, alt, ...rest }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [error, setError] = useState(false)

  const handleError = () => {
    if (!error) {
      setImgSrc(fallbackSrc)
      setError(true)
    }
  }

  return <Image {...rest} src={imgSrc || "/placeholder.svg"} alt={alt} onError={handleError} />
}

