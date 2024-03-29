import React from 'react';
import { render } from '@testing-library/react';

describe('basic', () => {
  it('React', () => {
    const { container } = render(<div className="bamboo" />);

    expect(container.querySelector('.bamboo')).toBeTruthy();
  });

  it('async', async () => {
    await Promise.resolve();
    expect(1).toBeTruthy();
  });

  it('testing lib jsdom', () => {
    const { container } = render(<p data-test="bamboo" />);
    expect(container.querySelector('p')).toHaveAttribute('data-test', 'bamboo');
  });

  it('correct env', () => {
    expect(process.env.NODE_ENV).toEqual('test');
  });
});
