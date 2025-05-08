"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";

const Footer = () => {
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const router = useRouter();

  const handleDiscoverMoreClick = () => {
    router.push("/about-us");
  };

  useEffect(() => {
    if (inView) {
      controlsLeft.start({ x: 0, opacity: 1, transition: { duration: 1 } });
      controlsRight.start({ x: 0, opacity: 1, transition: { duration: 1 } });
    }
  }, [inView]);

  return (
    <footer ref={ref} className="relative pt-32 pb-36 bg-black text-white">
      {/* Background Shapes */}
      <div className="absolute left-0 top-0">
        <Image
          src="/images/footer/left-tree.webp"
          alt="Left Shape"
          width={306}
          height={323}
          priority
        />
      </div>
      <div className="absolute right-0 top-0">
        <Image
          src="/images/footer/right-tree.webp"
          alt="Right Shape"
          width={452}
          height={497}
          priority
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <motion.div initial={{ x: -50, opacity: 0 }} animate={controlsLeft}>
            <div className="mb-6">
              <a href="/">
                <Image
                  src="/images/logos/craft.webp"
                  alt="Travello"
                  width={129}
                  height={40}
                  priority
                />
              </a>
            </div>
            <p className="text-gray-400 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </motion.div>

          {/* Company Links */}
          <motion.div initial={{ x: -50, opacity: 0 }} animate={controlsLeft}>
            <h3 className="text-lg font-semibold mb-6">Company:</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300"
                  onClick={handleDiscoverMoreClick}
                >
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Blog update
                </a>
              </li>
              <li>
                <a href="/destinations" className="hover:text-gray-300">
                  Our services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Testimonial
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ x: 50, opacity: 0 }} animate={controlsRight}>
            <h3 className="text-lg font-semibold mb-6">Quick Links:</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Privacy & policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Terms & conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Hydropower Plants
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Customer support
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter Subscription */}
          <motion.div initial={{ x: 50, opacity: 0 }} animate={controlsRight}>
            <h3 className="text-lg font-semibold mb-6">Subscribe Newsletter:</h3>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Enter your email:"
                className="px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button className="bg-primary text-white py-2 px-6 rounded-md hover:bg-opacity-90">
                Subscribe now
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
