import { AnimatePresence, easeIn, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./SplashScreen.css";

function SplashScreen() {
  const splashScreenVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5, ease: easeIn },
    },
    zoomOut: {
      scale: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 800);
    setTimeout(() => {
      setIsActive(false);
    }, 2300);
    setTimeout(() => {
      navigate("/app/home");
    }, 2700);
  }, [navigate]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.main
          className="splash-screen"
          variants={splashScreenVariants}
          exit="zoomOut"
        >
          <motion.section
            className="sc-content"
            variants={splashScreenVariants}
            initial="hidden"
            animate="visible"
          >
            <h2>
              <span>BIENVENUE</span>
              <span>SUR</span>
            </h2>
            <img src="Logo_UnderTone.png" alt="Logo UnderTone" />
            <h1>UNDERTONE</h1>
          </motion.section>
        </motion.main>
      )}
    </AnimatePresence>
  );
}

export default SplashScreen;
