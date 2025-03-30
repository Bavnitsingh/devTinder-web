const Footer = () => {
  return (
    <footer
      className="footer sm:footer-horizontal footer-center bg-info-content text-base-content p-4"
      style={{ position: "fixed", bottom: "0", left: "0", width: "100%" }}
    >
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved. Made
          with passion 🔥 and powered by innovation 🚀 by Bavnit Singh. Code, connect, collaborate – 👨‍💻 devTinder
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
