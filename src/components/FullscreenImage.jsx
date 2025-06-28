import heroImage from '../assets/hero-img.jpg';

const FullscreenImage = () => (
  <div
    className="w-full h-80 bg-cover bg-center"
    style={{ backgroundImage: `url(${heroImage})` }}
  />
);
