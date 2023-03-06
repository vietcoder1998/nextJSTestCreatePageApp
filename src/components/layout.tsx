import Header from "./header/Header";
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
