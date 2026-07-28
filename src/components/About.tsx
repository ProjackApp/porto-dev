import { motion } from 'framer-motion';
import { Terminal, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import profile from '../assets/profile.webp';

export default function About() {
	const startYear = 2023;
	const currentYear = new Date().getFullYear();
	const yearsOfExperience = currentYear - startYear; // Otomatis menghasilkan 3+ di tahun 2026
	return (
		<section
			id="about"
			className="relative py-24 md:py-32 px-6 bg-[#1c1815] text-[#dcd0c0] overflow-hidden font-sans">
			{/* Tech Background Grid (Soil Umber Tint) */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#2d2621_1px,transparent_1px),linear-gradient(to_bottom,#2d2621_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />

			{/* Earthy Warm Glows (Terracotta Clay & Caramel Amber) */}
			<div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-[#a75d3f]/15 blur-[150px] rounded-full pointer-events-none" />
			<div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#827150]/15 blur-[150px] rounded-full pointer-events-none" />

			<div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
				{/* LEFT: Image in IDE Preview Frame */}
				<motion.div
					initial={{ opacity: 0, x: -40 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="md:col-span-5 flex justify-center">
					<div className="w-full max-w-sm rounded-xl border border-[#3e3229] bg-[#241d18] overflow-hidden shadow-2xl shadow-[#a75d3f]/10">
						{/* IDE Tab Header */}
						<div className="px-4 py-2.5 bg-[#191411] border-b border-[#3e3229] flex items-center justify-between font-mono text-xs text-[#8c7b6c]">
							<div className="flex items-center gap-2">
								<div className="w-2.5 h-2.5 rounded-full bg-[#a75d3f]" />
								<div className="w-2.5 h-2.5 rounded-full bg-[#d99b73]" />
								<div className="w-2.5 h-2.5 rounded-full bg-[#827150]" />
							</div>
							<div className="flex items-center gap-1.5 text-[#d99b73]">
								<ImageIcon className="w-3.5 h-3.5" />
								<span>Zakaria_Avatar.png</span>
							</div>
							<span className="text-[10px] text-[#8c7b6c]">1080x1080</span>
						</div>

						{/* Image Preview Container */}
						<div className="p-4 bg-[#1c1815] relative group">
							{/* Target Frame / Crosshair Styling */}
							<div className="absolute top-6 left-6 w-3 h-3 border-t-2 border-l-2 border-[#d99b73] z-10" />
							<div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-[#d99b73] z-10" />
							<div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-[#d99b73] z-10" />
							<div className="absolute bottom-6 right-6 w-3 h-3 border-b-2 border-r-2 border-[#d99b73] z-10" />

							<img
								src={profile}
								alt="Zakaria Saputra"
								className="w-full h-80 object-cover rounded-lg sepia-[0.35] brightness-90 contrast-110 group-hover:sepia-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-500 border border-[#3e3229]"
							/>

							{/* Status Overlay */}
							<div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#8c7b6c] px-1">
								<span className="flex items-center gap-1.5 text-[#3fb950]">
									<CheckCircle2 className="w-3.5 h-3.5" /> Dev_Verified
								</span>
								<span>RGB / 8-bit</span>
							</div>
						</div>
					</div>
				</motion.div>

				{/* RIGHT: Developer Bio & Telemetry Stats */}
				<motion.div
					initial={{ opacity: 0, x: 40 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="md:col-span-7 space-y-6">
					{/* Section Header */}
					<div>
						<div className="inline-flex items-center gap-2 font-mono text-xs text-[#d99b73] bg-[#2e241e] border border-[#a75d3f]/40 px-3 py-1 rounded-md mb-3 shadow-sm">
							<Terminal className="w-3.5 h-3.5 text-[#d99b73]" />
							<span>cat README.md</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-extrabold text-[#f4eae1] font-mono tracking-tight">
							# About <span className="text-[#d99b73]">Developer</span>
						</h2>
					</div>

					{/* Code Comments Style Bio */}
					<div className="space-y-4 font-sans text-base text-[#a39485] leading-relaxed">
						<p className="border-l-2 border-[#d99b73] pl-4">
							I am a{' '}
							<strong className="text-[#f4eae1] font-mono">
								Frontend Web Developer
							</strong>{' '}
							focused on building modern, fast, and scalable web applications.
							My core stack centers on{' '}
							<span className="text-[#d99b73] font-mono">React</span>,{' '}
							<span className="text-[#d99b73] font-mono">TypeScript</span>, and
							API-driven architecture.
						</p>

						<p className="border-l-2 border-[#3e3229] pl-4">
							I have built and maintained complex software ecosystems including{' '}
							<strong className="text-[#f4eae1]">admin dashboards</strong>, KYC
							verification flows, payment integrations, e-commerce systems,
							psychological testing platforms, and enterprise attendance
							tracking tools.
						</p>
					</div>

					{/* Developer Capabilities Tag cloud */}
					<div className="pt-2 flex flex-wrap gap-2 font-mono text-xs text-[#d99b73]">
						<span className="bg-[#241d18] border border-[#3e3229] px-2.5 py-1 rounded">
							Dashboards
						</span>
						<span className="bg-[#241d18] border border-[#3e3229] px-2.5 py-1 rounded">
							KYC_Systems
						</span>
						<span className="bg-[#241d18] border border-[#3e3229] px-2.5 py-1 rounded">
							E-Commerce
						</span>
						<span className="bg-[#241d18] border border-[#3e3229] px-2.5 py-1 rounded">
							Attendance_Apps
						</span>
					</div>

					{/* Telemetry Stats / System Capability */}
					<div className="pt-4 grid grid-cols-3 gap-4 font-mono">
						{[
							{
								label: 'DELIVERED_PROJECTS',
								value: '20+',
								color: 'text-[#d99b73]',
							},
							{
								label: 'BUILT_DASHBOARDS',
								value: '10+',
								color: 'text-[#fbbf24]',
							},
							{
								label: 'YEARS_EXPERIENCE',
								value: `${yearsOfExperience}+`,
								color: 'text-[#3fb950]',
							},
						].map((item) => (
							<div
								key={item.label}
								className="bg-[#241d18] border border-[#3e3229] rounded-lg p-3.5 text-left hover:border-[#d99b73]/50 transition">
								<div className="text-[10px] text-[#8c7b6c] truncate">
									{item.label}
								</div>
								<div className={`text-2xl font-bold ${item.color} mt-1`}>
									{item.value}
								</div>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
