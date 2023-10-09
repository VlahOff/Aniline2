import { percentParser } from '../../utils/percentParser';

import classes from './PercentTicker.module.css';

const PercentTicker = ({ percent, className }) => {
	return (
		<p
			className={`
      ${classes.percent} 
      ${percent > 0 ? classes.positive : classes.negative} 
      ${className}
      `}
		>
			{percent > 0 ? (
				<i className={`fa-solid fa-caret-up ${classes.arrow}`}></i>
			) : (
				<i className={`fa-solid fa-caret-down ${classes.arrow}`}></i>
			)}
			{percentParser(percent)}
		</p>
	);
};

export default PercentTicker;
