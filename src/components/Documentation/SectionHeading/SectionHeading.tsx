import classes from './section-heading.module.scss';

type SectionHeadingProps = {
  content: string;
  icon: JSX.Element;
};
const SectionHeading = ({ content, icon }: SectionHeadingProps) => {
  return (
    <span className={classes.sectionHeading}>
      <span className={classes.icon}>{icon}</span>
      <h5 className={classes.content}>{content}</h5>
    </span>
  );
};

export default SectionHeading;
