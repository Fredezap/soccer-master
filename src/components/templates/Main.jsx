const Main = () => {
  return (
    <div>
      {/* Logo */}
      <a href="https://colorlib.com/wp/templates/">
        <img
          src="https://colorlib.com/wp/wp-content/uploads/sites/2/colorlib-push-logo.png"
          alt="Colorlib logo"
          style={{ margin: '0 auto', display: 'block', marginTop: '20%' }}
        />
      </a>

      {/* Texto principal */}
      <h1 style={{ textAlign: 'center' }}>Thank you for using our template!</h1>
      <p style={{ textAlign: 'center' }}>
        For more awesome templates please visit{' '}
        <strong>
          <a href="https://colorlib.com/wp/templates/">Colorlib</a>
        </strong>.
      </p>

      {/* Mensaje de copyright */}
      <br />
      <p style={{ textAlign: 'center', color: 'red' }}>
        <strong>Copyright information for the template can&apos;t be altered/removed unless you purchase a license.</strong>
      </p>
      <p style={{ textAlign: 'center' }}>
        <strong>Removing copyright information without the license will result in suspension of your hosting and/or domain name(s).</strong>
      </p>
      <p style={{ textAlign: 'center' }}>
        <strong>
          More information about the license is available{' '}
          <a href="https://colorlib.com/wp/licence/">here</a>.
        </strong>
      </p>
    </div>
  )
}

export default Main