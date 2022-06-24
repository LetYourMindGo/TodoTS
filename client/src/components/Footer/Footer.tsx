import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="page-footer">
      <div className="page-footer__github">
        <a href="https://github.com/LetYourMindGo">
          <img src="https://avatars.githubusercontent.com/u/89615997?v=4" alt="Igor Puris" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
