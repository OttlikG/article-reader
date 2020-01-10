import { CommonWrapper } from 'enzyme'
import { act } from "react-dom/test-utils";

export default async function actions(
	component: CommonWrapper,
	_actions: Function,
	done?: Function,
	delay: number = 0
) {
	await act(async () => {
		await new Promise(resolve => {
			setTimeout(resolve, delay);
		});

		component.update();
		_actions();
		if (done) done();
	});
}
