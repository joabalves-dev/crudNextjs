import React from "react";
import Title from "./Title";

interface LayoutProps {
  Title: String;
  children: any;
}

function Layout(props: LayoutProps) {
  return (
    <div
      className={`
            flex flex-col w-2/3 bg-white text-gray-800 rounded-md
        `}
    >
      <Title>{props.Title}</Title>
      <div className="p-6">{props.children}</div>
    </div>
  );
}

export default Layout;