import React from 'react'
import '../../globals.css';


export const metadata = {
  description: 'dhk Architects, Urban Designers and Interior Designers.',
  title: 'dhk | architecture . urban design . interior design',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="dark-mode">
      <body>{children}</body>
    </html>
  )
}
