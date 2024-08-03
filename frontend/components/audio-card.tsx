'use client';
import React from 'react';
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AudioCardProps {
	title: string;
	description: string;
	isRecording?: boolean;
	recordingTime?: number;
	onStartRecording?: () => void;
	onStopRecording?: () => void;
	recordedBlob?: Blob | null;
	onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	fileName?: string;
}

const AudioCard: React.FC<AudioCardProps> = ({ title, description, isRecording, recordingTime, onStartRecording, onStopRecording, recordedBlob, onFileChange, fileName }) => {
	return (
		<Card className='border-[#247BA0] rounded-[4px]'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				{onStartRecording && onStopRecording ? (
					<>
						{isRecording ? (
							<>
								<Button
									type='button'
									onClick={onStopRecording}
									className='bg-[#247BA0] hover:bg-red-600 text-[#fff] rounded-[4px]'
								>
									Stop Recording
								</Button>
								<p className='mt-2'>Recording time: {recordingTime} seconds</p>
							</>
						) : (
							<Button
								type='button'
								onClick={onStartRecording}
								className='bg-[#247BA0] mt-[20px] md:mt-0 hover:bg-[#7594a2] text-[#fff] rounded-[4px]'
							>
								Start Recording
							</Button>
						)}
						{recordedBlob && (
							<audio
								controls
								className='mt-2 w-[100%] md:w-[60%]'
							>
								<source
									src={URL.createObjectURL(recordedBlob)}
									type='audio/wav'
								/>
							</audio>
						)}
					</>
				) : (
					<>
						<Input
							type='file'
							id='audio-upload'
							accept='audio/*'
							onChange={onFileChange}
						/>
						{fileName && <p className='mt-2 text-[#58ad58]   '>File selected: {fileName.slice(0, 14)}</p>}
					</>
				)}
			</CardContent>
		</Card>
	);
};

export default AudioCard;
