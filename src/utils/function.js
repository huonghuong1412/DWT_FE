const calculateProgressTaskBySteps = (subtasks) => {
	let countStepComplete = 0;
	let stepsLength = 0;

	subtasks.forEach((item) => {
		stepsLength += item.steps.length;
	});

	subtasks.forEach((item) => {
		const { steps } = item;
		steps?.forEach((step) => {
			if (step.status === 1) countStepComplete += 1;
		});
	});
	return Math.round((countStepComplete / stepsLength) * 100);
};

const calculateProgressSubTaskBySteps = (subtasks) => {
	const subtasksLength = subtasks?.length;
	let count = 0;
	subtasks?.forEach((item) => {
		if (item?.status === 1) count += 1;
	});
	return Math.floor((count / subtasksLength) * 100);
};

// eslint-disable-next-line import/prefer-default-export
export { calculateProgressTaskBySteps, calculateProgressSubTaskBySteps };
