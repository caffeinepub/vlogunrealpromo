import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { PromoVideoRequest } from '../backend';

export function useGetAllPromoVideoRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<PromoVideoRequest[]>({
    queryKey: ['promoVideoRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPromoVideoRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPromoVideoRequest(referenceId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<PromoVideoRequest | null>({
    queryKey: ['promoVideoRequest', referenceId?.toString()],
    queryFn: async () => {
      if (!actor || !referenceId) return null;
      return actor.getPromoVideoRequest(referenceId);
    },
    enabled: !!actor && !isFetching && !!referenceId,
  });
}
