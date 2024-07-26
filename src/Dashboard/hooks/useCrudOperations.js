// src/hooks/useCrudOperations.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../Api';

export const useCrudOperations = (entityName) => {
  const queryClient = useQueryClient();

  const {
    data: entities = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [entityName],
    queryFn: () => apiClient.get(entityName),
  });

  const createEntityMutation = useMutation({
    mutationFn: (newEntity) => apiClient.post(entityName, newEntity),
    onSuccess: () => {
      queryClient.invalidateQueries([entityName]);
    },
  });

  const deleteEntityMutation = useMutation({
    mutationFn: (id) => apiClient.delete(`${entityName}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries([entityName]);
    },
  });

  return {
    entities,
    isLoading,
    isError,
    createEntityMutation,
    deleteEntityMutation,
    queryClient,
  };
};
