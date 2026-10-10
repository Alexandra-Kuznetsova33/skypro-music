import { render, screen, fireEvent } from '@testing-library/react';
import FilterItem from './FilterItem';

describe('Компонент <FilterItem />', () => {
  it('рендерит переданный текст', () => {
    render(<FilterItem item="Nero" onClick={() => {}} />);
    expect(screen.getByText('Nero')).toBeInTheDocument();
  });

  it('вызывает onClick с текстом элемента', () => {
    const handleClick = jest.fn();
    render(<FilterItem item="Basta" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Basta'));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith('Basta');
  });

  it('добавляет класс selected, когда isSelected = true', () => {
    const { container } = render(
      <FilterItem item="Nero" onClick={() => {}} isSelected />,
    );
    const element = container.firstChild as HTMLElement;
    expect(element.className).toMatch(/selected/);
  });

  it('не добавляет класс selected, когда isSelected = false', () => {
    const { container } = render(
      <FilterItem item="Nero" onClick={() => {}} isSelected={false} />,
    );
    const element = container.firstChild as HTMLElement;
    expect(element.className).not.toMatch(/selected/);
  });
});