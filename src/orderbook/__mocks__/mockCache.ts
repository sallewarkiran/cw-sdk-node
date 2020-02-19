export const cachedMocks: {
  [mockName: string]: object;
} = {};

export function resetCache(): void {
  for (const key in cachedMocks) {
    delete cachedMocks[key];
  }
}
