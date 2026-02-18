import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor || !identity) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useCreatePortfolioItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      referenceId: bigint;
      title: string;
      description: string;
      url: string;
      thumbnailUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createPortfolioItem(
        data.referenceId,
        data.title,
        data.description,
        data.url,
        data.thumbnailUrl
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
}

export function useDeletePortfolioItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (referenceId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deletePortfolioItem(referenceId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
}
