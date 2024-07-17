'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '@/context/ChatContext';
import axios from 'axios';
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function UploadAudioPage() {
	const [file, setFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [fileName, setFileName] = useState('');
	const [isRecording, setIsRecording] = useState(false);
	const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
	const [recordingTime, setRecordingTime] = useState(0);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const router = useRouter();
	const { addMessage } = useChat();

	useEffect(() => {
		let interval: NodeJS.Timeout | undefined;
		if (isRecording) {
			interval = setInterval(() => {
				setRecordingTime(prev => prev + 1);
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isRecording]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const selectedFile = files[0];
			setFile(selectedFile);
			setFileName(selectedFile.name);
		} else {
			setFile(null);
			setFileName('');
		}
	};

	const startRecording = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		const mediaRecorder = new MediaRecorder(stream);
		mediaRecorderRef.current = mediaRecorder;
		audioChunksRef.current = [];

		mediaRecorder.ondataavailable = event => {
			audioChunksRef.current.push(event.data);
		};

		mediaRecorder.onstop = () => {
			const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
			setRecordedBlob(audioBlob);
			setFile(new File([audioBlob], 'recorded_audio.wav'));
			setFileName('recorded_audio.wav');
		};

		mediaRecorder.start();
		setRecordingTime(0);
		setIsRecording(true);
		setFile(null);
		setFileName('');
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!file && !recordedBlob) {
			alert('Please select or record an audio file to upload.');
			return;
		}

		setIsUploading(true);
		const formData = new FormData();
		if (file) {
			formData.append('audio', file);
		} else if (recordedBlob) {
			formData.append('audio', recordedBlob, 'recorded_audio.wav');
		}

		try {
			const response = await axios.post('http://localhost:3000/analyze', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			const result = response.data;
			addMessage({ role: 'system', content: JSON.stringify(result, null, 2), timestamp: new Date().toISOString() });
			router.push('/chat');
		} catch (error) {
			console.error('Error uploading file:', error);
			alert('There was an error uploading the file. Please try again.');
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className='container mx-auto max-w-6xl py-12 px-4 md:px-6'>
			<h1 className='text-3xl font-bold mb-6'>How to Record Audio</h1>
			<div className='flex flex-col gap-2 mb-6'>
				<p className='text-muted-foreground'>
					- <strong>Record Audio:</strong> Click "Start Recording" and sing or speak for 15 seconds. Click "Stop Recording" when you're done.
				</p>
				<p className='text-muted-foreground'>
					- <strong>Upload Audio:</strong> You can also upload a pre-recorded audio file from your device.
				</p>
			</div>
			<form
				onSubmit={handleSubmit}
				className='grid gap-6'
			>
				<div className='grid gap-2'>
					<h1 className='text-3xl font-bold'>Send Audio</h1>
					<p className='text-muted-foreground'>Choose to upload a pre-recorded audio file or record your own.</p>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<Card className='border-[#247BA0] rounded-[4px]'>
						<CardHeader>
							<CardTitle>Record Audio</CardTitle>
							<CardDescription>Record your audio for 15 seconds.</CardDescription>
						</CardHeader>
						<CardContent>
							{isRecording ? (
								<>
									<Button
										type='button'
										onClick={stopRecording}
										className='bg-[#247BA0] hover:bg-red-600 text-[#fff] rounded-[4px]'
									>
										Stop Recording
									</Button>
									<p className='mt-2'>Recording time: {recordingTime} seconds</p>
								</>
							) : (
								<Button
									type='button'
									onClick={startRecording}
									className='bg-[#247BA0] hover:bg-[#7594a2] text-[#fff] rounded-[4px]'
								>
									Start Recording
								</Button>
							)}
							{recordedBlob && (
								<audio
									controls
									className='mt-2'
								>
									<source
										src={URL.createObjectURL(recordedBlob)}
										type='audio/wav'
									/>
								</audio>
							)}
						</CardContent>
					</Card>
					<Card className='border-[#247BA0] rounded-[4px]'>
						<CardHeader>
							<CardTitle>Upload Audio</CardTitle>
							<CardDescription>Select an audio file from your device to send.</CardDescription>
						</CardHeader>
						<CardContent>
							<Input
								type='file'
								id='audio-upload'
								accept='audio/*'
								onChange={handleFileChange}
							/>
							{fileName && <p className='mt-2 text-green-600'>File selected: {fileName}</p>}
						</CardContent>
					</Card>
				</div>
				<div className='flex justify-center'>
					<Button
						type='submit'
						className='w-[40%] bg-[#247BA0] hover:bg-[#7594a2] text-[#fff] rounded-[4px]'
						disabled={isUploading}
					>
						{isUploading ? 'Loading...' : 'Send Audio'}
					</Button>
				</div>
			</form>
		</div>
	);
}
