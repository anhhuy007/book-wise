import Lottie, { LottiePlayer } from "lottie-react";
import loadingAnimation from "@/assets/animations/loading.json";

export default function LoadingAnimation() {
  return (
    <div className="flex justify-center items-center h-40 w-40">
      <Lottie
        animationData={loadingAnimation} // Changed from src to animationData
        loop={true}
        autoplay={true}
      />
    </div>
  );
}
