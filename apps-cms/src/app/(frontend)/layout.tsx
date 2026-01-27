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
    <html lang="en" className="dark-mode">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --bg-color: #000000;
                --text-color: #ffffff;
                --secondary-text: #999999;
                --border-color: #222222;
              }
              html:not(.dark-mode) {
                --bg-color: #ffffff;
                --text-color: #000000;
                --secondary-text: #666666;
                --border-color: #eeeeee;
              }
              html, body {
                background: var(--bg-color);
                color: var(--text-color);
                margin: 0;
                padding: 0;
                transition: background-color 0.2s ease, color 0.2s ease;
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
