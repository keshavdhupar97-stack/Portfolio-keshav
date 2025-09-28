import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  MotionValue,
  motion,
  AnimatePresence,
  useSpring,
  useAnimationControls,
} from "framer-motion";
import { useIsTouchDevice } from "../../hooks/useIsTouchDevice";
import Curve from "./Curve";
import Overlay from "./Overlay";
import { X } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";
// import { delay } from "lodash";

type ProjectsSectionProps = {
  isProjectsInView: boolean;
  isMobile: boolean;
  backgroundGradient: MotionValue<string>;
};

export type Project = {
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
  imageDetail: string;
  description: string;
  technologies: string;
  color: string;
  link: string;
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delay: custom * 0
    },
  }),
  exit: {
    opacity: 0.6,
    y: 50,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const Projects: React.FC<ProjectsSectionProps> = ({
  isProjectsInView,
  isMobile,
  backgroundGradient,
}) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isScrolling, setIsScrolling] = useState(false);

  const isTouchDevice = useIsTouchDevice();

  const projectsControls = useAnimationControls();
  const [hasAnimated, setHasAnimated] = useState(false);

  const cursorX = useSpring(0, { stiffness: 200, damping: 50 });
  const cursorY = useSpring(0, { stiffness: 200, damping: 50 });

  const projects: Project[] =
    [
      {
        title: "The Cake Shop",
        description: "Cake Shop Prototype Design",
        link: "https://www.figma.com/proto/uArFOFuN0QyVt2UVMZZM3k/Cake-Prototype?page-id=0%3A1&node-id=0-3&viewport=25%2C288%2C0.16&t=pBWnCQ1H7QGavJ8m-1&scaling=min-zoom&content-scaling=fixed",
        category: "Prototype UI Design",
        image: "./img/strawberry.png",
        imageDetail: "./img/strawberry.png",
        year: "2024",
        color: "77, 128, 237",
        technologies: "Figma | Adobe Illustrator | Adobe Photoshop",
        number: "01",
      },
      {
        title: "Adidas Website Redesign",
        description: "Adidas Website Redesign Prototype",
        link: "https://www.figma.com/proto/lfg6cWt6jhM9VSpBtfcO0f/Adidas-Prototype?page-id=0%3A1&node-id=0-104&viewport=25%2C251%2C0.21&t=9UunMrJqWZkEI87J-1&scaling=min-zoom&content-scaling=fixed",
        category: "Prototype Design",
        image: "./img/Adidas.png",
        imageDetail: "./img/Adidas.png",
        year: "2024",
        color: "77, 128, 237",
        technologies: "Figma | Adobe Illustrator | Adobe Photoshop",
        number: "02",
      },
      {
        title: "Key Homes",
        description: "Real Estate App UI Design",
        link: "https://www.behance.net/gallery/228637311/Key-Homes-UI-Case-Study-Design",
        category: "UI Design",
        image: "./img/keyhomes.png",
        imageDetail: "./img/keyhomes.png",
        year: "2025",
        color: "77, 128, 237",
        technologies: "Figma | Adobe Illustrator | Adobe Photoshop",
        number: "03",
      },
      {
        title: "Audiora",
        description: "Music App UI Design",
        link: "https://www.figma.com/design/MKvAD75tuJ2hNe5TPkEVBk/Audiora-Music-App-UI?node-id=0-59&t=vED709cqiNlpGbsh-1",
        category: "UI Design",
        image: "./img/audiora.png",
        imageDetail: "./img/audiora.png",
        year: "2025",
        color: "77, 128, 237",
        technologies: "Figma | Adobe Illustrator",
        number: "04",
      },
    ];



  useEffect(() => {
    if (isProjectsInView && !hasAnimated) {
      projectsControls.start("visible");
      setTimeout(() => {
        setHasAnimated(true);
      }, 500);
    } else if (!isProjectsInView && hasAnimated) {
      projectsControls.start("hidden");
      setHasAnimated(false);
    }
  }, [isProjectsInView, projectsControls, hasAnimated, setHasAnimated]);

  // ----- Hover effect ----- //

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY],
  );

  const handleScroll = useCallback(() => {
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 100); // Debounce scrolling state
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const items = itemsRef.current;
    if (!items) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const checkHover = () => {
      if (isScrolling) {
        const hoverItem = document.elementFromPoint(
          cursorX.get(),
          cursorY.get(),
        );
        const projectItem = hoverItem?.closest(".project-item");
        if (projectItem) {
          const index = Array.from(items.children).indexOf(
            projectItem as Element,
          );
          setActiveIndex(index);
        } else {
          setActiveIndex(-1);
        }
      }
    };

    items.addEventListener("mouseleave", () => {
      setActiveIndex(-1);
    });

    const scrollCheckInterval = setInterval(checkHover, 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(scrollCheckInterval);
    };
  }, [isMobile, handleMouseMove, handleScroll, cursorX, cursorY, isScrolling]);

  // ----- Overlay ----- //

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsOverlayVisible(true);
  };

  const closeOverlay = () => {
    setIsContentVisible(false);
    setTimeout(() => {
      setIsOverlayVisible(false);
    }, 800);
  };

  const lenis = useLenis();

  useEffect(() => {
    if (isOverlayVisible) {
      lenis?.stop();
      document.documentElement.style.overflowY = "hidden";
      const timer = setTimeout(() => {
        setIsContentVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      lenis?.start();
      document.documentElement.style.overflowY = "auto";
    }
  }, [isOverlayVisible]);

  // ----- Image Preloading ----- //

  useEffect(() => {
    projects.map((project: Project) => {
      const img = new Image();
      img.src = project.image;

      const img2 = new Image();
      img2.src = project.imageDetail;
    });
  }, []);

  return (
    <motion.div
      style={{
        background: backgroundGradient,
        zIndex: isOverlayVisible ? 20 : 10,
      }}
      initial="hidden"
      animate={projectsControls}
      className="w-screen min-h-screen flex justify-center flex-col items-center relative z-10"
    >
      {isTouchDevice || (!isTouchDevice && isMobile) ? (
        <motion.div>
          <motion.h2
            custom={0}
            variants={fadeInUpVariants}
            className="poppins-light text-3xl tracking-[calc(3rem * 0.02)] text-center mb-10"
          >
            Selected Projects
          </motion.h2>

          {/* Mobile Version: Card like design */}
          <div className="grid grid-cols-2 grid-flow-row max-sm:grid-cols-1 gap-6 gap-y-32 px-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.number}
                className="w-80 max-sm:w-[80vw] flex flex-col gap-y-4 items-center"
                variants={fadeInUpVariants}
                onClick={() => handleProjectClick(project)}
                custom={index + 1}
              >
                <div
                  key={project.number}
                  className="w-80 aspect-[77/44] max-sm:w-[80vw] bg-cover bg-center rounded-xl"
                  style={{ backgroundImage: `url('${project.image}')` }}
                ></div>
                <h1 className="khula-regular text-4xl mt-8">{project.title}</h1>
                <hr />
                <div className="flex flex-row justify-between items-center w-full">
                  <p className="poppins-extralight text-lg">
                    {project.category}
                  </p>
                  <p className="poppins-extralight text-lg">{project.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate={projectsControls}
          className="max-w-[1000px] w-full flex justify-center flex-col items-center px-4"
        >
          <motion.h2
            custom={0}
            variants={fadeInUpVariants}
            className="poppins-light text-3xl tracking-[calc(3rem * 0.02)] mb-10"
          >
            Selected Projects
          </motion.h2>

          {hasAnimated && (
            <AnimatePresence>
              {activeIndex !== -1 && (
                <motion.div
                  ref={galleryRef}
                  className="fixed w-[385px] h-[200px] overflow-hidden pointer-events-none z-40 rounded-xl"
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.2 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  style={{
                    left: cursorX,
                    top: cursorY,
                    x: "-50%",
                    y: "-50%",
                  }}
                >
                  <motion.div
                    ref={imagesRef}
                    className="w-full h-[800px] flex flex-col"
                    animate={{ y: `-${200 * activeIndex}px` }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {projects.map((project) => (
                      <img
                        key={project.number}
                        className="w-full h-[200px] object-cover object-center"
                        src={project.image}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          <div
            ref={itemsRef}
            className="flex justify-center items-center flex-col w-full"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.number}
                className="flex flex-col w-full group project-item cursor-pointer"
                style={{ willChange: "transform, opacity" }}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleProjectClick(project)}
                variants={fadeInUpVariants}
                custom={index + 1}
              >
                <div className="w-full flex justify-between items-center h-[200px]">
                  <div className="flex justify-start items-start h-fit gap-x-4">
                    <p className="poppins-extralight text-2xl leading-none group-hover:text-gray-2 text-gray-3 transition-colors">
                      {project.number}
                    </p>
                    <h1 className="khula-regular text-6xl tracking-[calc(3.75rem * 0.03)] group-hover:text-gray-2 transition-all group-hover:ml-2">
                      {project.title}
                    </h1>
                  </div>
                  <p className="poppins-extralight text-lg pr-2 group-hover:text-gray-2 group-hover:pr-4 transition-all">
                    {project.category} | {project.year}
                  </p>
                </div>
                <hr className="w-full border-gray-1 group-hover:border-gray-4 transition-colors"></hr>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {(isOverlayVisible || selectedProject) && (
          <>
            <Curve isVisible={isOverlayVisible} />
            <motion.div
              className="fixed inset-0 w-full z-[999] flex items-center justify-center"
              style={{ pointerEvents: isContentVisible ? "auto" : "none" }}
              initial="hidden"
              animate={isOverlayVisible ? "visible" : "exit"}
              exit="exit"
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                {isContentVisible && selectedProject && (
                  <Overlay project={selectedProject} isMobile={isMobile} />
                )}
              </AnimatePresence>
            </motion.div>
            {isContentVisible && (
              <button
                onClick={closeOverlay}
                className="fixed z-[9999] top-6 right-6 px-4 py-2 text-light text-xl poppins-regular flex flex-row gap-x-2 items-center"
              >
                <X size={32} />
              </button>
            )}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;
