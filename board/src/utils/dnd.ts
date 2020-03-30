import { ICardData } from "@models/ICardData";

export const removePlaceholder = function (cards: ICardData[]): ICardData[] {
  return cards.filter(({ type }) => type !== 'placeholder');
};

export const hasPlaceholder = function (cards: ICardData[]): boolean {
  return cards.some(({ type }) => type === 'placeholder');
};

export const isInArea = (offset: any, rect: any): boolean => {
  return offset.x >= rect.left && offset.x <= rect.right &&
    offset.y >= rect.top;
};

export const isBefore = (offset: any, rect: any, height: number): boolean => {
  return offset.y < rect.top + height / 2;
};

export const getDragIndex = function (wrapper: any, offset: any, sourceOffset: any) {
  const cards = Array.from(wrapper.current.querySelectorAll(
    '[data-card="true"]'
  ));

  let index = 0;
  
  cards.forEach((card: any, i: number) => {
    const rect = card.getBoundingClientRect();
    if (isInArea(offset, rect)) {
      if (isBefore(offset, rect, card.offsetHeight)) {
        index = i;
      } else {
        index = i + 1;
      }
    }
  });

  return index;
};