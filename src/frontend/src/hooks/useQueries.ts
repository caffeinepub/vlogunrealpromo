import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

// Note: This file is kept for backwards compatibility but the PromoVideoRequest
// functionality has been removed from the backend. The request form is now
// client-side only. This file can be removed if not needed elsewhere.

export function useGetAllPromoVideoRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<never[]>({
    queryKey: ['promoVideoRequests'],
    queryFn: async () => {
      // Backend no longer supports promo video requests
      return [];
    },
    enabled: false,
  });
}

export function useGetPromoVideoRequest(referenceId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<null>({
    queryKey: ['promoVideoRequest', referenceId?.toString()],
    queryFn: async () => {
      // Backend no longer supports promo video requests
      return null;
    },
    enabled: false,
  });
}
