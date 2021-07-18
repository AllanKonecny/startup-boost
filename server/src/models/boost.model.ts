import { IStage, ITask } from '@interfaces/boost.interface';

const tasks1: ITask[] = [
    { id: 1, name: 'Setup virtual office', isChecked: false },
    { id: 2, name: 'Set mission & vision', isChecked: false },
    { id: 3, name: 'Select business name', isChecked: false }
]
const tasks2: ITask[] = [
    { id: 1, name: 'Create roadmap', isChecked: false },
    { id: 2, name: 'Competitor analysis', isChecked: false },
]
const tasks3: ITask[] = [
    { id: 1, name: 'Release marketing website', isChecked: false },
    { id: 2, name: 'Release MVP', isChecked: false },
]

const boostModel: IStage[] = [
        { id: 1, name: 'Foundation', tasks: tasks1, isComplete: false },
        { id: 2, name: 'Discovery', tasks: tasks2, isComplete: false },
        { id: 3, name: 'Delivery', tasks: tasks3, isComplete: false }
    ]
;

export default boostModel;
