import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
	return (
		<div className='flex items-center'>
			<input
				type={type}
				className={cn('hidden', className)}
				ref={ref}
				{...props}
			/>
			<label
				htmlFor={props.id}
				className=' cursor-pointer inline-block bg-[#247BA0] hover:bg-[#7594a2] px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200'
			>
				{props.placeholder || 'Choose File'}
			</label>
		</div>
	);
});
Input.displayName = 'Input';

export { Input };
