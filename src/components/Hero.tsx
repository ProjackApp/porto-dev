import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
	Terminal,
	Code2,
	Activity,
	AlertCircle,
	ArrowRight,
} from 'lucide-react';

export default function Hero() {
	const [stats, setStats] = useState<{
		monthlyViews?: number;
		yearlyViews?: number;
	}>(() => ({}));
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;
		const base =
			typeof window !== 'undefined' && window.location.hostname === 'localhost'
				? 'http://localhost:4000'
				: '';
		fetch(`${base}/api/analytics`)
			.then((r) => {
				if (!r.ok) throw new Error('Failed to fetch analytics');
				return r.json();
			})
			.then((data) => {
				if (!mounted) return;
				setStats({
					monthlyViews: data.monthlyViews,
					yearlyViews: data.yearlyViews,
				});
			})
			.catch((e) => {
				if (!mounted) return;
				setError(e.message);
			})
			.finally(() => mounted && setLoading(false));

		return () => {
			mounted = false;
		};
	}, []);

	const fmt = (n?: number) =>
		n === undefined ? '—' : new Intl.NumberFormat().format(n);

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1c1815] py-20 text-[#dcd0c0] font-sans">
			{/* Tech Matrix/Grid Background (Soil Umber Tint) */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#2d2621_1px,transparent_1px),linear-gradient(to_bottom,#2d2621_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
			<div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

			{/* Earthy Warm Glows (Terracotta Clay & Caramel Amber) */}
			<div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#a75d3f]/15 blur-[150px] rounded-full pointer-events-none" />
			<div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#827150]/15 blur-[150px] rounded-full pointer-events-none" />

			<div className="relative z-10 max-w-5xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
				{/* LEFT COLUMN: Developer Info & Bio */}
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					className="lg:col-span-7 text-left">
					{/* Terminal Status Pill */}
					<div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-[#2e241e] border border-[#a75d3f]/40 text-[#3fb950] font-mono text-xs mb-6 shadow-inner">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3fb950] opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-[#3fb950]"></span>
						</span>
						<span>● main* (ready_to_build)</span>
					</div>

					<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#f4eae1] leading-tight font-mono">
						<span className="text-[#a39485] text-lg md:text-xl block mb-1 font-normal">
							<span className="text-[#d99b73]">const</span> developer =
						</span>
						Hi, I'm{' '}
						<span className="bg-gradient-to-r from-[#d99b73] via-[#e2b08e] to-[#fbbf24] bg-clip-text text-transparent">
							Zakaria Saputra
						</span>
					</h1>

					<p className="mt-6 text-base md:text-lg text-[#a39485] leading-relaxed max-w-xl font-sans">
						Specialized{' '}
						<span className="text-[#d99b73] font-mono font-semibold">
							Frontend Developer
						</span>{' '}
						transforming complex requirements into clean, scalable React &
						TypeScript code systems.
					</p>

					{/* Syntax Styled CTAs */}
					<div className="mt-8 flex flex-wrap items-center gap-4">
						<motion.a
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}
							href="#projects"
							className="px-6 py-3.5 rounded-lg bg-[#a75d3f] hover:bg-[#d99b73] text-[#f4eae1] font-bold font-mono text-sm shadow-lg shadow-[#a75d3f]/20 flex items-center gap-2 transition border border-[#d99b73]/40">
							<Code2 className="w-4 h-4 text-[#f4eae1]" />
							<span>execute(projects)</span>
						</motion.a>

						<motion.a
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}
							href="#contact"
							className="px-6 py-3.5 rounded-lg border border-[#3e3229] bg-[#241d18] hover:bg-[#2e241e] text-[#dcd0c0] font-mono text-sm transition flex items-center gap-2">
							<span className="text-[#d99b73]">fetch</span>
							<span className="text-[#e0cfbe]">('/contact')</span>
							<ArrowRight className="w-4 h-4 text-[#8c7b6c]" />
						</motion.a>
					</div>

					{/* Live System Metrics (Analytics Stats) */}
					<div className="mt-10 pt-6 border-t border-[#3e3229]">
						<div className="flex items-center gap-2 text-xs font-mono text-[#8c7b6c] mb-3 uppercase tracking-wider">
							<Activity className="w-3.5 h-3.5 text-[#3fb950]" /> Server
							Telemetry
						</div>

						{loading ? (
							<div className="text-xs font-mono text-[#a39485] animate-pulse flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span> GET
								/api/analytics HTTP/1.1 200 OK...
							</div>
						) : error ? (
							<div className="text-xs font-mono text-[#ef4444] flex items-center gap-2">
								<AlertCircle className="w-4 h-4" /> [ERR_CONNECTION_REFUSED]
							</div>
						) : (
							<div className="grid grid-cols-2 gap-4 max-w-md">
								<div className="p-3.5 rounded-lg bg-[#241d18] border border-[#3e3229]">
									<div className="text-[11px] font-mono text-[#8c7b6c]">
										HTTP_REQ_MONTH
									</div>
									<div className="text-lg font-bold font-mono text-[#d99b73] mt-1">
										{fmt((stats.monthlyViews ?? 0) * 4)}{' '}
										<span className="text-[10px] text-[#8c7b6c] font-normal">
											hits
										</span>
									</div>
								</div>

								<div className="p-3.5 rounded-lg bg-[#241d18] border border-[#3e3229]">
									<div className="text-[11px] font-mono text-[#8c7b6c]">
										HTTP_REQ_YEAR
									</div>
									<div className="text-lg font-bold font-mono text-[#fbbf24] mt-1">
										{fmt((stats.yearlyViews ?? 0) * 4)}{' '}
										<span className="text-[10px] text-[#8c7b6c] font-normal">
											hits
										</span>
									</div>
								</div>
							</div>
						)}
					</div>
				</motion.div>

				{/* RIGHT COLUMN: Earthy Retro IDE Code Window */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="lg:col-span-5">
					<div className="rounded-xl border border-[#3e3229] bg-[#241d18] overflow-hidden shadow-2xl shadow-[#a75d3f]/10 font-mono text-xs">
						{/* Editor Header Bar */}
						<div className="px-4 py-3 bg-[#191411] border-b border-[#3e3229] flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded-full bg-[#a75d3f]" />
								<div className="w-3 h-3 rounded-full bg-[#d99b73]" />
								<div className="w-3 h-3 rounded-full bg-[#827150]" />
							</div>
							<div className="text-[#8c7b6c] text-[11px] flex items-center gap-1.5">
								<Terminal className="w-3.5 h-3.5 text-[#d99b73]" />
								<span>profile.config.ts</span>
							</div>
							<div className="text-[10px] text-[#d99b73] bg-[#2e241e] border border-[#a75d3f]/40 px-1.5 py-0.5 rounded">
								TS
							</div>
						</div>

						{/* Earthy Syntax Highlighted Code Area */}
						<div className="p-5 text-[#dcd0c0] space-y-2 leading-relaxed overflow-x-auto bg-[#1c1815]">
							<div>
								<span className="text-[#d99b73]">export const</span>{' '}
								<span className="text-[#fbbf24]">developerProfile</span> =
								&#123;
							</div>

							<div className="pl-4">
								<span className="text-[#a88b79]">name</span>:{' '}
								<span className="text-[#f4eae1]">'Zakaria Saputra'</span>,
							</div>

							<div className="pl-4">
								<span className="text-[#a88b79]">role</span>:{' '}
								<span className="text-[#f4eae1]">'Frontend Developer'</span>,
							</div>

							<div className="pl-4">
								<span className="text-[#a88b79]">techStack</span>: [
								<span className="text-[#f4eae1]">'React'</span>,{' '}
								<span className="text-[#f4eae1]">'TypeScript'</span>,{' '}
								<span className="text-[#f4eae1]">'Tailwind'</span>],
							</div>

							<div className="pl-4">
								<span className="text-[#a88b79]">focus</span>:{' '}
								<span className="text-[#f4eae1]">
									'UI/UX & High Performance'
								</span>
								,
							</div>

							<div className="pl-4">
								<span className="text-[#a88b79]">availableForHire</span>:{' '}
								<span className="text-[#3fb950]">true</span>
							</div>

							<div>&#125;;</div>

							<div className="pt-3 text-[#8c7b6c] italic">
								// TODO: Let's build something awesome together!
							</div>

							<div className="pt-2 flex items-center gap-2 text-[#d99b73]">
								<span>$</span>
								<span className="animate-pulse w-2 h-4 bg-[#d99b73] inline-block"></span>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
