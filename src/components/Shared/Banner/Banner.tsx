import { FC } from "react";
import './_Banner.scss';
import bannerImg from "../../../assets/banner1.jpg";

interface BannerProps {
  title?: string;
  src?: string;
}

const Banner:FC<BannerProps> = ({ title, src }) => {
  return (
    <div className="banner">
      <h1 className="banner-title">{title ?? "Sciences Nation"}</h1>
      <img src={src ?? bannerImg} alt="banniere-sciences-nation" className="banner-img" />
    </div>
  );
};

export default Banner;