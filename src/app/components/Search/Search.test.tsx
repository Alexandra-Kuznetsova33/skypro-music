import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Компонент <Search />', () => {
  it('рендерится с placeholder "Поиск"', () => {
    render(<Search value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Поиск')).toBeInTheDocument();
  });

  it('отображает переданное значение', () => {
    render(<Search value="Nero" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('Поиск') as HTMLInputElement;
    expect(input.value).toBe('Nero');
  });

  it('вызывает onChange при вводе', () => {
    const handleChange = jest.fn();
    render(<Search value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Поиск');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('test');
  });
});