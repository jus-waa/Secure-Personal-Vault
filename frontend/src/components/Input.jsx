const Input = ({ icon: Icon, ...props }) => {
	return (
		<div className='relative mb-6'>
			<div className='absolute h-12 left-0 flex items-center pl-3 pointer-events-none'>
				<Icon className='size-5 text-sky-500' />
			</div>
			<input
				{...props}
				className='input-box pl-10'
			/>
		</div>
	);
};
export default Input;