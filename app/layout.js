import "./globals.css";


export const metadata = {
  title: "Authentication",
  description: "Authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        
        {children}
        
        </body>
    </html>
  );
}
