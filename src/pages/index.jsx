function Index() {
  return <p>This is Next.js Serverless on Firebase.</p>
}

Index.getInitialProps = async () => {
  console.log(
      "Defining this function so that Next.js compiles this page as a \"lambda\".",
  )
  return {}
}

export default Index
