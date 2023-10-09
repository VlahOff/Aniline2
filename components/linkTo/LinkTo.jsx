import Link from 'next/link';
import classes from './LinkTo.module.css';

const LinkTo = ({ href, target, children, className }) => {
	const styles = `${classes.link} ${className}`;
	return (
		<Link
			href={href}
			target={target}
			className={styles}
		>
			{children}
		</Link>
	);
};

export default LinkTo;
