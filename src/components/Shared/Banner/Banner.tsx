import { FC } from "react";
import './_Banner.scss';

interface BannerProps {
  title: string;
  src: string;
}

const Banner:FC<BannerProps> = ({ title, src }) => {
  return (
    <div className="banner">
      <h1 className="banner-title">{title}</h1>
      <img src={src} alt="banniere-sciences-nation" className="banner-img" />
    </div>
  );
};

export default Banner;