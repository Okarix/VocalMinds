'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '@/context/ChatContext';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import AudioCard from '@/components/audio-card';

export default function UploadAudioPage() {
	const [file, setFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [fileName, setFileName] = useState('');
	const [isRecording, setIsRecording] = useState(false);
	const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
	const [recordingTime, setRecordingTime] = useState(0);
	const [loadingMessage, setLoadingMessage] = useState('');

	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const router = useRouter();
	const { addMessage } = useChat();

	const loadingMessages = ['Loading...', 'Analyzing your voice...', 'Building a graph based on your voice...', 'Searching for similar performance styles...', 'Processing audio data...', 'Applying voice recognition algorithms...'];

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isUploading) {
			let index = 0;
			setLoadingMessage(loadingMessages[0]);
			interval = setInterval(() => {
				index = (index + 1) % loadingMessages.length;
				setLoadingMessage(loadingMessages[index]);
			}, 2000);
		}
		return () => clearInterval(interval);
	}, [isUploading]);

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
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
			mediaRecorderRef.current = mediaRecorder;
			audioChunksRef.current = [];

			mediaRecorder.ondataavailable = event => {
				audioChunksRef.current.push(event.data);
			};

			mediaRecorder.onstop = () => {
				const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
				setRecordedBlob(audioBlob);
				console.log('Recorded audio MIME type:', audioBlob.type);

				const file = new File([audioBlob], `recorded_audio_${Date.now()}.webm`, { type: 'audio/webm' });
				setFile(file);
				setFileName(`recorded_audio_${Date.now()}.webm`);

				// const audioUrl = URL.createObjectURL(audioBlob);
				// const audio = new Audio(audioUrl);
				// audio.play();
			};

			mediaRecorder.start();
			setRecordingTime(0);
			setIsRecording(true);
		} catch (error) {
			console.error('Error starting recording:', error);
			alert('Failed to start recording. Please check your microphone permissions.');
		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!file) {
			alert('Please select or record an audio file to upload.');
			return;
		}

		setIsUploading(true);
		const formData = new FormData();
		formData.append('audio', file);

		try {
			const response = await axios.post('https://vocalminds-production.up.railway.app/analyze', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			const result = response.data;
			console.log(result);
			addMessage({ role: 'system', content: JSON.stringify(result, null, 2), timestamp: new Date().toISOString() });
			router.push('/chat');
		} catch (error: any) {
			console.error('Error uploading file:', error.response?.data || error.message);
			console.log(error);
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
					- <strong>Record Audio:</strong> Click &quot;Start Recording&quot; and sing or speak for 15 seconds. Click &quot;Stop Recording&quot; when you&apos;re done.
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
					<AudioCard
						title='Record Audio'
						description='Record your audio for 15 seconds.'
						isRecording={isRecording}
						recordingTime={recordingTime}
						onStartRecording={startRecording}
						onStopRecording={stopRecording}
						recordedBlob={recordedBlob}
					/>
					<AudioCard
						title='Upload Audio'
						description='Select an audio file from your device to send.'
						onFileChange={handleFileChange}
						fileName={fileName}
					/>
				</div>
				<div className='flex justify-center'>
					<Button
						type='submit'
						className='w-[40%] bg-[#247BA0] hover:bg-[#7594a2] text-[#fff] rounded-[4px]'
						disabled={isUploading}
					>
						{isUploading ? loadingMessage : 'Send Audio'}
					</Button>
				</div>
			</form>
		</div>
	);
}
