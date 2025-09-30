
import { Helmet } from "react-helmet"
import {Toaster} from "react-hot-toast"
const Layout = ({ children, author, keywords, description, title }) => {
  return (
    <div>
      <Helmet>
        <meta charset="UTF-8"></meta>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title >
      </Helmet>


      <main style={{ minHeight: "70vh" }}>
        {children}
     <Toaster />
      </main>

    </div>

  )
}
Layout.defaultProps = {
  title: "Ecommerce app- Shop now",
  description: "Here you can purchase anything you want",
  keywords: "shoes, shirts,watches",
  author: "Vivek"
}
export default Layout;