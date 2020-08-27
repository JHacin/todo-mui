import { renderHook, act } from '@testing-library/react-hooks';
import { useTodoFormContext, TodoFormValues } from './index';
import dayjs from 'dayjs';

const mockInitialValues: TodoFormValues = {
  text: 'Hello',
  dueDate: dayjs().add(1, 'day'),
};

const setupContext = () => {
  const handler = jest.fn();

  const { result } = renderHook(() =>
    useTodoFormContext({
      initialValues: mockInitialValues,
      onSubmit: handler,
    })
  );

  return { result, handler };
};

describe('useTodoFormContext', () => {
  it('handles initial values', () => {
    const { result } = setupContext();
    expect(result.current.values).toEqual(mockInitialValues);
  });

  it('updates field values', () => {
    const { result } = setupContext();

    act(() => {
      result.current.updateField('text', 'Lorem ipsum');
    });
    expect(result.current.values.text).toEqual('Lorem ipsum');

    const newDate = dayjs().add(1, 'month');
    act(() => {
      result.current.updateField('dueDate', newDate);
    });
    expect(result.current.values.dueDate).toEqual(newDate);
  });

  it('validates and returns errors', () => {
    const { result } = setupContext();
    expect(result.current.errors.text).toBeUndefined();
    expect(result.current.errors.dueDate).toBeUndefined();

    act(() => {
      result.current.updateField('text', '');
    });
    expect(result.current.errors.text).toEqual(true);

    act(() => {
      result.current.updateField('dueDate', dayjs().subtract(1, 'minute'));
    });
    expect(result.current.errors.text).toEqual(true);
    expect(result.current.errors.dueDate).toEqual(true);

    act(() => {
      result.current.updateField('dueDate', dayjs().add(1, 'day'));
    });
    expect(result.current.errors.text).toEqual(true);
    expect(result.current.errors.dueDate).toBeUndefined();
  });

  it('calls the submit handler', () => {
    const { result, handler } = setupContext();
    expect(handler).toHaveBeenCalledTimes(0);

    const event: any = { preventDefault: jest.fn() };
    act(() => {
      result.current.onSubmit(event);
    });
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(mockInitialValues);
  });

  it('returns whether the form can be submitted', () => {
    const { result } = setupContext();
    expect(result.current.isValid).toEqual(true);

    act(() => {
      result.current.updateField('text', '');
    });
    expect(result.current.isValid).toEqual(false);

    act(() => {
      result.current.updateField('text', 'Text');
    });
    expect(result.current.isValid).toEqual(true);

    act(() => {
      result.current.updateField('dueDate', null);
    });
    expect(result.current.isValid).toEqual(false);

    act(() => {
      result.current.updateField('dueDate', dayjs().add(1, 'hour'));
    });
    expect(result.current.isValid).toEqual(true);
  });

  it('returns whether a field has been edited yet', () => {
    const { result } = setupContext();
    expect(result.current.touched.text).toEqual(false);

    act(() => {
      result.current.updateField('text', 'Text');
    });
    expect(result.current.touched.text).toEqual(true);
  });
});
