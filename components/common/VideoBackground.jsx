// components/common/VideoBackground.jsx
export default function VideoBackground({ country }) {
    const videoSrc = `/videos/${country}.mp4`;
    
    return (
      <div className="relative h-screen">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <EnquiryForm />
        </div>
      </div>
    );
  }