import {
  FaFacebook,
  FaDiscord,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa';
import styles from './Footer.module.scss';
import rsIcon from '../../assets/icons/rs.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.contacts}>
            <a href="https://rs.school/" target="_blank" rel="noreferrer">
              <img src={rsIcon} alt="RS School" />
            </a>
            <a
              href="https://github.com/arastepa"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://github.com/Maslovars"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://github.com/SvitlanaG"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
          </div>
          <div className={styles.copyright}>
            <p className="text-info text-info-large">
              &#169;2024 Book Lounge Online
            </p>
          </div>
          <div className={styles['social-icons']}>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
            <a href="https://discord.com/" target="_blank" rel="noreferrer">
              <FaDiscord />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
