"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

const fadeInFrom = (direction) => {
  const x = direction === "left" ? -50 : direction === "right" ? 50 : 0;
  const y = direction === "up" ? -50 : direction === "down" ? 50 : 0;

  return {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };
};

export default function AboutCompany() {
  const router = useRouter();

  const handleDiscoverMoreClick = () => {
    router.push('/about');
  };

  return (
    <section className="relative py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        className="absolute left-0 top-0 hidden lg:block"
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <Image src="/images/bg/cloud.webp" alt="cloud" width={180} height={180} />
      </motion.div>

      <motion.div
        className="absolute right-0 top-10 hidden lg:block"
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <Image src="/images/bg/rocket.webp" alt="rocket" width={180} height={180} />
      </motion.div>

      <div className="container mx-auto px-6 md:px-10 xl:px-20 flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Images Grid */}
        <motion.div
          className="w-full lg:w-1/2 mb-10 lg:mb-0"
          variants={fadeInFrom("left")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <div className="grid grid-cols-2 grid-rows-2 gap-6 max-w-[500px] mx-auto">
            {[1, 2, 3].map((item, i) => (
              <motion.div
                key={i}
                className={`rounded-xl overflow-hidden shadow-lg ${
                  i === 0 ? "col-span-1 row-span-2" : ""
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={`/images/bg/n${i + 1}.jpg`}
                  alt={`hike${i + 1}`}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left"
          variants={fadeInFrom("right")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <motion.p
            className="text-orange-600 dark:text-orange-400 font-semibold text-lg mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            About Company
          </motion.p>

          <motion.h2
            className="text-4xl font-bold leading-tight text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            Sollicitudin Vestibulum <br /> Vulputate Ipsum.
          </motion.h2>

          <motion.p
            className="text-gray-700 dark:text-gray-300 mb-8 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed tempor
            incididunt ut labore et dolore magna aliqua.
          </motion.p>

          {[
            {
              icon: 'flaticon-worker',
              title: 'Safety First Always',
              desc: 'Duis aute irure dolor in reprehenderit involuptate velit esse cillum dolore',
            },
            {
              icon: 'flaticon-tour-guide',
              title: 'Nllamco laboris nisi',
              desc: 'Duis aute irure dolor in reprehenderit involuptate velit esse cillum dolore',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start mb-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                delay: 0.4 + index * 0.2,
                ease: "easeOut",
              }}
            >
              <div className="text-orange-500 text-3xl mr-4 dark:text-orange-400">
                <i className={item.icon}></i>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}

          <motion.button
            onClick={handleDiscoverMoreClick}
            className="bg-orange-600 dark:bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-700 dark:hover:bg-orange-600 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            Discover More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}