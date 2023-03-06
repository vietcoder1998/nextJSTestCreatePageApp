import Header from "./header/Header";

export default function Layout({ children }: any) {
    return (
      <html lang="en">
        <Header />
        <main>{children}</main>
      </html>
    )
  }