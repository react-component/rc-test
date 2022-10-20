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
});
