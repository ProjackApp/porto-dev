import { motion } from 'framer-motion';
import { Cpu, Folder, Code2 } from 'lucide-react';
import {
	SiReact,
	SiTypescript,
	SiTailwindcss,
	SiVite,
	SiAntdesign,
	SiStripe,
	SiGooglemaps,
	SiFirebase,
	SiPostman,
} from 'react-icons/si';

const techStack = [
	{ name: 'React', icon: <SiReact />, ver: '^18.2.0' },
	{ name: 'TypeScript', icon: <SiTypescript />, ver: '^5.0.0' },
	{ name: 'Tailwind CSS', icon: <SiTailwindcss />, ver: '^3.4.0' },
	{ name: 'Vite', icon: <SiVite />, ver: '^5.0.0' },
	{ name: 'Ant Design', icon: <SiAntdesign />, ver: '^5.12.0' },
	{ name: 'REST API', icon: <SiPostman />, ver: 'v1.0.0' },
];

const systems = [
	{
		title: 'Payment Integration',
		desc: 'Midtrans / Stripe-style flows, invoicing, payment status, webhooks, and reconciliation',
		icon: <SiStripe />,
		module: 'payment_engine.ts',
	},
	{
		title: 'KYC & Identity Verification',
		desc: 'ID upload, selfie verification, Dukcapil NIK validation, and approval workflows',
		icon: <SiFirebase />,
		module: 'kyc_pipeline.ts',
	},
	{
		title: 'Mapping & Geolocation',
		desc: 'Outlet locations, radius-based coverage, coordinates, and Google Maps API',
		icon: <SiGooglemaps />,
		module: 'geo_service.ts',
	},
	{
		title: 'Admin Dashboard',
		desc: 'User management, roles, pagination, filtering, and CSV export',
		icon: <SiReact />,
		module: 'admin_panel.tsx',
	},
	{
		title: 'Attendance System',
		desc: 'Class codes, validation, and attendance status (present, excused, absent)',
		icon: <SiTypescript />,
		module: 'attendance_core.ts',
	},
	{
		title: 'Data Reporting',
		desc: 'Summaries, charts, PDF exports, and real-time APIs',
		icon: <SiPostman />,
		module: 'reporting_service.ts',
	},
];

export default function Skills() {
	return (
		<section
			id="skills"
			className="relative py-32 bg-[#1b1715] text-[#d7c4b7] overflow-hidden font-sans">
			{/* Tech Grid Pattern (Espresso Brown Tinted) */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#2d2420_1px,transparent_1px),linear-gradient(to_bottom,#2d2420_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />

			{/* Warm Coffee Amber & Caramel Glows */}
			<div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-[#d97706]/10 blur-[150px] rounded-full pointer-events-none" />
			<div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#b45309]/10 blur-[150px] rounded-full pointer-events-none" />

			<div className="relative z-10 max-w-6xl mx-auto px-6 space-y-24">
				{/* 1. TECH STACK SECTION */}
				<div>
					{/* Header */}
					<div className="mb-10">
						<div className="inline-flex items-center gap-2 font-mono text-xs text-[#f59e0b] bg-[#3d2a1d] border border-[#78350f]/60 px-3 py-1 rounded-md mb-3">
							<Cpu className="w-3.5 h-3.5 text-[#fbbf24]" />
							<span>package.json --dependencies</span>
						</div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-3xl md:text-4xl font-extrabold font-mono text-[#fef3c7] tracking-tight">
							&lt;<span className="text-[#f59e0b]">TechStack</span> /&gt;
						</motion.h2>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
						{techStack.map((skill, i) => (
							<motion.div
								key={skill.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: i * 0.05 }}
								viewport={{ once: true }}
								whileHover={{ y: -4 }}
								className="bg-[#261f1c] border border-[#44352f] rounded-xl p-5 flex items-center justify-between gap-4 backdrop-blur hover:border-[#f59e0b]/50 hover:bg-[#2d2420] hover:shadow-xl hover:shadow-[#78350f]/10 transition-all duration-300">
								<div className="flex items-center gap-4">
									<div className="text-3xl text-[#f59e0b] p-2.5 rounded-lg bg-[#1b1715] border border-[#44352f]">
										{skill.icon}
									</div>
									<div>
										<p className="text-[#fef3c7] font-mono font-semibold text-sm">
											{skill.name}
										</p>
										<p className="text-[10px] font-mono text-[#a88b79] mt-0.5">
											{skill.ver}
										</p>
									</div>
								</div>
								<span className="w-2 h-2 rounded-full bg-[#f59e0b]/40"></span>
							</motion.div>
						))}
					</div>
				</div>

				{/* 2. WHAT I BUILD SECTION */}
				<div>
					{/* Header */}
					<div className="mb-10">
						<div className="inline-flex items-center gap-2 font-mono text-xs text-[#f59e0b] bg-[#3d2a1d] border border-[#78350f]/60 px-3 py-1 rounded-md mb-3">
							<Folder className="w-3.5 h-3.5 text-[#fbbf24]" />
							<span>src/modules/systems/</span>
						</div>
						<motion.h3
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-3xl font-extrabold font-mono text-[#fef3c7] tracking-tight">
							# What_I_Build
						</motion.h3>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{systems.map((item, i) => (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: i * 0.08 }}
								viewport={{ once: true }}
								whileHover={{ y: -4 }}
								className="group bg-[#261f1c] border border-[#44352f] rounded-xl overflow-hidden backdrop-blur hover:border-[#d97706]/60 hover:shadow-xl hover:shadow-[#78350f]/15 transition-all duration-300 flex flex-col justify-between">
								{/* Module Code Header */}
								<div className="px-4 py-2 bg-[#1b1715] border-b border-[#44352f] flex items-center justify-between font-mono text-[11px] text-[#a88b79]">
									<span className="flex items-center gap-1.5 text-[#f59e0b]">
										<Code2 className="w-3.5 h-3.5" />
										{item.module}
									</span>
									<span className="text-[9px] text-[#8c705f] uppercase font-semibold">
										EXPORT
									</span>
								</div>

								{/* Content */}
								<div className="p-6">
									<div className="text-3xl text-[#fbbf24] mb-4 p-2.5 w-fit rounded-lg bg-[#1b1715] border border-[#44352f] group-hover:border-[#f59e0b]/40 transition">
										{item.icon}
									</div>
									<h4 className="text-base font-bold text-[#fef3c7] font-mono mb-2 group-hover:text-[#f59e0b] transition">
										{item.title}
									</h4>
									<p className="text-[#a88b79] text-xs leading-relaxed font-sans">
										{item.desc}
									</p>
								</div>

								{/* Status Bar Footer */}
								<div className="px-6 py-2.5 bg-[#1b1715]/60 border-t border-[#44352f]/60 font-mono text-[10px] text-[#8c705f] flex items-center justify-between">
									<span>
										status:{' '}
										<span className="text-[#84cc16]">production_ready</span>
									</span>
									<span>v1.0</span>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
