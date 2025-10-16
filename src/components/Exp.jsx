import React from "react";
import react11 from "../images/logos/react11.png";
import tailwind from "../images/logos/tailwind.png";
import bootstrap from "../images/logos/bootstrap.png";
import html from "../images/logos/html.png";
import css from "../images/logos/css.png";
import github from "../images/logos/github.png";
import javascript from "../images/logos/javascript.png";
import mui from "../images/logos/mui.png";
import post from "../images/logos/post.png";
import filezilla from "../images/logos/filezilla.png";
import git from "../images/logos/git.png";
import shadcn from "../images/logos/shadcn-ui-seeklogo.png";
import typescript from "../images/logos/typescript.png";
import nextjs from "../images/logos/nextjs-svgrepo-com.png";
import testingLibrary from "../images/logos/testing-library-seeklogo.png";

const Exp = () => {
  const techs = [
    {
      id: 1,
      src: react11,
      title: "React Js",
      style: "shadow-blue-500",
    },
    {
      id: 2,
      src: nextjs,
      title: "Next.js",
      style: "shadow-gray-600",
    },
    {
      id: 3,
      src: javascript,
      title: "Javascript",
      style: "shadow-yellow-500",
    },
    {
      id: 4,
      src: typescript,
      title: "TypeScript",
      style: "shadow-blue-600",
    },
    {
      id: 5,
      src: html,
      title: "HTML",
      style: "shadow-orange-500",
    },
    {
      id: 6,
      src: css,
      title: "CSS",
      style: "shadow-sky-400",
    },
    {
      id: 7,
      src: tailwind,
      title: "Tailwind Css",
      style: "shadow-cyan-300 items-center justify-center  ",
    },
    {
      id: 8,
      src: bootstrap,
      title: "Bootstrap",
      style: "shadow-violet-400",
    },
    {
      id: 9,
      src: github,
      title: "Github",
      style: "shadow-gray-300",
    },
    {
      id: 10,
      src: mui,
      title: "Material UI",
      style: "shadow-blue-700",
    },
    {
      id: 11,
      src: post,
      title: "Postman",
      style: "shadow-orange-700",
    },
    {
      id: 12,
      src: filezilla,
      title: "FileZilla",
      style: "shadow-red-500",
    },
    {
      id: 13,
      src: git,
      title: "Git",
      style: "shadow-red-600",
    },
    {
      id: 14,
      src: shadcn,
      title: "ShadCN UI",
      style: "shadow-slate-400",
    },
    {
      id: 15,
      src: testingLibrary,
      title: "React Testing Library",
      style: "shadow-red-400",
    },
  ];

  return (
    <div
      name="experience"
      className=" pt-[100px] pb-20 bg-gradient-to-b from-gray-800 to to-black w-full min-h-screen "
    >
      <div className="max-w-screen-lg  mx-auto p-4 py-14 flex flex-col justify-center w-full h-full text-zinc-50 ">
        <div>
          <p className="text-4xl font-bold border-b-4 border-gray-400 p-2 inline">
            Experience
          </p>
          <p className="py-6">Here are some technologies i have worked with</p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-15 sm:px-0">
          {techs.map(({ id, src, title, style }) => (
            <div
              key={id}
              className={`shadow-md hover:scale-105 duration-500 py-3 rounded-lg ${style}`}
            >
              {title === "ShadCN UI" ||
              title === "Next.js" ||
              title === "React Testing Library" ? (
                <div className="w-20 h-20 bg-white rounded-lg mx-auto flex items-center justify-center">
                  <img className="w-16" src={src} alt={title} />
                </div>
              ) : (
                <div className="w-20 h-20 mx-auto flex items-center justify-center">
                  <img
                    className="max-w-full max-h-full"
                    src={src}
                    alt={title}
                  />
                </div>
              )}
              <p className="mt-4">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exp;
