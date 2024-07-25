import { emojiMap } from '@/utils/emojiMap';
import { Feedback } from '@/types';

interface MessageProps {
	content?:
		| {
				feedback?: Feedback;
				outputPath?: string;
				tunedOutputPath?: string;
		  }
		| string;
}

export const Message = ({ content }: MessageProps) => {
	if (!content) {
		return <p>No content available</p>;
	}

	let parsedContent: any;
	if (typeof content === 'string') {
		if (isValidJSON(content)) {
			parsedContent = JSON.parse(content);
		} else {
			return <p>{content}</p>;
		}
	} else {
		parsedContent = content;
	}

	if (!parsedContent.feedback) {
		return <p>No content available</p>;
	}

	const aspects: (keyof Feedback)[] = ['pitch', 'timbre', 'dynamics', 'articulation', 'rhythm', 'breath_control', 'vibrato', 'overall'];

	return (
		<div className='space-y-4'>
			{aspects.map(aspect => (
				<div
					key={aspect}
					className='border-b pb-4'
				>
					<h2 className='text-xl font-semibold'>
						{emojiMap[aspect]} {aspect.charAt(0).toUpperCase() + aspect.slice(1)}
					</h2>
					<p>
						<span className='font-semibold'>Rating:</span> {parsedContent.feedback[aspect]?.rating}
					</p>
					<p>
						<span className='font-semibold'>Feedback:</span> {parsedContent.feedback[aspect]?.feedback}
					</p>
					<p>
						<span className='font-semibold'>Recommendations:</span> {parsedContent.feedback[aspect]?.recommendations}
					</p>
					<p>
						<span className='font-semibold'>Exercises:</span> {parsedContent.feedback[aspect]?.exercises}
					</p>
				</div>
			))}
			{parsedContent.feedback.music && (
				<>
					<h2 className='text-xl font-semibold'>Songs similar to your vocals</h2>
					{Object.keys(parsedContent.feedback.music).map((key, index) => (
						<p key={index}>
							<span className='font-semibold'>{index + 1}:</span> {parsedContent.feedback.music![key]}
						</p>
					))}
				</>
			)}
			{parsedContent.outputPath && (
				<div className='mt-4'>
					<h2 className='text-xl font-semibold'>Analysis Graph</h2>
					<img
						src={parsedContent.outputPath}
						alt='Analysis Graph'
						className='border rounded-lg shadow-lg'
					/>
				</div>
			)}
			{parsedContent.tunedOutputPath && (
				<div className='mt-4'>
					<h2 className='text-xl font-semibold'>Tuned Audio</h2>
					<p className='my-4'>A version of your ideal voice as assessed by our assistant. (This function is under development, so it may not work correctly)</p>
					<audio
						controls
						className='w-full'
					>
						<source
							src={parsedContent.tunedOutputPath}
							type='audio/wav'
						/>
					</audio>
				</div>
			)}
		</div>
	);
};

function isValidJSON(str: string): boolean {
	try {
		JSON.parse(str);
		return true;
	} catch {
		return false;
	}
}
