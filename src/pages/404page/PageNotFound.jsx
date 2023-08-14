import classes from './PageNotFound.module.css';

const PageNotFound = () => {
	return (
		<div className={classes.wrapper}>
			<img
				src="https://http.cat/404"
				alt="Page not found."
				className={classes.img}
			/>
		</div>
	);
};

export default PageNotFound;
