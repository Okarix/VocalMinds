import { emojiMap } from '@/utils/emojiMap';
import { Feedback } from '@/app/types';

interface MessageProps {
	content?: {
		feedback: Feedback;
		outputPath?: string;
	};
}

export const Message = ({ content }: MessageProps) => {
	if (!content || !content.feedback) {
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
						<span className='font-semibold'>Rating:</span> {content.feedback[aspect]?.rating}
					</p>
					<p>
						<span className='font-semibold'>Feedback:</span> {content.feedback[aspect]?.feedback}
					</p>
					<p>
						<span className='font-semibold'>Recommendations:</span> {content.feedback[aspect]?.recommendations}
					</p>
					<p>
						<span className='font-semibold'>Exercises:</span> {content.feedback[aspect]?.exercises}
					</p>
				</div>
			))}
			{content.feedback.music && (
				<>
					<h2 className='text-xl font-semibold'>Songs similar to your vocals</h2>
					{Object.keys(content.feedback.music).map((key, index) => (
						<p key={index}>
							<span className='font-semibold'>{index + 1}:</span> {content.feedback.music![key]}
						</p>
					))}
				</>
			)}
			{content.outputPath && (
				<div className='mt-4'>
					<h2 className='text-xl font-semibold'>Analysis Graph</h2>
					<img
						src={content.outputPath}
						alt='Analysis Graph'
						className='border rounded-lg shadow-lg'
					/>
				</div>
			)}
		</div>
	);
};
