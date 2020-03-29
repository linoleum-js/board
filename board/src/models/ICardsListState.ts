import { ICardData } from '@models/ICardData';

export interface ICardsListState {
  isLoading: boolean;
  list: ICardData[];
}