import React from 'react'
import '../../globals.css';
// import './styles.css';


export const metadata = {
  description: 'dhk Architects, Urban Designers and Interior Designers.',
   title: 'dhk | architecture . urban design . interior design',
  // viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
