import React from "react";
import "../css/footer.css";
export default function Footer() {
  return (
    <>
      <footer class="footer">
        <div class="contact-info">
          <h2>Contact Us</h2>
          <p>Email: info.pict.edu.in</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 123 Street, City, Country</p>
        </div>
        <div class="social-links">
          <a href="https://facebook.com/example" target="_blank">
            Facebook
          </a>
          <a href="https://twitter.com/example" target="_blank">
            Twitter
          </a>
          <a href="https://instagram.com/example" target="_blank">
            Instagram
          </a>
          <a href="https://linkedin.com/company/example" target="_blank">
            LinkedIn
          </a>
        </div>

        <small>
          Copyright © 2023 Football History Archives. All Rights Reserved.
        </small>
      </footer>
    </>
  );
}
