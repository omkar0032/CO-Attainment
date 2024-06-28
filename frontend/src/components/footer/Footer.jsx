import React from "react";
import "../css/footer.css";
export default function Footer() {
  return (
    <>
      <footer class="footer">
        <div class="contact-info">
          <h2 >Contact Us</h2>
          <p>Email: info.pict.edu.in</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: Survey No. 27, Near, Trimurti Chowk, Bharati Vidyapeeth Campus, Dhankawadi, Pune, Maharashtra 411043</p>
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
        Copyright © 2024 <a href="https://pict.edu" target="_blank" rel="noopener noreferrer">pict.edu</a>. All Rights Reserved.
    </small>
</footer>
    </>
  );
}
