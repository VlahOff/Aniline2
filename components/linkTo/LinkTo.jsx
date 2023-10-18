import Link from 'next/link';
import styles from './LinkTo.module.css';

const LinkTo = ({ href, target, children, className }) => {
	const stylesMerge = `${styles.link} ${className}`;
	return (
		<Link
			href={href}
			target={target}
			className={stylesMerge}
		>
			{children}
		</Link>
	);
};

export default LinkTo;
