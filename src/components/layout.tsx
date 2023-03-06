import Header from "./header/Header";
<<<<<<< HEAD

export default function Layout({ children }: any) {
    return (
      <html lang="en">
        <Header />
        <main>{children}</main>
      </html>
    )
  }
=======
import "@/pages/global.css";

export default function Layout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
>>>>>>> Initial commit from Create Next App
