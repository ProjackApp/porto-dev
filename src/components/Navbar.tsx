import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X, Cpu } from 'lucide-react';

export default function Navbar() {
	const [open, setOpen] = useState(false);

	const links = [
		{ id: 'about', label: 'about.ts', ext: 'TS' },
		{ id: 'skills', label: 'skills.json', ext: 'JSON' },
		{ id: 'projects', label: 'projects.tsx', ext: 'TSX' },
		{ id: 'game', label: 'mini_game.exe', ext: 'EXE' },
		{ id: 'contact', label: 'contact.sh', ext: 'SH' },
	];

	return (
		<motion.nav
			initial={{ y: -80, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.8 }}
			className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#191411]/85 border-b border-[#3e3229] font-mono">
			<div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
				{/* LOGO & TERMINAL STATUS */}
				<div className="flex items-center gap-3">
					{/* Window Controls Dot */}
					<div className="hidden sm:flex items-center gap-1.5 pr-2 border-r border-[#3e3229]">
						<div className="w-2.5 h-2.5 rounded-full bg-[#a75d3f]" />
						<div className="w-2.5 h-2.5 rounded-full bg-[#d99b73]" />
						<div className="w-2.5 h-2.5 rounded-full bg-[#827150]" />
					</div>

					<a
						href="#"
						className="flex items-center gap-2 group">
						<Terminal className="w-4 h-4 text-[#d99b73] group-hover:rotate-12 transition-transform" />
						<h1 className="text-sm sm:text-base font-bold text-[#f4eae1] tracking-tight">
							<span className="text-[#a39485]">~/</span>zakaria
							<span className="text-[#d99b73]">.dev</span>
						</h1>
					</a>

					{/* Env Tag */}
					<span className="hidden lg:inline-flex items-center gap-1 text-[10px] text-[#3fb950] bg-[#241d18] border border-[#3e3229] px-2 py-0.5 rounded">
						<span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
						PROD
					</span>
				</div>

				{/* DESKTOP MENU (CODE ROUTES STYLE) */}
				<div className="hidden md:flex items-center gap-1 text-xs font-mono bg-[#241d18] p-1 rounded-lg border border-[#3e3229]">
					{links.map((item) => (
						<a
							key={item.id}
							href={`#${item.id}`}
							className="relative group px-3 py-1.5 rounded-md hover:bg-[#2e241e] text-[#a39485] hover:text-[#f4eae1] transition duration-300 flex items-center gap-1.5">
							<span className="text-[#d99b73] opacity-60 group-hover:opacity-100">
								#
							</span>
							<span>{item.label}</span>
							<span className="text-[9px] text-[#8c7b6c] group-hover:text-[#d99b73] transition-colors">
								[{item.ext}]
							</span>
						</a>
					))}
				</div>

				{/* RIGHT SYSTEM STATUS & MOBILE BUTTON */}
				<div className="flex items-center gap-3">
					<div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#8c7b6c]">
						<Cpu className="w-3.5 h-3.5 text-[#d99b73]" />
						<span>v1.0.4</span>
					</div>

					{/* Mobile Button */}
					<button
						onClick={() => setOpen(!open)}
						className="md:hidden p-2 rounded-lg bg-[#241d18] border border-[#3e3229] text-[#d99b73] hover:text-[#f4eae1] transition">
						{open ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* MOBILE MENU (TERMINAL DRAWER) */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="md:hidden bg-[#1c1815] border-b border-[#3e3229] overflow-hidden">
						{/* Terminal Header */}
						<div className="px-6 py-2 bg-[#191411] border-b border-[#3e3229] flex items-center justify-between text-[11px] text-[#8c7b6c]">
							<span>NAVIGATE_MODULES</span>
							<span>CTRL + P</span>
						</div>

						<div className="flex flex-col px-6 py-4 space-y-2 text-xs">
							{links.map((item, i) => (
								<motion.a
									key={item.id}
									href={`#${item.id}`}
									onClick={() => setOpen(false)}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.04 }}
									className="flex items-center justify-between p-2.5 rounded-lg bg-[#241d18] border border-[#3e3229] text-[#a39485] hover:text-[#f4eae1] hover:border-[#d99b73]/50 transition">
									<div className="flex items-center gap-2">
										<span className="text-[#8c7b6c] font-bold">0{i + 1}.</span>
										<span className="text-[#d99b73]">$</span>
										<span className="text-[#f4eae1] font-semibold">
											{item.label}
										</span>
									</div>
									<span className="text-[10px] text-[#8c7b6c] bg-[#191411] px-2 py-0.5 rounded border border-[#3e3229]">
										{item.ext}
									</span>
								</motion.a>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
}
