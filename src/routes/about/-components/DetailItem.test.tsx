import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DetailItem } from './DetailItem';

describe('DetailItem Component', () => {
  it('Renders label and children correctly', () => {
    render(
      <DetailItem label="Test Label">
        <span>Test Content</span>
      </DetailItem>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
