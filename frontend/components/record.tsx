'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function RecordPage() {
	const [file, setFile] = useState(null);

	const handleFileChange = event => {
		setFile(event.target.files[0]);
	};

	const handleSubmit = async event => {
		event.preventDefault();

		if (!file) {
			alert('Please select an audio file to upload.');
			return;
		}

		const formData = new FormData();
		formData.append('audio', file);

		try {
			const response = await fetch('http://localhost:3000/analyze', {
				method: 'POST',
				body: formData,
			});
			const result = await response.json();
			alert(`Feedback: ${result.feedback}`);
		} catch (error) {
			console.error('Error uploading file:', error);
			alert('There was an error uploading the file. Please try again.');
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
						</CardContent>
					</Card>
				</div>
				<Button
					type='submit'
					className='w-full bg-[#247BA0] hover:bg-[#7594a2]'
				>
					Send Audio
				</Button>
			</form>
		</div>
	);
}
