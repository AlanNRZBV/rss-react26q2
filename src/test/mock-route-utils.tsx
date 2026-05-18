import React from 'react';

export function createMockFileRoute(
  path: string,
  component: React.ComponentType
) {
  return {
    path,
    component,
  };
}
