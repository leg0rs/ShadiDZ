import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetCountriesQueryDto {
	@ApiPropertyOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	start!: number;

	@ApiPropertyOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	end!: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	search?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsIn(['PopUP', 'PopDown', 'AreaUP', 'AreaDown', 'Region', 'None'])
	sortBy?: string;
}
