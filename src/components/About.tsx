import { useState } from 'react';
import { motion } from 'framer-motion';
import {
	Terminal,
	CheckCircle2,
	Image as ImageIcon,
	Wallet,
	Copy,
	Check,
	ExternalLink,
	Send,
	Loader2,
} from 'lucide-react';
import profile from '../assets/profile.webp';

type EthereumRequest = {
	method: string;
	params?: readonly unknown[];
};

type EthereumProvider = {
	request: (request: EthereumRequest) => Promise<unknown>;
};

declare global {
	interface Window {
		ethereum?: EthereumProvider;
	}
}

// Daftar Wallet Lengkap
const WALLETS = [
	{
		chain: 'EVM (ETH / BNB / ARB)',
		address: '0x9013842255D6114495c2a940B859de044c487E5d',
		explorer:
			'https://etherscan.io/address/0x9013842255D6114495c2a940B859de044c487E5d',
		isEVM: true,
	},
	{
		chain: 'Bitcoin (BTC)',
		address: 'bc1qya5w5g4f08npwkqpp87nu0scz5prdvlxlmryvd',
		explorer:
			'https://mempool.space/address/bc1qya5w5g4f08npwkqpp87nu0scz5prdvlxlmryvd',
		isEVM: false,
	},
	{
		chain: 'Solana (SOL)',
		address: '8u6fhGPf9YVbVYAG7XATzcwNADJKqRdAFvzjpB7AvTAb',
		explorer:
			'https://solscan.io/account/8u6fhGPf9YVbVYAG7XATzcwNADJKqRdAFvzjpB7AvTAb',
		isEVM: false,
	},
	{
		chain: 'TRON (TRX)',
		address: 'TQzXpM8o85TmV6yy83MPhPGX7GjitD8un7',
		explorer:
			'https://tronscan.org/#/address/TQzXpM8o85TmV6yy83MPhPGX7GjitD8un7',
		isEVM: false,
	},
];

const EVM_WALLET = WALLETS[0].address;

const CHAINS = {
	'0x1': { name: 'Ethereum', symbol: 'ETH', explorer: 'https://etherscan.io' },
	'0xa': {
		name: 'Optimism',
		symbol: 'ETH',
		explorer: 'https://optimistic.etherscan.io',
	},
	'0x38': { name: 'BNB Chain', symbol: 'BNB', explorer: 'https://bscscan.com' },
	'0x89': {
		name: 'Polygon',
		symbol: 'POL',
		explorer: 'https://polygonscan.com',
	},
	'0x2105': { name: 'Base', symbol: 'ETH', explorer: 'https://basescan.org' },
	'0xa4b1': {
		name: 'Arbitrum',
		symbol: 'ETH',
		explorer: 'https://arbiscan.io',
	},
};
type ChainId = keyof typeof CHAINS;

const PRESETS = ['0.001', '0.005', '0.01'];

const shortAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

function toWei(amount: string) {
	const [whole, frac = ''] = String(amount).split('.');
	const fracPadded = (frac + '0'.repeat(18)).slice(0, 18);
	return BigInt(whole || '0') * 10n ** 18n + BigInt(fracPadded || '0');
}

function TipPanel() {
	const [amount, setAmount] = useState(PRESETS[1]);
	const [status, setStatus] = useState('idle');
	const [txHash, setTxHash] = useState('');
	const [chainId, setChainId] = useState<ChainId | ''>('');
	const [message, setMessage] = useState('');

	const chain = chainId ? CHAINS[chainId] : undefined;
	const validAmount = /^\d+(\.\d{1,18})?$/.test(amount) && Number(amount) > 0;

	const walletLink = validAmount
		? `ethereum:${EVM_WALLET}?value=${toWei(amount).toString()}`
		: `ethereum:${EVM_WALLET}`;

	async function sendTip() {
		if (!window.ethereum) {
			setStatus('error');
			setMessage('Wallet Web3 tidak terdeteksi di browser.');
			return;
		}
		try {
			setStatus('pending');
			setMessage('');
			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});
			if (
				!Array.isArray(accounts) ||
				typeof accounts[0] !== 'string' ||
				!accounts[0]
			) {
				throw new Error('Akun wallet tidak tersedia.');
			}
			const from = accounts[0];
			const currentChain = await window.ethereum.request({
				method: 'eth_chainId',
			});
			if (typeof currentChain === 'string' && currentChain in CHAINS) {
				setChainId(currentChain as ChainId);
			}

			const hash = await window.ethereum.request({
				method: 'eth_sendTransaction',
				params: [
					{
						from,
						to: EVM_WALLET,
						value: '0x' + toWei(amount).toString(16),
					},
				],
			});
			if (typeof hash !== 'string' || !hash) {
				throw new Error('Wallet tidak mengembalikan hash transaksi.');
			}
			setTxHash(hash);
			setStatus('success');
		} catch (err) {
			setStatus('error');
			const error =
				typeof err === 'object' && err !== null
					? (err as { code?: unknown; message?: unknown })
					: {};
			setMessage(
				error.code === 4001
					? 'Transaksi dibatalkan di wallet.'
					: typeof error.message === 'string'
						? error.message
						: 'Transaksi gagal.',
			);
		}
	}

	return (
		<div className="mt-3 rounded-lg border border-[#3e3229] bg-[#191411] p-4 space-y-3">
			<div className="flex flex-wrap gap-2">
				{PRESETS.map((p) => (
					<button
						key={p}
						type="button"
						onClick={() => setAmount(p)}
						className={`px-2.5 py-1 rounded border text-xs transition ${
							amount === p
								? 'border-[#d99b73] text-[#f4eae1] bg-[#2e241e]'
								: 'border-[#3e3229] text-[#8c7b6c] hover:border-[#d99b73]/50'
						}`}>
						{p}
					</button>
				))}
				<div className="flex items-center gap-2 ml-auto text-xs text-[#8c7b6c]">
					<input
						type="text"
						inputMode="decimal"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						className="w-24 bg-[#241d18] border border-[#3e3229] rounded px-2 py-1 text-[#f4eae1] focus:outline-none focus:border-[#d99b73]"
					/>
					<span>{chain?.symbol || 'EVM Token'}</span>
				</div>
			</div>

			<div className="flex flex-wrap gap-2">
				<button
					type="button"
					onClick={sendTip}
					disabled={!validAmount || status === 'pending'}
					className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#a75d3f] text-[#f4eae1] text-xs font-bold hover:bg-[#b96b49] disabled:opacity-50 transition">
					{status === 'pending' ? (
						<Loader2 className="w-3.5 h-3.5 animate-spin" />
					) : (
						<Send className="w-3.5 h-3.5" />
					)}
					{status === 'pending' ? 'Menunggu wallet...' : 'Kirim via EVM Web3'}
				</button>
				<a
					href={walletLink}
					className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-[#3e3229] text-[#d99b73] text-xs hover:border-[#d99b73]/60 transition">
					<Wallet className="w-3.5 h-3.5" />
					Buka App Wallet
				</a>
			</div>

			<div className="text-xs">
				{status === 'success' && (
					<p className="text-[#3fb950]">
						Terkirim. Terima kasih!{' '}
						{chain && (
							<a
								href={`${chain.explorer}/tx/${txHash}`}
								target="_blank"
								rel="noopener noreferrer"
								className="underline">
								Lihat transaksi
							</a>
						)}
					</p>
				)}
				{status === 'error' && <p className="text-[#e5785a]">{message}</p>}
			</div>
		</div>
	);
}

export default function About() {
	const startYear = 2023;
	const currentYear = new Date().getFullYear();
	const yearsOfExperience = currentYear - startYear;

	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
	const [showTip, setShowTip] = useState(false);

	async function copyAddress(addr: string, index: number) {
		try {
			await navigator.clipboard.writeText(addr);
			setCopiedIndex(index);
			setTimeout(() => setCopiedIndex(null), 1800);
		} catch {
			/* clipboard error handler */
		}
	}

	return (
		<section
			id="about"
			className="relative py-24 md:py-32 px-6 bg-[#1c1815] text-[#dcd0c0] overflow-hidden font-sans">
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#2d2621_1px,transparent_1px),linear-gradient(to_bottom,#2d2621_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />

			<div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
				{/* LEFT: Image */}
				<motion.div
					initial={{ opacity: 0, x: -40 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="md:col-span-5 flex justify-center">
					<div className="w-full max-w-sm rounded-xl border border-[#3e3229] bg-[#241d18] overflow-hidden shadow-2xl">
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

						<div className="p-4 bg-[#1c1815] relative group">
							<img
								src={profile}
								alt="Zakaria Saputra"
								className="w-full h-80 object-cover rounded-lg sepia-[0.35] brightness-90 contrast-110 group-hover:sepia-0 transition-all duration-500 border border-[#3e3229]"
							/>
							<div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#8c7b6c] px-1">
								<span className="flex items-center gap-1.5 text-[#3fb950]">
									<CheckCircle2 className="w-3.5 h-3.5" /> Dev_Verified
								</span>
								<span>RGB / 8-bit</span>
							</div>
						</div>
					</div>
				</motion.div>

				{/* RIGHT: Info & Wallets */}
				<motion.div
					initial={{ opacity: 0, x: 40 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="md:col-span-7 space-y-6">
					<div>
						<div className="inline-flex items-center gap-2 font-mono text-xs text-[#d99b73] bg-[#2e241e] border border-[#a75d3f]/40 px-3 py-1 rounded-md mb-3 shadow-sm">
							<Terminal className="w-3.5 h-3.5 text-[#d99b73]" />
							<span>cat README.md</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-extrabold text-[#f4eae1] font-mono tracking-tight">
							# About <span className="text-[#d99b73]">Developer</span>
						</h2>
					</div>

					<div className="space-y-4 font-sans text-base text-[#a39485] leading-relaxed">
						<p className="border-l-2 border-[#d99b73] pl-4">
							I am a{' '}
							<strong className="text-[#f4eae1] font-mono">
								Frontend &amp; Web3 Developer
							</strong>{' '}
							focused on building modern, fast, and scalable web applications.
						</p>
					</div>

					{/* Wallet List Section */}
					<div className="rounded-lg border border-[#3e3229] bg-[#241d18] p-4 font-mono space-y-3">
						<div className="flex items-center justify-between gap-2 border-b border-[#3e3229] pb-2 text-xs text-[#8c7b6c]">
							<div className="flex items-center gap-2">
								<Wallet className="w-4 h-4 text-[#d99b73]" />
								<span>Crypto Donation Addresses</span>
							</div>
							<button
								type="button"
								onClick={() => setShowTip((v) => !v)}
								className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2e241e] border border-[#a75d3f]/50 text-[#d99b73] text-[11px] hover:bg-[#3a2c24] transition">
								<Send className="w-3 h-3" />
								{showTip ? 'Tutup Web3 Tip' : 'EVM Direct Tip'}
							</button>
						</div>

						<div className="space-y-2">
							{WALLETS.map((item, idx) => (
								<div
									key={item.chain}
									className="flex items-center justify-between text-xs bg-[#1c1815] p-2 rounded border border-[#3e3229]/60">
									<div className="flex flex-col">
										<span className="text-[10px] text-[#8c7b6c]">
											{item.chain}
										</span>
										<code
											className="text-[#f4eae1]"
											title={item.address}>
											{shortAddress(item.address)}
										</code>
									</div>
									<div className="flex items-center gap-1.5">
										<button
											type="button"
											onClick={() => copyAddress(item.address, idx)}
											className="p-1.5 rounded border border-[#3e3229] text-[#d99b73] hover:border-[#d99b73]/60 transition">
											{copiedIndex === idx ? (
												<Check className="w-3.5 h-3.5 text-[#3fb950]" />
											) : (
												<Copy className="w-3.5 h-3.5" />
											)}
										</button>
										<a
											href={item.explorer}
											target="_blank"
											rel="noopener noreferrer"
											className="p-1.5 rounded border border-[#3e3229] text-[#d99b73] hover:border-[#d99b73]/60 transition">
											<ExternalLink className="w-3.5 h-3.5" />
										</a>
									</div>
								</div>
							))}
						</div>

						{showTip && <TipPanel />}
					</div>

					{/* Stats */}
					<div className="pt-2 grid grid-cols-3 gap-4 font-mono">
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
								className="bg-[#241d18] border border-[#3e3229] rounded-lg p-3.5 text-left">
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
