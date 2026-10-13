import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './Filter';

describe('Компонент <Filter />', () => {
  it('рендерит переданный label', () => {
    render(<Filter label="исполнителю" isActive={false} onClick={() => {}} />);
    expect(screen.getByText('исполнителю')).toBeInTheDocument();
  });

  it('вызывает onClick при клике', () => {
    const handleClick = jest.fn();
    render(<Filter label="жанру" isActive={false} onClick={handleClick} />);
    fireEvent.click(screen.getByText('жанру'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('добавляет класс active, когда isActive = true', () => {
    const { container } = render(
      <Filter label="исполнителю" isActive onClick={() => {}} />,
    );
    const element = container.firstChild as HTMLElement;
    expect(element.className).toMatch(/active/);
  });

  it('не добавляет класс active, когда isActive = false', () => {
    const { container } = render(
      <Filter label="исполнителю" isActive={false} onClick={() => {}} />,
    );
    const element = container.firstChild as HTMLElement;
    expect(element.className).not.toMatch(/active/);
  });
});