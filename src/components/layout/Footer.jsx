export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <p className="footer__logo"> Aarvi's Shop</p>
          <p className="footer__tagline">Quality products, fair prices, fast shipping.</p>
        </div>

        <div>
          <h3>Shop</h3>
          <ul>
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home &amp; Kitchen</li>
            <li>Sports &amp; Outdoors</li>
          </ul>
        </div>

        <div>
          <h3>Support</h3>
          <ul>
            <li>Contact us</li>
            <li>Shipping &amp; returns</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div>
          <h3>Company</h3>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Privacy policy</li>
          </ul>
        </div>
      </div>

      <p className="footer__copyright">© {year}  Aarvi's Shop. All rights reserved.</p>
    </footer>
  );
}
