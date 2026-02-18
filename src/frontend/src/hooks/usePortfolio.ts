import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { PromoVideo } from '../backend';

export function useGetPortfolio() {
  const { actor, isFetching } = useActor();

  return useQuery<PromoVideo[]>({
    queryKey: ['portfolio'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPortfolio();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPortfolioItem(referenceId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<PromoVideo | null>({
    queryKey: ['portfolioItem', referenceId?.toString()],
    queryFn: async () => {
      if (!actor || !referenceId) return null;
      return actor.getPortfolioItem(referenceId);
    },
    enabled: !!actor && !isFetching && !!referenceId,
  });
}
