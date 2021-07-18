import { IsBoolean } from 'class-validator';

export class UpdateTaskDto {
    @IsBoolean()
    isChecked: boolean;
}

export default UpdateTaskDto;
