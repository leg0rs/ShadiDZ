import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetCountriesQueryDto {
	@Type(() => Number)
	@IsInt()
	@Min(1)
	start!: number;

	@Type(() => Number)
	@IsInt()
	@Min(1)
	end!: number;

	@IsOptional()
	@IsString()
	search?: string;

	@IsOptional()
	@IsIn(['PopUP', 'PopDown', 'AreaUP', 'AreaDown', 'Region', 'None'])
	sortBy?: string;
}
