const FooterMeteo = function () {
  return (
    <footer className="text-center small mynav py-2">
      <p className="mb-0 text-white">
        MyMeteo - <span>{new Date().getFullYear()}</span>
      </p>
    </footer>
  )
}
export default FooterMeteo
