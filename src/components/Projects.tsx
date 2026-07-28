import { motion } from 'framer-motion';
import { Terminal, FolderGit2, ArrowUpRight } from 'lucide-react';
import tesman from '../assets/tesman.webp';
import astina from '../assets/astina.webp';
import superapps from '../assets/superapps.webp';
import sroja from '../assets/sroja.webp';

const projects = [
	{
		title: 'PSI SIM Online',
		desc: 'A nationwide web-based psychological testing system for driver’s license applications.',
		image: tesman,
		link: 'https://tesman.psisimonline.id/',
		category: 'Psychology Test System',
		tech: ['React', 'TypeScript', 'REST API'],
		module: 'sim_online.deploy.ts',
	},
	{
		title: 'ASTINA Polri',
		desc: 'An internal administrative and data management dashboard for the Indonesian National Police.',
		image: astina,
		link: 'https://astina.polri.go.id/',
		category: 'Government Dashboard',
		tech: ['React', 'Ant Design', 'Tailwind'],
		module: 'astina_core.deploy.ts',
	},
	{
		title: 'SROJA',
		desc: 'An e-commerce website for a fashion brand featuring product catalogs, shopping cart, and checkout.',
		image: sroja,
		link: 'https://sroja.com/',
		category: 'E-Commerce Platform',
		tech: ['React', 'Vite', 'Payment Gateway'],
		module: 'sroja_store.deploy.ts',
	},
	{
		title: 'Presisi Admin Polri',
		desc: 'An admin panel for the Presisi Polri system, including monitoring, approvals, and reporting features.',
		image: superapps,
		link: 'https://presisi-admin.polri.go.id/',
		category: 'Enterprise Management',
		tech: ['React', 'TypeScript', 'Analytics'],
		module: 'presisi_admin.deploy.ts',
	},
];

export default function Projects() {
	return (
		<section
			id="projects"
			className="relative py-24 md:py-32 bg-[#1c1815] text-[#dcd0c0] overflow-hidden font-sans">
			{/* Earthy Topographical / Grid Pattern */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#2d2621_1px,transparent_1px),linear-gradient(to_bottom,#2d2621_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />

			{/* Earthy Warm Glows (Terracotta, Sage, & Warm Sand) */}
			<div className="absolute top-1/3 -left-40 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#a75d3f]/15 blur-[160px] rounded-full pointer-events-none" />
			<div className="absolute bottom-10 -right-20 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-[#827150]/15 blur-[160px] rounded-full pointer-events-none" />

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* SECTION HEADER */}
				<div className="mb-12 md:mb-16 text-left">
					<div className="inline-flex items-center gap-2 font-mono text-xs text-[#d99b73] bg-[#2e241e] border border-[#a75d3f]/40 px-3.5 py-1.5 rounded-md mb-4 shadow-sm">
						<FolderGit2 className="w-3.5 h-3.5 text-[#d99b73]" />
						<span>git checkout --production-projects</span>
					</div>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono text-[#f4eae1] tracking-tight">
						Real World <span className="text-[#d99b73]">Projects</span>
					</motion.h2>

					<p className="mt-3 text-sm md:text-base text-[#a39485] max-w-2xl font-sans leading-relaxed">
						Kumpulan aplikasi riil dan sistem berkonsekuensi tinggi yang telah
						dirilis dan digunakan oleh pengguna nyata secara nasional.
					</p>
				</div>

				{/* PROJECTS GRID */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
					{projects.map((p, i) => (
						<motion.div
							key={p.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: i * 0.1 }}
							viewport={{ once: true }}
							whileHover={{ y: -6 }}
							className="group rounded-2xl overflow-hidden border border-[#3e3229] bg-[#241d18] hover:border-[#d99b73]/60 hover:shadow-2xl hover:shadow-[#a75d3f]/15 transition-all duration-500 flex flex-col justify-between">
							{/* TOP: IDE File Tab Header */}
							<div className="px-4 py-3 bg-[#191411] border-b border-[#3e3229] flex items-center justify-between font-mono text-xs">
								<div className="flex items-center gap-2 text-[#a39485]">
									<Terminal className="w-3.5 h-3.5 text-[#d99b73]" />
									<span className="text-[11px] sm:text-xs truncate max-w-[180px] sm:max-w-none">
										{p.module}
									</span>
								</div>
								<span className="text-[10px] text-[#8c7b6c] bg-[#2e241e] border border-[#3e3229] px-2 py-0.5 rounded">
									{p.category}
								</span>
							</div>

							{/* MIDDLE: Image Preview Frame */}
							<div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden bg-[#120e0c]">
								{/* Image with Warm Earth Filter Effect */}
								<img
									src={p.image}
									alt={p.title}
									className="w-full h-full object-cover sepia-[0.35] brightness-90 contrast-110 scale-105 group-hover:sepia-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:scale-100 transition-all duration-700 ease-out"
								/>

								{/* Warm Earthy Gradient Overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-[#1c1815] via-[#1c1815]/40 to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-700" />

								{/* Floating Tech Tags */}
								<div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-1.5 z-10">
									{p.tech.map((t) => (
										<span
											key={t}
											className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#1c1815]/90 border border-[#3e3229] text-[#e0cfbe] backdrop-blur-md">
											{t}
										</span>
									))}
								</div>
							</div>

							{/* BOTTOM: Project Info & Action */}
							<div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-[#241d18]">
								<div>
									<h3 className="text-xl sm:text-2xl font-bold font-mono text-[#f4eae1] group-hover:text-[#d99b73] transition-colors duration-300">
										{p.title}
									</h3>
									<p className="text-xs sm:text-sm text-[#a39485] mt-2.5 leading-relaxed font-sans">
										{p.desc}
									</p>
								</div>

								{/* External Link Action Button */}
								<div className="mt-6 pt-4 border-t border-[#3e3229] flex items-center justify-between">
									<span className="font-mono text-[11px] text-[#8c7b6c]">
										BUILD: <span className="text-[#3fb950]">PASSED</span>
									</span>

									<a
										href={p.link}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#d99b73] hover:text-[#f4eae1] bg-[#2e241e] hover:bg-[#a75d3f] border border-[#a75d3f]/50 px-3.5 py-2 rounded-lg transition-all duration-300 shadow-sm">
										<span>Visit System</span>
										<ArrowUpRight className="w-3.5 h-3.5" />
									</a>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
