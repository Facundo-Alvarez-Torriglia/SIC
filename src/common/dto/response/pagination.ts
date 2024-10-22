import { IsArray, IsNumber } from 'class-validator'

export class ListPagination<T> {
  @IsArray()
  public items: T[] = []
  @IsNumber()
  public pageCount = 0
  @IsNumber()
  public page = 1
  @IsNumber()
  public pageSize = 10
  @IsNumber()
  public total = 10
}