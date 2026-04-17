import { useState } from "react";
import { hover, motion } from "framer-motion";
import "./Project.css";
import { ArrowUpRight, CornerUpRight, SquareArrowUpRight } from "lucide-react";

interface ProjectData {
  title: string;
  description?: string;
  coverImg: string;
  icon?: string;
  badges?: string[];
}

interface ProjectProps {
  Data: ProjectData;
}

export default function Project({ Data }: ProjectProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <motion.div
      className="project_wrapper"
      onHoverStart={() => {
        setHovered(true);
      }}
      onHoverEnd={() => {
        setHovered(false);
      }}
    >
      <div className="project_header">
        <div className="project_header_blur">
          <div className="project_header_blur_blur"></div>
        </div>
        <motion.img
          animate={{
            y: hovered ? -10 : 0,
            filter: hovered ? "saturate(1)" : "saturate(0.2)",
          }}
          transition={{ type: "spring", damping: 23 }}
          className="project_header_image"
          src={`./projects/${Data.title}/${Data.coverImg}`}
        />
      </div>
      <div className="project_body">
        <div className="project_body_header">
          <div className="project_body_header_left">
            <motion.div
              className="project_body_logo"
              animate={{
                scale: hovered ? 0.95 : 1,
              }}
            >
              {Data.icon ? (
                <img
                  className="project_body_logo_image"
                  src={`./projects/${Data.title}/${Data.icon}`}
                />
              ) : (
                <p>{Data.title.slice(0, 1)}</p>
              )}
            </motion.div>
            <motion.h3
              className="project_body_title"
              animate={{
                x: hovered ? 5 : 0,
                color: hovered ? "var(--text-heading)" : "var(--text-code)",
              }}
            >
              {Data.title || ""}
            </motion.h3>
          </div>
          <div className="project_body_header_right">
            <span className="project_body_header_right_arrow">
              <ArrowUpRight />
            </span>
          </div>
        </div>
        <div className="project_body_badges">
          {Data.badges?.map((badge, index) => {
            return (
              <motion.div
                key={index}
                className={`badge ${badge}`}
                initial={{ opacity: 0, y: -3 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 700,
                  damping: 20,
                  delay: (index+1) * 0.1,
                }}
                viewport={{ once: true }}
              >
                {badge}
              </motion.div>
            );
          })}
        </div>

        <p className="project_body_description">{Data.description}</p>
      </div>
    </motion.div>
  );
}
