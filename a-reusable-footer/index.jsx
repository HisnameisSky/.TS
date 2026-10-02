import React from 'react';

export const Footer = () => {
  return (
    <footer>
      {/* リスト 1 (最低2つのアイテム) */}
      <ul>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Careers</a></li>
      </ul>

      {/* リスト 2 (最低2つのアイテム) */}
      <ul>
        <li><a href="#">Help Center</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>

      {/* リスト 3 (最低2つのアイテム) */}
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
      </ul>

      {/* 著作権シンボル（©）を含む段落 */}
      <p>© 2026 My App. All rights reserved.</p>
    </footer>
  );
};

//alt

export const Footer = () => {
  return (<footer className='footer-container'>
  <section>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Skills</a></li>
  </ul>
  </section>

  <section>
  <ul>
    <li><a href="#">Experience</a></li>
    <li><a href="#">Portfolio</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
  </section>

  <section>
    <ul>
      <li><a href="#">LinkedIn</a></li>
      <li><a href="#">Facebook</a></li>
      <li><a href="#">GitHub</a></li>
    </ul>
  </section>

  <p className="copyright">&copy; Derek Dhammaloka 2025</p>
  </footer>);
};