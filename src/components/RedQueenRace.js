import React, { useEffect, useRef } from 'react';
import './RedQueenRace.css';

import {
	bush,
	bushSmall,
	palm1,
	palm1Small,
	palm2,
	palm2Small,
	palm3,
	palm3Small,
	redKnight,
	redKnightSmall,
	redPawn,
	redPawnSmall,
	runningAlice,
	whiteRook,
	whiteRookSmall,
	whiteRookUpright,
	whiteRookUprightSmall,
	redPawnUpright,
	redPawnUprightSmall,
} from '../data/assetExports';
import useWebAnimations from '@wellyshen/use-web-animations';

const RedQueenRace = () => {
	let redQueenPlaybackRate = useRef(1.5);
	let sceneryPlaybackRate = 0;

	const sceneryFrames = [
		{ transform: 'translateX(100%)' },
		{ transform: 'translateX(-100%)' },
	];

	const sceneryTimingBackground = {
		duration: 3600,
		iterations: Infinity,
	};

	const sceneryTimingForeground = {
		duration: 12000,
		iterations: Infinity,
	};

	const bg1Movement = useWebAnimations({
		keyframes: sceneryFrames,
		timing: sceneryTimingBackground,
	});

	const bg2Movement = useWebAnimations({
		keyframes: sceneryFrames,
		timing: sceneryTimingBackground,
	});

	const fg1Movement = useWebAnimations({
		keyframes: sceneryFrames,
		timing: sceneryTimingForeground,
	});

	const fg2Movement = useWebAnimations({
		keyframes: sceneryFrames,
		timing: sceneryTimingForeground,
	});

	const spriteFrames = [
		{ transform: 'translateY(0)' },
		{ transform: 'translateY(-100%)' },
	];

	const spriteTiming = {
		easing: 'steps(7, end)',
		direction: 'reverse',
		duration: 600,
		playbackRate: redQueenPlaybackRate.current,
		iterations: Infinity,
	};

	const redQueenAlice = useWebAnimations({
		keyframes: spriteFrames,
		timing: spriteTiming,
	});

	const sceneries = [fg1Movement, fg2Movement, bg1Movement, bg2Movement];

	const adjustBgPlaybackRate = () => {
		if (redQueenPlaybackRate.current < 0.2) {
			sceneryPlaybackRate = (redQueenPlaybackRate.current / 2) * -1;
		} else if (redQueenPlaybackRate.current > 0.2) {
			sceneryPlaybackRate = redQueenPlaybackRate.current / 2;
		} else {
			sceneryPlaybackRate = 0;
		}
		sceneries.forEach((scene) => {
			scene.getAnimation().updatePlaybackRate(sceneryPlaybackRate);
		});
	};

	const goFaster = () => {
		redQueenPlaybackRate.current *= 1.1;
		redQueenAlice
			.getAnimation()
			.updatePlaybackRate(redQueenPlaybackRate.current);
		adjustBgPlaybackRate();
	};

	useEffect(() => {
		const fg1Animation = fg1Movement.getAnimation();
		const bg1Animation = bg1Movement.getAnimation();

		fg1Animation.currentTime = fg1Animation.effect.getTiming().duration / 2;
		bg1Animation.currentTime = bg1Animation.effect.getTiming().duration / 2;

		setInterval(() => {
			if (redQueenPlaybackRate.current > 0.4) {
				redQueenPlaybackRate.current *= 0.99;
				redQueenAlice.getAnimation().playbackRate =
					redQueenPlaybackRate.current;
			}
			adjustBgPlaybackRate();
		}, 1000);

		document.addEventListener('click', goFaster);
		document.addEventListener('touchstart', goFaster);
	});

	return (
		<div className="wrapper">
			<div className="sky" />
			<div className="earth">
				<div id="red-queen-and-alice">
					<img
						src={runningAlice}
						alt=""
						id="red-queen-and-alice-sprite"
						ref={redQueenAlice.ref}
					/>
				</div>
			</div>
			<div className="scenery" id="foreground1" ref={fg1Movement.ref}>
				<img id="palm3" src={palm3Small} srcSet={`${palm3} 2x`} alt=" " />
			</div>
			<div className="scenery" id="foreground2" ref={fg2Movement.ref}>
				<img id="bush" src={bushSmall} srcSet={`${bush} 2x`} alt=" " />
				<img
					src={whiteRookUprightSmall}
					srcSet={`${whiteRookUpright} 2x`}
					alt=""
					id="white-rook-upright"
				/>
			</div>
			<div className="scenery" id="background1" ref={bg1Movement.ref}>
				<img
					src={redPawnUprightSmall}
					srcSet={`${redPawnUpright} 2x`}
					alt=" "
					id="red-pawn-upright"
				/>
				<img
					src={whiteRookSmall}
					srcSet={`${whiteRook} 2x`}
					alt=" "
					id="white-rook"
				/>
				<img src={palm1Small} srcSet={`${palm1} 2x`} alt=" " id="palm1" />
			</div>
			<div className="scenery" id="background2" ref={bg2Movement.ref}>
				<img
					src={redPawnSmall}
					srcSet={`${redPawn} 2x`}
					alt=" "
					id="red-pawn"
				/>
				<img
					src={redKnightSmall}
					srcSet={`${redKnight} 2x`}
					alt=" "
					id="red-knight"
				/>
				<img src={palm2Small} srcSet={`${palm2} 2x`} alt=" " id="palm2" />
			</div>
		</div>
	);
};

export default RedQueenRace;
