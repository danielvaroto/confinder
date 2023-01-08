import { isLatLngLiteral } from '@googlemaps/typescript-guards';
import { createCustomEqual } from 'fast-equals';
import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export function useDeepCompareEffectForMaps(
  callback: EffectCallback,
  dependencies: DependencyList | undefined,
) {
  useEffect(callback, dependencies?.map(useDeepCompareMemoize));
}

function useDeepCompareMemoize(value: unknown) {
  const ref = useRef<unknown>();
  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a: unknown, b: unknown) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof google.maps.LatLng
  ) {
    return new google.maps.LatLng(a as google.maps.LatLngLiteral).equals(
      new google.maps.LatLng(b as google.maps.LatLngLiteral),
    );
  }
  return deepEqual(a, b);
});
