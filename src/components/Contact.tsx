import { motion } from 'framer-motion';
import {
	Github,
	Linkedin,
	Mail,
	Instagram,
	Terminal,
	Send,
	CheckCircle2,
	MessageSquareCode,
} from 'lucide-react';

const contactLinks = [
	{
		name: 'EMAIL_PROTOCOL',
		value: 'zakaria.zrs14@gmail.com',
		href: 'mailto:zakaria.zrs14@gmail.com',
		icon: Mail,
		sub: 'direct_inbox',
	},
	{
		name: 'GITHUB_REPOS',
		value: 'projack14',
		href: 'https://github.com/projack14',
		icon: Github,
		sub: 'source_code',
	},
	{
		name: 'LINKEDIN_NET',
		value: 'Zakaria Saputra',
		href: 'https://linkedin.com/in/zakaria-saputra',
		icon: Linkedin,
		sub: 'professional',
	},
	{
		name: 'INSTAGRAM_FEED',
		value: '@haijack__',
		href: 'https://instagram.com/haijack__',
		icon: Instagram,
		sub: 'social_logs',
	},
];

export default function Contact() {
	return (
		<section
			id="contact"
			className="relative py-24 md:py-32 bg-[#1c1815] text-[#dcd0c0] overflow-hidden font-sans">
			{/* Earthy Grid Pattern */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#2d2621_1px,transparent_1px),linear-gradient(to_bottom,#2d2621_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />

			{/* Terracotta & Warm Sand Glows */}
			<div className="absolute top-1/2 -left-40 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-[#a75d3f]/15 blur-[160px] rounded-full pointer-events-none" />
			<div className="absolute bottom-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#827150]/15 blur-[160px] rounded-full pointer-events-none" />

			<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
				{/* LEFT: Heading & Pitch */}
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}>
					<div className="inline-flex items-center gap-2 font-mono text-xs text-[#d99b73] bg-[#2e241e] border border-[#a75d3f]/40 px-3.5 py-1.5 rounded-md mb-6 shadow-sm">
						<MessageSquareCode className="w-3.5 h-3.5 text-[#d99b73]" />
						<span>socket.connect("--init-collaboration")</span>
					</div>

					<h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono text-[#f4eae1] leading-tight tracking-tight">
						Let’s build <br />
						<span className="text-[#d99b73]">something_impactful</span>.
					</h2>

					<p className="mt-6 text-sm md:text-base text-[#a39485] leading-relaxed font-sans">
						If you are building a serious product, startup, or government-grade
						system and need a frontend engineer who understands UI, UX, data,
						and performance — this is where we connect.
					</p>

					<div className="mt-8 p-4 rounded-xl bg-[#241d18] border border-[#3e3229] font-mono text-xs text-[#a39485] space-y-2">
						<div className="flex items-center gap-2 text-[#3fb950]">
							<CheckCircle2 className="w-4 h-4" />
							<span>STATUS: OPEN_FOR_NEW_PROJECTS</span>
						</div>
						<p className="text-[11px] text-[#8c7b6c] pl-6">
							Available for freelance, contract, and long-term full-stack
							frontend roles.
						</p>
					</div>
				</motion.div>

				{/* RIGHT: Terminal Connection Console */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="rounded-2xl border border-[#3e3229] bg-[#241d18] overflow-hidden shadow-2xl shadow-[#a75d3f]/10">
					{/* Console Header Bar */}
					<div className="px-4 py-3 bg-[#191411] border-b border-[#3e3229] flex items-center justify-between font-mono text-xs">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-[#a75d3f]" />
							<div className="w-3 h-3 rounded-full bg-[#d99b73]" />
							<div className="w-3 h-3 rounded-full bg-[#827150]" />
						</div>
						<div className="text-[#8c7b6c] text-[11px] flex items-center gap-1.5">
							<Terminal className="w-3.5 h-3.5 text-[#d99b73]" />
							<span>connect_endpoint.sh</span>
						</div>
						<span className="text-[10px] text-[#3fb950] bg-[#1c1815] border border-[#3e3229] px-2 py-0.5 rounded">
							ACTIVE
						</span>
					</div>

					{/* Console Content / Links */}
					<div className="p-6 space-y-4 bg-[#241d18]">
						<div className="text-xs font-mono text-[#8c7b6c] mb-2">
							// Select connection channel to initialize chat:
						</div>

						{contactLinks.map((item) => {
							const Icon = item.icon;
							return (
								<motion.a
									key={item.name}
									href={item.href}
									target={item.href.startsWith('mailto') ? '_self' : '_blank'}
									rel="noopener noreferrer"
									whileHover={{ x: 4 }}
									className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-[#191411] border border-[#3e3229] hover:border-[#d99b73]/60 hover:bg-[#2e241e] transition-all duration-300">
									<div className="flex items-center gap-3.5 min-w-0">
										<div className="p-2.5 rounded-lg bg-[#241d18] border border-[#3e3229] group-hover:border-[#d99b73]/40 group-hover:text-[#d99b73] text-[#a39485] transition">
											<Icon className="w-4 h-4" />
										</div>
										<div className="min-w-0">
											<div className="text-[10px] font-mono text-[#8c7b6c]">
												{item.name}
											</div>
											<div className="text-xs sm:text-sm font-mono font-medium text-[#f4eae1] group-hover:text-[#d99b73] truncate transition">
												{item.value}
											</div>
										</div>
									</div>

									<div className="text-[#8c7b6c] group-hover:text-[#f4eae1] transition pl-2">
										<Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
									</div>
								</motion.a>
							);
						})}

						{/* EOF Terminal Footer */}
						<div className="pt-2 flex items-center justify-between font-mono text-[10px] text-[#8c7b6c]">
							<span>EOF (End of File)</span>
							<span className="flex items-center gap-1.5 text-[#d99b73]">
								<span>zakaria.saputra</span>
								<span className="animate-pulse w-1.5 h-3 bg-[#d99b73] inline-block" />
							</span>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
