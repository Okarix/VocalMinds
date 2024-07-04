'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useChat } from '@/context/ChatContext';
import axios from 'axios';

export function RecordPage() {
	const [file, setFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [fileName, setFileName] = useState('');
	const router = useRouter();
	const { addMessage } = useChat();

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement> | any) => {
		const selectedFile = event.target.files[0];
		setFile(selectedFile);
		setFileName(selectedFile ? selectedFile.name : '');
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!file) {
			alert('Please select an audio file to upload.');
			return;
		}

		setIsUploading(true);
		const formData = new FormData();
		formData.append('audio', file);

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
		<div className='container mx-auto max-w-2xl py-12 px-4 md:px-6'>
			<form
				onSubmit={handleSubmit}
				className='grid gap-6'
			>
				<div className='grid gap-2'>
					<h1 className='text-3xl font-bold'>Send Audio</h1>
					<p className='text-muted-foreground'>Choose to upload a pre-recorded audio file or record your own.</p>
				</div>
				<div className='grid gap-4'>
					<Card>
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
				<Button
					type='submit'
					className='w-full bg-[#247BA0] hover:bg-[#7594a2]'
					disabled={isUploading}
				>
					{isUploading ? 'Loading...' : 'Send Audio'}
				</Button>
			</form>
		</div>
	);
}
