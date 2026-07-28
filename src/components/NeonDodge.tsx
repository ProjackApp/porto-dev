import { useEffect, useRef, useState } from 'react';
import {
	Gamepad2,
	Trophy,
	RotateCcw,
	ShieldAlert,
	Sparkles,
	Terminal,
} from 'lucide-react';

interface Block {
	x: number;
	y: number;
	speed: number;
	id: number;
}

export default function EarthDodge() {
	const gameRef = useRef<HTMLDivElement>(null);
	const [playerX, setPlayerX] = useState(50);
	const [blocks, setBlocks] = useState<Block[]>([]);
	const [playing, setPlaying] = useState(false);
	const [score, setScore] = useState(0);
	const [level, setLevel] = useState(1);
	const [high, setHigh] = useState<number>(
		() => Number(localStorage.getItem('dodge-high')) || 0,
	);

	// Keep tracks of mutable states in ref for collision loop accuracy
	const playerXRef = useRef(playerX);
	playerXRef.current = playerX;

	const scoreRef = useRef(score);
	scoreRef.current = score;

	const highRef = useRef(high);
	highRef.current = high;

	// Mouse & Touch Controls for Responsive Gameplay
	useEffect(() => {
		const handleMove = (clientX: number) => {
			const rect = gameRef.current?.getBoundingClientRect();
			if (!rect) return;
			const x = ((clientX - rect.left) / rect.width) * 100;
			setPlayerX(Math.max(4, Math.min(96, x)));
		};

		const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
		const onTouchMove = (e: TouchEvent) => {
			if (e.touches[0]) handleMove(e.touches[0].clientX);
		};

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('touchmove', onTouchMove);

		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('touchmove', onTouchMove);
		};
	}, []);

	// Block Spawner Loop
	useEffect(() => {
		if (!playing) return;

		const interval = setInterval(
			() => {
				setBlocks((prev) => [
					...prev,
					{
						id: Math.random(),
						x: Math.random() * 88 + 4, // keep inside container padding
						y: -10,
						speed: 1.2 + level * 0.4,
					},
				]);
			},
			Math.max(250, 650 - level * 45),
		);

		return () => clearInterval(interval);
	}, [playing, level]);

	// Game Physics & Collision Loop
	useEffect(() => {
		if (!playing) return;

		const loop = setInterval(() => {
			setBlocks((prevBlocks) => {
				const nextBlocks: Block[] = [];
				let collided = false;

				for (const block of prevBlocks) {
					const nextY = block.y + block.speed;

					// Collision check with player (player is around Y: 82% to 92%)
					if (
						nextY > 78 &&
						nextY < 92 &&
						Math.abs(block.x - playerXRef.current) < 7
					) {
						collided = true;
					}

					if (nextY < 100) {
						nextBlocks.push({ ...block, y: nextY });
					}
				}

				if (collided) {
					setPlaying(false);
					if (scoreRef.current > highRef.current) {
						setHigh(scoreRef.current);
						localStorage.setItem('dodge-high', String(scoreRef.current));
					}
				}

				return nextBlocks;
			});

			setScore((s) => {
				const newScore = s + 1;
				if (newScore % 400 === 0 && newScore !== 0) {
					setLevel((l) => l + 1);
				}
				return newScore;
			});
		}, 20);

		return () => clearInterval(loop);
	}, [playing]);

	const start = () => {
		setBlocks([]);
		setScore(0);
		setLevel(1);
		setPlaying(true);
	};

	return (
		<section
			id="game"
			className="relative py-24 md:py-32 bg-[#1c1815] text-[#dcd0c0] overflow-hidden font-sans">
			{/* Earthy Grid Pattern */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#2d2621_1px,transparent_1px),linear-gradient(to_bottom,#2d2621_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />

			{/* Earthy Warm Glows */}
			<div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-[#a75d3f]/15 blur-[150px] rounded-full pointer-events-none" />
			<div className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-[#827150]/15 blur-[150px] rounded-full pointer-events-none" />

			<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
				{/* Header Tag */}
				<div className="inline-flex items-center gap-2 font-mono text-xs text-[#d99b73] bg-[#2e241e] border border-[#a75d3f]/40 px-3.5 py-1.5 rounded-md mb-4 shadow-sm">
					<Gamepad2 className="w-3.5 h-3.5 text-[#d99b73]" />
					<span>mini_game_module.exe</span>
				</div>

				<h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-[#f4eae1] tracking-tight">
					Earth <span className="text-[#d99b73]">Dodge</span>
				</h2>
				<p className="mt-2 text-xs sm:text-sm text-[#a39485]">
					Hindari bongkahan tanah yang jatuh menggunakan kursor / sentuhan jari
					Anda.
				</p>

				{/* Scoreboard Bar */}
				<div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-2.5 rounded-xl bg-[#241d18] border border-[#3e3229] font-mono text-xs sm:text-sm shadow-md">
					<div className="flex items-center gap-1.5 text-[#a39485]">
						<span>Score:</span>
						<span className="text-[#f4eae1] font-bold">{score}</span>
					</div>
					<div className="w-px h-4 bg-[#3e3229]" />
					<div className="flex items-center gap-1.5 text-[#a39485]">
						<span>Level:</span>
						<span className="text-[#d99b73] font-bold">{level}</span>
					</div>
					<div className="w-px h-4 bg-[#3e3229]" />
					<div className="flex items-center gap-1.5 text-[#a39485]">
						<Trophy className="w-3.5 h-3.5 text-[#eab308]" />
						<span>High:</span>
						<span className="text-[#eab308] font-bold">{high}</span>
					</div>
				</div>

				{/* Main Game Screen Window */}
				<div
					ref={gameRef}
					className="relative mt-8 h-[380px] sm:h-[420px] bg-[#14100e] border border-[#3e3229] rounded-2xl overflow-hidden shadow-2xl shadow-[#a75d3f]/10 cursor-crosshair touch-none select-none">
					{/* Top IDE Bar */}
					<div className="absolute top-0 inset-x-0 h-8 bg-[#191411] border-b border-[#3e3229] px-4 flex items-center justify-between font-mono text-[10px] text-[#8c7b6c] z-20 pointer-events-none">
						<div className="flex items-center gap-1.5">
							<Terminal className="w-3 h-3 text-[#d99b73]" />
							<span>soil_dodge_v1.0.ts</span>
						</div>
						<span>STATUS: {playing ? 'RUNNING' : 'IDLE'}</span>
					</div>

					{/* Player Sphere (Terracotta Warm Amber Glow) */}
					{playing && (
						<div
							className="absolute bottom-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#d99b73] border-2 border-[#f4eae1] shadow-[0_0_25px_#a75d3f] transition-all duration-75 z-10"
							style={{ left: `${playerX}%`, transform: 'translateX(-50%)' }}
						/>
					)}

					{/* Falling Blocks (Soil Rock Elements) */}
					{blocks.map((b) => (
						<div
							key={b.id}
							className="absolute w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#a75d3f] border border-[#d99b73]/60 shadow-[0_0_15px_#a75d3f/50] rotate-45"
							style={{
								left: `${b.x}%`,
								top: `${b.y}%`,
								transform: 'translateX(-50%)',
							}}
						/>
					))}

					{/* Start / Game Over Screen Overlay */}
					{!playing && (
						<div className="absolute inset-0 bg-[#1c1815]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 gap-5 z-30">
							{score > 0 ? (
								<div className="space-y-1">
									<div className="inline-flex items-center gap-2 text-[#ef4444] font-mono text-sm font-bold">
										<ShieldAlert className="w-4 h-4" />
										<span>SYSTEM CRASH - GAME OVER</span>
									</div>
									<p className="text-xs font-mono text-[#a39485]">
										Final Score: <span className="text-[#f4eae1]">{score}</span>{' '}
										| Level: <span className="text-[#d99b73]">{level}</span>
									</p>
								</div>
							) : (
								<div className="space-y-1">
									<h3 className="text-lg font-mono font-bold text-[#f4eae1]">
										Ready to Test Your Reflexes?
									</h3>
									<p className="text-xs text-[#a39485] font-sans">
										Gunakan Mouse atau Sentuhan Layar untuk Menghindar
									</p>
								</div>
							)}

							<button
								onClick={start}
								className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#a75d3f] hover:bg-[#d99b73] text-[#f4eae1] hover:text-[#1c1815] font-mono font-bold text-sm rounded-xl border border-[#d99b73]/50 transition-all duration-300 shadow-lg shadow-[#a75d3f]/20 hover:scale-105 active:scale-95">
								{score > 0 ? (
									<RotateCcw className="w-4 h-4" />
								) : (
									<Sparkles className="w-4 h-4" />
								)}
								<span>{score > 0 ? 'RETRY_SYSTEM' : 'START_GAME'}</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
