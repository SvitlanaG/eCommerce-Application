import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          <p className="text-info text-info-large">
            Copyright &#169;2024 Book Lounge Online. All rights reserved
          </p>
        </div>
        <div className={styles['social-icons']}>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
