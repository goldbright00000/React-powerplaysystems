import React from "react";
import styles from "./content.module.scss";

const Content = ({contents, title, children}) => {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>{title}</h1>
      {children}
      {contents.map(({title, content}, index) => (
        <section key={index} id={title.toLowerCase().replaceAll(' ', '-')}>
          <h2 id={title}>{title}</h2>
          {content}
        </section>
      ))}
    </section>
  );
};

export default Content;
